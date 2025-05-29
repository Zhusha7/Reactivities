import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";
import agent from "../api/agent";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    const location = useLocation();

    const { data, isLoading } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const response = await agent.get<Activity[]>("/activities");
            return response.data;
        },
        enabled: !id && location.pathname === "/activities" && !!currentUser,
        select: (data) => {
            return data.map((activity) => ({
                ...activity,
                isHost: activity.hostId === currentUser?.id,
                isGoing: activity.attendees.some(
                    (attendee) => attendee.id === currentUser?.id
                ),
            }));
        },
    });

    const { data: activity, isLoading: isActivityLoading } = useQuery({
        queryKey: ["activity", id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
        select: (data) => {
            return {
                ...data,
                isHost: data.hostId === currentUser?.id,
                isGoing: data.attendees.some(
                    (attendee) => attendee.id === currentUser?.id
                ),
            };
        },
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put<Activity>(`/activities/${activity.id}`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
    });

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post<Activity>(
                "/activities",
                activity
            );
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
    });

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete<Activity>(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
    });

    const updateAttendance = useMutation({
        mutationFn: async (id: string) => {
            await agent.post<Activity>(`/activities/${id}/attend`);
        },
        onMutate: async (activityId: string) => {
            await queryClient.cancelQueries({ queryKey: ["activity", activityId] });

            const prevActivity = queryClient.getQueryData<Activity>(["activity", activityId]);

            queryClient.setQueryData(["activity", activityId], (oldActivity: Activity) => {
                if (!oldActivity || !currentUser) {
                    return oldActivity;
                }

                const isHost = oldActivity.hostId === currentUser.id;
                const isAttending = oldActivity.attendees.some(attendee => attendee.id === currentUser.id);

                return {
                    ...oldActivity,
                    isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
                    attendees: isAttending
                        ? isHost
                            ? oldActivity.attendees
                            : oldActivity.attendees.filter(attendee => attendee.id !== currentUser.id)
                        : [...oldActivity.attendees, { id: currentUser.id, name: currentUser.displayName, image: currentUser.imageUrl }]
                }
            })
            return {prevActivity};
        },
        onError: (error, activityId, context) => {
            console.log("prev activity: " + context?.prevActivity);
            console.log(error);
            if (context?.prevActivity) {
                queryClient.setQueryData(["activity", activityId], context.prevActivity);
            }
        }
    })

    return {
        data,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isActivityLoading,
        updateAttendance,
    };
};

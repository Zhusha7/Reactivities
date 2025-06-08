import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useLocation} from "react-router";
import agent from "../api/agent";
import {useAccount} from "./useAccount";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const {currentUser} = useAccount();
    const location = useLocation();

    const {
        data: activitiesGroup,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery<PageList<Activity, string>>({
        queryKey: ["activities"],
        queryFn: async ({pageParam = null}) => {
            const response = await agent.get<PageList<Activity, string>>("/activities", {
                params: {
                    cursor: pageParam,
                    pageSize: 3,
                },
            });
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !id && location.pathname === "/activities" && !!currentUser,
        select: data => ({
            ...data,
            pages: data.pages.map((page) => ({
                ...page,
                items: page.items.map(activity => {
                    const host = activity.attendees.find(attendee => attendee.id === activity.hostId);
                    return {
                        ...activity,
                        isHost: activity.hostId === currentUser?.id,
                        isGoing: activity.attendees.some(attendee => attendee.id === currentUser?.id),
                        hostImageUrl: host?.imageUrl,
                    }
                })
            }))
        })
    });

    const {data: activity, isLoading: isActivityLoading} = useQuery({
        queryKey: ["activity", id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
        select: (data) => {
            const host = data.attendees.find(attendee => attendee.id === data.hostId);
            return {
                ...data,
                isHost: data.hostId === currentUser?.id,
                isGoing: data.attendees.some(attendee => attendee.id === currentUser?.id),
                hostImageUrl: host?.imageUrl,
            };
        },
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put<Activity>(`/activities/${activity.id}`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["activities"]});
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
            await queryClient.invalidateQueries({queryKey: ["activities"]});
        },
    });

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete<Activity>(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["activities"]});
        },
    });

    const updateAttendance = useMutation({
        mutationFn: async (id: string) => {
            await agent.post<Activity>(`/activities/${id}/attend`);
        },
        onMutate: async (activityId: string) => {
            await queryClient.cancelQueries({queryKey: ["activity", activityId]});

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
                        : [...oldActivity.attendees, {
                            id: currentUser.id,
                            name: currentUser.displayName,
                            image: currentUser.imageUrl
                        }]
                }
            })
            return {prevActivity};
        },
        onError: (error, activityId, context) => {
            console.log(error);
            if (context?.prevActivity) {
                queryClient.setQueryData(["activity", activityId], context.prevActivity);
            }
        }
    })

    return {
        activitiesGroup,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isActivityLoading,
        updateAttendance,
    };
};

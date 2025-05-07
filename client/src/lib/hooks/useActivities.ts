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
    });

    const { data: activity, isLoading: isActivityLoading } = useQuery({
        queryKey: ["activity", id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
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
    return {
        data,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isActivityLoading,
    };
};

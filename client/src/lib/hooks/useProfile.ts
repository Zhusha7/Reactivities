import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import agent from "../api/agent.ts";
import {useMemo} from "react";
import {EditProfileSchema} from "../schemas/editProfileSchema.ts";
import { toast } from "react-toastify";

export const useProfile = (id?: string) => {
    const queryClient = useQueryClient();
    const {data: profile, isLoading: loadingProfile} = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profiles/${id}`);
            return response.data;
        },
        enabled: !!id
    })

    const {data: photos, isLoading: loadingPhotos} = useQuery<Photo[]>({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
            return response.data;
        },
        enabled: !!id
    })

    const uploadPhoto = useMutation({
        mutationFn: async (photo: File) => {
            const formData = new FormData();
            formData.append('file', photo);
            const response = await agent.post(`/profiles/add-photo`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });
            return response.data;
        },
        onSuccess: async (photo: Photo) => {
            await queryClient.invalidateQueries({queryKey: ['photos', id]});
            queryClient.setQueryData(['user'], (data: User) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            })
            queryClient.setQueryData(['profile', id], (data: Profile) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            })
        }
    })

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.put(`/profiles/${photo.id}/setMain`);
        },
        onMutate: async (photo: Photo) => {
            await queryClient.cancelQueries({queryKey: ['profile', id]});
            await queryClient.cancelQueries({queryKey: ['user']});

            const prevProfile = queryClient.getQueryData<Profile>(['profile', id]);
            const prevUser = queryClient.getQueryData<User>(['user']);

            queryClient.setQueryData(['profile', id], (oldProfile: Profile) => {
                if (!oldProfile) return oldProfile;
                return {
                    ...oldProfile,
                    imageUrl: photo.url
                }
            })
            queryClient.setQueryData(['user'], (oldUser: User) => {
                if (!oldUser) return oldUser;
                return {
                    ...oldUser,
                    imageUrl: photo.url
                }
            })
            return {
                prevProfile,
                prevUser
            }
        },
        onError: (_error, _newPhoto, context) => {
            if (context?.prevProfile && context?.prevUser) {
                queryClient.setQueryData(['profile', id], context.prevProfile);
                queryClient.setQueryData(['user'], context.prevUser);
            }
        }
    })

    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agent.delete(`/profiles/${photoId}/photos`);
        },
        onMutate: async (photoId: string) => {
            await queryClient.cancelQueries({queryKey: ['photos', id]});
            const prevPhotos = queryClient.getQueryData<Photo[]>(['photos', id]);
            queryClient.setQueryData(['photos', id], (oldPhotos: Photo[]) => {
                return oldPhotos?.filter(photo => photo.id !== photoId);
            })
            return {prevPhotos};
        },
        onError: (_error, _photoId, context) => {
            if (context?.prevPhotos) {
                queryClient.setQueryData(['photos', id], context.prevPhotos);
            }
        }
    })

    const editProfile = useMutation({
        mutationFn: async (profile: EditProfileSchema) => {
            await agent.put(`/profiles/`, profile);
        },
        onMutate: async (profile: EditProfileSchema) => {
            await queryClient.cancelQueries({queryKey: ['profile', id]});
            await queryClient.cancelQueries({queryKey: ['user']});

            const prevProfile = queryClient.getQueryData<Profile>(['profile', id]);
            const prevUser = queryClient.getQueryData<User>(['user']);

            queryClient.setQueryData(['profile', id], (oldProfile: Profile) => {
                if (!oldProfile) return oldProfile;
                return {
                    ...oldProfile,
                    ...profile
                }
            })
            queryClient.setQueryData(['user'], (oldUser: User) => {
                if (!oldUser) return oldUser;
                return {
                    ...oldUser,
                    ...profile
                }
            })

            return {
                prevProfile,
                prevUser
            }
        },
        onError: (error, _profile, context) => {
            console.log(error);
            toast.error('Failed to update profile');
            if (context?.prevProfile && context?.prevUser) {
                queryClient.setQueryData(['profile', id], context.prevProfile);
                queryClient.setQueryData(['user'], context.prevUser);
            }
        }
    })

    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id
    }, [id, queryClient])

    return {
        profile,
        loadingProfile,
        photos,
        loadingPhotos,
        isCurrentUser,
        uploadPhoto,
        setMainPhoto,
        deletePhoto,
        editProfile
    }
}
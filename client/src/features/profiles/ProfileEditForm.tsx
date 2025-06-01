import {Button, Paper} from "@mui/material";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {useParams} from "react-router";
import {EditProfileSchema, editProfileSchema} from "../../lib/schemas/editProfileSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/TextInput.tsx";
import { useEffect } from "react";

type Props = {
    setEditMode: (editMode: boolean) => void;
}

export default function ProfileEditForm({setEditMode}: Props) {
    const {id} = useParams();
    const {editProfile, profile} = useProfile(id);
    const {control, handleSubmit, reset, formState: {isValid, isSubmitting}} = useForm<EditProfileSchema>({
        mode: "onTouched",
        resolver: zodResolver(editProfileSchema),
    })

    const onSubmit = async (data: EditProfileSchema) => {
        editProfile.mutate(data, {
            onSuccess: () => {
                setEditMode(false);
            }
        });
    }

    useEffect(() => {
        if (profile) {
            reset({
                displayName: profile.displayName,
                bio: profile.bio || ""
            })
        }
    }, [profile, reset])

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
                gap: 3,
                maxWidth: "md",
                mx: "auto",
                borderRadius: 3,
            }}
        >
            <TextInput name="displayName" label="Display Name" control={control}/>
            <TextInput name="bio" label="Bio" control={control} multiline/>
            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
            >
                Update Profile
            </Button>
        </Paper>
    )
}
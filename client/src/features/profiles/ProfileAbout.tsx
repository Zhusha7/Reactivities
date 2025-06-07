import {Box, Button, Divider, Typography} from "@mui/material";
import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {useState} from "react";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileAbout() {
    const {id} = useParams();
    const {profile} = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" mb={2} mt={2} alignItems="center" gap={2}>
                <Typography variant="h5">About {profile?.displayName}</Typography>
                <Button onClick={() => setEditMode(!editMode)}>
                    {editMode ? "Cancel" : "Edit profile"}
                </Button>
            </Box>
            <Divider sx={{my: 2}}/>
            {editMode ? (
                <ProfileEditForm setEditMode={setEditMode}/>
            ) : (
                <Box sx={{overflow: "auto", maxHeight: 450}}>
                    <Typography variant="body1" sx={{whiteSpace: "pre-wrap"}}>
                        {profile?.bio || "No bio added"}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}
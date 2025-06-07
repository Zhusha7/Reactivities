import {Grid} from "@mui/material";
import {Navigate, useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

export default function ProfilePage() {
    const {id} = useParams<{ id: string }>();
    const {profile, loadingProfile} = useProfile(id);

    if (loadingProfile) return <div>Loading...</div>;

    if (!profile) return <Navigate to="not-found"/>;

    return (
        <Grid container>
            <Grid size={12}>
                <ProfileHeader />
                <ProfileContent />
            </Grid>
        </Grid>
    );
}

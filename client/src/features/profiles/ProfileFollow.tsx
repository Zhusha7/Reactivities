import {Box, Divider, Typography} from "@mui/material";
import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile";
import ProfileCard from "./ProfileCard.tsx";

type Props = {
    activeTab: number;
}

export default function ProfileFollow({activeTab}: Props) {
    const {id} = useParams();
    const predicate = activeTab === 3 ? 'followers' : 'followings';
    const {profile, follows, loadingFollows} = useProfile(id, predicate);
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" mb={2} mt={2} alignItems="center" gap={2}>
                <Typography variant="h5">
                    {activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} follows`}
                </Typography>
            </Box>
            <Divider sx={{mt: 2}}/>
            {loadingFollows ? <Typography>Loading...</Typography> : (
                <Box display="flex" justifyContent="center" p={1} mt={3} gap={3} flexGrow={1}
                     sx={{flexWrap: 'wrap', overflowY: 'auto', maxHeight: 450}}>
                    {follows?.map(profile => (
                            <ProfileCard key={profile.id} profile={profile}/>
                        )
                    )}
                </Box>
            )}
        </Box>
    );
}
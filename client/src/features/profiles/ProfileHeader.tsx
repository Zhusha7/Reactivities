import {Avatar, Box, Button, Chip, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import {Navigate, useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";

export default function ProfileHeader() {
    const {id} = useParams();
    const {profile, isCurrentUser, updateFollow} = useProfile(id);
    if (!profile) return <Navigate to="not-found"/>;
    return (
        <Paper elevation={3} sx={{p: 4, borderRadius: 3}}>
            <Grid container>
                <Grid size={8}>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Avatar src={profile.imageUrl} alt={profile.displayName + " image"}
                                sx={{width: 150, height: 150}}/>
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <Typography variant="h4">{profile.displayName}</Typography>
                            {profile.isFollowing &&
                                <Chip variant="outlined" label="Following" color="secondary" sx={{borderRadius: 1}}/>}
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={4}>
                    <Stack spacing={2} alignItems="center">
                        <Box display="flex" justifyContent="space-around" width="100%">
                            <Box textAlign="center">
                                <Typography variant="h6">Followers</Typography>
                                <Typography variant="h3">{profile.followerCount}</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6">Following</Typography>
                                <Typography variant="h3">{profile.followingCount}</Typography>
                            </Box>
                        </Box>
                        {!isCurrentUser && (
                            <>
                                <Divider sx={{width: "100%"}}/>
                                <Button fullWidth variant="outlined" color={profile.isFollowing ? "error" : "success"}
                                        onClick={() => updateFollow.mutate()} disabled={updateFollow.isPending}>
                                    {profile.isFollowing ? "Unfollow" : "Follow"}
                                </Button>
                            </>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
}
import {Person} from "@mui/icons-material";
import {Box, Card, CardContent, CardMedia, Chip, Divider, Typography,} from "@mui/material";
import {Link} from "react-router";

type Props = {
    profile: Profile;
};

export default function ProfileCard({profile}: Props) {
    return (
        <Link to={`/profiles/${profile.id}`} style={{textDecoration: "none"}}>
            <Card
                elevation={4}
                sx={{
                    borderRadius: 3,
                    textDecoration: "none",
                    maxWidth: 250,
                }}
            >
                <CardMedia
                    component="img"
                    src={profile.imageUrl || "/images/user.png"}
                    sx={{width: "100%", zIndex: 50}}
                    alt={profile.displayName + " image"}
                />
                <Box p={2} pt={0}>
                    <CardContent>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography variant="h5">{profile.displayName}</Typography>
                            {profile.bio && (
                                <Typography variant="body2" color="text.secondary"
                                            sx={{
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: "nowrap"
                                            }}>
                                    {profile.bio}
                                </Typography>
                            )}
                            {profile.isFollowing && (
                                <Chip
                                    size="small"
                                    label="Following"
                                    color="secondary"
                                    variant="outlined"
                                />
                            )}
                        </Box>
                    </CardContent>
                    <Divider/>
                    <Box
                        sx={{
                            pt: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                        }}
                    >
                        <Person/>
                        <Typography ml={1}>{profile.followerCount} Followers</Typography>
                    </Box>
                </Box>
            </Card>
        </Link>
    );
}
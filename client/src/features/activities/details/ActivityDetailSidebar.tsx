import {Avatar, Chip, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography,} from "@mui/material";
import {Link} from "react-router";

type Props = {
    activity: Activity;
}

export default function ActivityDetailsSidebar({activity}: Props) {
    return (
        <>
            <Paper
                sx={{
                    textAlign: "center",
                    backgroundColor: "primary.main",
                    color: "white",
                    p: 2,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            >
                <Typography variant="h6">{activity.attendees.length} people going</Typography>
            </Paper>
            <Paper sx={{
                padding: 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
            }}>
                {activity.attendees.map((attendee) => (
                    <Grid key={attendee.id} container alignItems="center">
                        <Grid size={8}>
                            <List sx={{display: "flex", flexDirection: "column"}}>
                                <ListItem component={Link} to={`/profiles/${attendee.id}`}
                                          sx={{color: "text.secondary"}}>
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            alt={attendee.displayName + " image"}
                                            src={attendee.imageUrl}
                                            sx={{width: 75, height: 75, mr: 2}}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography variant="h6">{attendee.displayName}</Typography>
                                        {attendee.isFollowing && (
                                            <Typography variant="body2" color="secondary">
                                                Following
                                            </Typography>
                                        )}
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid
                            size={4}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                gap: 1,
                            }}
                        >
                            {activity.hostId === attendee.id && (
                                <Chip
                                    label="Host"
                                    color="warning"
                                    variant="filled"
                                    sx={{borderRadius: 2}}
                                />
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Paper>
        </>
    );
}

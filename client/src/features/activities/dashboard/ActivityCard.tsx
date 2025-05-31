import {AccessTime, Place, Visibility} from "@mui/icons-material";
import {Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography,} from "@mui/material";
import {Link, useNavigate} from "react-router";
import {formatDate} from "../../../lib/util/util";
import AvatarPopover from "../../../app/shared/components/AvatarPopover.tsx";

type Props = {
    activity: Activity;
};

export default function ActivityCard({activity}: Props) {
    const navigate = useNavigate();
    const label = activity.isHost
        ? "You are hosting this activity"
        : "You are attending this activity";
    const color = activity.isHost
        ? "secondary"
        : activity.isGoing
            ? "warning"
            : "default";

    return (
        <Card elevation={3} sx={{borderRadius: 3, p: 1, m: 1}}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <CardHeader
                    avatar={<Avatar src={activity.hostImageUrl} alt={activity.hostDisplayName + " image"}
                                    sx={{height: 80, width: 80}}/>}
                    title={<Typography variant="h6">{activity.title}</Typography>}
                    subheader={
                        <>
                            Hosted by{" "}
                            <Link to={`/profiles/${activity.hostId}`}>
                                {activity.hostDisplayName}
                            </Link>
                        </>
                    }
                />
                <Box display="flex" flexDirection="column" gap={2} mr={2}>
                    {(activity.isHost || activity.isGoing) && (
                        <Chip label={label} color={color} sx={{borderRadius: 2}}/>
                    )}
                    {activity.isCancelled && (
                        <Chip label="Canceled" color="error" sx={{borderRadius: 2}}/>
                    )}
                </Box>
            </Box>

            <Divider sx={{mb: 3}}/>

            <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Box display="flex" alignItems="center" flexGrow={0}>
                        <AccessTime sx={{mr: 1}}/>
                        <Typography variant="body2" noWrap>
                            {formatDate(activity.date)}
                        </Typography>
                    </Box>
                    <Place sx={{ml: 1}}/>
                    <Typography variant="body2" noWrap>
                        {activity.venue}
                    </Typography>
                    <Divider/>
                </Box>
                <Box alignItems="center" py={3} pl={3} bgcolor="background.paper">
                    {activity.attendees.length > 0 ? (
                        <Box display="flex" gap={1}>
                            {activity.attendees.map((attendee) => (
                                <AvatarPopover
                                    key={attendee.id}
                                    profile={attendee}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No attendees yet
                        </Typography>
                    )}
                </Box>
            </CardContent>
            <CardContent sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="body2">{activity.description}</Typography>
                <Button
                    onClick={() => navigate(`/activities/${activity.id}`)}
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{display: "flex", justifySelf: "self-end", borderRadius: 3}}
                >
                    <Visibility/>
                    View
                </Button>
            </CardContent>
        </Card>
    );
}

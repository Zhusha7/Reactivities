import { AccessTime, Place, Visibility } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../../../lib/util/util";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const navigate = useNavigate();
  const isHost = false;
  const isGoing = false;
  const isCanceled = false;
  const label = isHost
    ? "You are hosting this activity"
    : "You are attending this activity";
  const color = isHost ? "secondary" : isGoing ? "warning" : "default";

  return (
    <Card elevation={3} sx={{ borderRadius: 3, p: 1, m: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={activity.title}
          titleTypographyProps={{
            fontWeight: "bold",
            fontSize: 20,
          }}
          subheader={
            <>
              Hosted by <Link to={`/profiles/bob`}>Bob</Link>
            </>
          }
        />
        <Box display="flex" flexDirection="column" gap={2} mr={2}>
          {(isHost || isGoing) && (
            <Chip label={label} color={color} sx={{ borderRadius: 2 }} />
          )}
          {isCanceled && (
            <Chip label="Canceled" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box display="flex" alignItems="center" flexGrow={0}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {formatDate(activity.date)}
            </Typography>
          </Box>
          <Place sx={{ ml: 1 }} />
          <Typography variant="body2" noWrap>
            {activity.venue}
          </Typography>
          <Divider />
        </Box>
        <Box alignItems="center" py={3} pl={3} bgcolor="background.paper">
          <Typography variant="body2">Attendees go here</Typography>
        </Box>
      </CardContent>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">{activity.description}</Typography>
        <Button
          onClick={() => navigate(`/activities/${activity.id}`)}
          variant="contained"
          color="primary"
          size="small"
          sx={{ display: "flex", justifySelf: "self-end", borderRadius: 3 }}
        >
          <Visibility />
          View
        </Button>
      </CardContent>
    </Card>
  );
}

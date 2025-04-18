import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  activity: Activity;
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
};

export default function ActivityCard({
  activity,
  handleSelectActivity,
  handleDeleteActivity,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 1, m: 1 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", mb: 1 }}>
          {new Date(activity.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">
          {activity.city}, {activity.venue}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Chip label={activity.category} variant="outlined" />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleSelectActivity(activity.id)}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteActivity(activity.id)}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

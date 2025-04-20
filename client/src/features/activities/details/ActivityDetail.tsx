import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDetail() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {activity, isActivityLoading} = useActivities(id);


  if (isActivityLoading) return <Typography variant="h5">Loading...</Typography>;
  if (!activity) return <Typography variant="h5">Activity not found</Typography>;
  return (
    <Card sx={{ position: "sticky", top: 89, borderRadius: 3, boxShadow: 3, m: 1 }}>
      <CardMedia
        component="img"
        image={`/images/categoryImages/${activity.category}.jpg`}
        alt={activity.title}
        sx={{ borderRadius: 3, boxShadow: 3 }}
      />
      <CardContent sx={{ pt: 3, pb: 1 }}>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1">
          {new Date(activity.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
        {/* <Typography variant="subtitle1">
          {activity.city}, {activity.venue}
        </Typography> */}
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => navigate("/activities")}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={() => navigate(`/manage/${activity.id}`)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

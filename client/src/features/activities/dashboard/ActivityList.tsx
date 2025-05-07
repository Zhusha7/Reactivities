import { Box, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityCard from "./ActivityCard";

export default function ActivityList() {
  const { data: activities, isLoading } = useActivities();

  if (isLoading) return <Typography variant="h2">Loading...</Typography>;

  if (!activities)
    return <Typography>No activities found or user logged out</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </Box>
  );
}

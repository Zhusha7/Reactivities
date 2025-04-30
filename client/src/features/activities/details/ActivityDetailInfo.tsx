import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";
import { Activity } from "../../../lib";
import { formatDate } from "../../../lib/util/util";

type Props = {
  activity: Activity;
};

export default function ActivityDetailsInfo({ activity }: Props) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <Paper sx={{ mb: 2 }}>
      <Grid container alignItems="center" pl={2} py={1}>
        <Grid size={1}>
          <Info color="info" fontSize="large" />
        </Grid>
        <Grid size={11}>
          <Typography>{activity.description}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container alignItems="center" pl={2} py={1}>
        <Grid size={1}>
          <CalendarToday color="info" fontSize="large" />
        </Grid>
        <Grid size={11}>
          <Typography>{formatDate(activity.date)}</Typography>
        </Grid>
      </Grid>
      <Divider />

      <Grid container pl={2} py={1}>
        <Grid size={1}>
          <Place color="info" fontSize="large" />
        </Grid>
        <Grid size={11} display="flex" flexDirection="column">
          <Typography>
            {activity.venue}, {activity.city}
          </Typography>
        </Grid>
        <Button onClick={() => setMapOpen(!mapOpen)}>
          {mapOpen ? "Hide map" : "Show map"}
        </Button>
      </Grid>
      {mapOpen && (
        <Box sx={{ height: 400, zIndex: 1000, display: "block" }}>
          <MapComponent
            position={[activity.latitude, activity.longitude]}
            venue={activity.venue}
          />
        </Box>
      )}
    </Paper>
  );
}

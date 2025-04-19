import { Grid } from "@mui/material";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
type Props = {
  activities: Activity[];
  selectedActivity?: Activity;
  handleSelectActivity: (id: string) => void;
  handleCancelSelectActivity: () => void;
  editMode: boolean;
  handleFormClose: () => void;
  handleFormOpen: (id?: string) => void;
};

export default function ActivityDashboard({ activities, selectedActivity, handleSelectActivity, handleCancelSelectActivity, editMode, handleFormClose, handleFormOpen }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            selectedActivity={selectedActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            openForm={handleFormOpen}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            handleFormClose={handleFormClose}
          />
        )}
      </Grid>
    </Grid>
  );
}

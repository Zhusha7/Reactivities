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
  handleSubmitForm: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
};

export default function ActivityDashboard({ activities, selectedActivity, handleSelectActivity, handleCancelSelectActivity, editMode, handleFormClose, handleFormOpen, handleSubmitForm, handleDeleteActivity }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            openForm={handleFormOpen}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            handleFormClose={handleFormClose}
            handleSubmitForm={handleSubmitForm}
          />
        )}
      </Grid>
    </Grid>
  );
}

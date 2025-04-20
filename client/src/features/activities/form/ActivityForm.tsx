import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
  const {id} = useParams();
  const { updateActivity, createActivity, activity, isActivityLoading } = useActivities(id);
  const navigate = useNavigate();


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      navigate(`/activities/${activity.id}`);
    } else {
      createActivity.mutate(data as unknown as Activity, {
        onSuccess: async (id) => {
          navigate(`/activities/${id}`);
        }
      });
    }
  }

  if (isActivityLoading) return <Typography variant="h5">Loading...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, p: 3, mt: 1, position: "sticky", top: 89, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom color="text.primary">
        {activity ? "Edit" : "Create"} Activity
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          autoComplete="off"
          sx={{ backgroundColor: "background.paper" }}
          defaultValue={activity?.title}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          margin="normal"
          rows={3}
          autoComplete="off"
          sx={{ backgroundColor: "background.paper" }}
          defaultValue={activity?.description}
        />
        <TextField
          label="Category"
          name="category"
          fullWidth
          margin="normal"
          autoComplete="off"
          sx={{ backgroundColor: "background.paper" }}
          defaultValue={activity?.category}
        />
        <TextField
          label="Date"
          name="date"
          fullWidth
          margin="normal"
          type="date"
          sx={{ backgroundColor: "background.paper" }}
          defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
        />
        <TextField
          label="City"
          name="city"
          fullWidth
          margin="normal"
          autoComplete="address-level2"
          sx={{ backgroundColor: "background.paper" }}
          defaultValue={activity?.city}
        />
        <TextField
          label="Venue"
          name="venue"
          fullWidth
          margin="normal"
          autoComplete="street-address"
          sx={{ backgroundColor: "background.paper" }}
          defaultValue={activity?.venue}
        />
        <Box display="flex" justifyContent="end" gap={2}>
          <Button color="inherit">Cancel</Button>
          <Button variant="contained" color="success" type="submit" disabled={updateActivity.isPending || createActivity.isPending}>
            {activity ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

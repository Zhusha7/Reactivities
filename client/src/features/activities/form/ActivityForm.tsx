import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
type Props = {
  activity?: Activity;
  handleFormClose: () => void;
  handleSubmitForm: (activity: Activity) => void;
};

export default function ActivityForm({ activity, handleFormClose, handleSubmitForm }: Props) {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) data.id = activity.id;
    handleSubmitForm(data as unknown as Activity);
  }

  return (
    <Paper sx={{ borderRadius: 3, p: 3, mt: 1 }}>
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
          type="datetime-local"
          sx={{ backgroundColor: "background.paper" }}
          defaultValue={activity?.date}
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
          <Button color="inherit" onClick={handleFormClose}>Cancel</Button>
          <Button variant="contained" color="success" type="submit">
            {activity ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import TextInput from "../../../app/shared/components/TextInput";
import { useActivities } from "../../../lib/hooks/useActivities";
import {
  ActivitySchema,
  activitySchema,
} from "../../../lib/schemas/activitySchema";
import { categoryOptions } from "./categoryOptions";

export default function ActivityForm() {
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isActivityLoading } =
    useActivities(id);

  useEffect(() => {
    if (activity)
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location };
    try {
      if (activity) {
        await updateActivity.mutateAsync(
          { ...activity, ...flattenedData },
          {
            onSuccess: () => navigate(`/activities/${activity.id}`),
          }
        );
      } else {
        createActivity.mutate(flattenedData as Activity, {
          onSuccess: (id) => navigate(`/activities/${id}`),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isActivityLoading)
    return <Typography variant="h5">Loading...</Typography>;

  return (
    <Paper
      sx={{
        borderRadius: 3,
        p: 3,
        mt: 1,
        position: "sticky",
        top: 89,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" mb={3} color="text.primary">
        {activity ? "Edit" : "Create"} Activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextInput name="title" label="Title" control={control} />
        <TextInput
          name="description"
          label="Description"
          control={control}
          multiline
          rows={3}
        />
        <Box display="flex" gap={2}>
          <SelectInput
            name="category"
            label="Category"
            control={control}
            items={categoryOptions}
          />
          <DateTimeInput name="date" label="Date" control={control} />
        </Box>
        <LocationInput name="location" label="Location" control={control} />
        <Box display="flex" justifyContent="end" gap={2}>
          <Button color="inherit">Cancel</Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            {activity ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

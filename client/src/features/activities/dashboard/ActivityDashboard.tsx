import {Grid} from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilter from "./ActivityFilter";

export default function ActivityDashboard() {
    return (
        <Grid container spacing={1}>
            <Grid size={7}>
                <ActivityList/>
            </Grid>
            <Grid
                size={5}
                sx={{
                    position: "sticky",
                    top: 88,
                    alignSelf: "flex-start",
                }}
            >
                <ActivityFilter/>
            </Grid>
        </Grid>
    );
}

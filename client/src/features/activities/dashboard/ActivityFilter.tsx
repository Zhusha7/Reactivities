import { FilterList, Event } from "@mui/icons-material";
import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import { Calendar } from "react-calendar";

export default function ActivityFilter() {
  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column", borderRadius: 3 }}>
      <Paper sx={{p: 2, borderRadius: 3}}>
        <Box p={2}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mb: 1 , color: "secondary.main"}}
          >
            <FilterList sx={{ mr: 1 }} />
            Filters
          </Typography>
          <MenuList>
            <MenuItem>
              <ListItemText primary="All events" />
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm going" />
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm hosting" />
            </MenuItem>
          </MenuList>
        </Box>
      </Paper>
      <Box component={Paper} sx={{ width: "100%", p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 1 , color: "secondary.main"}}>
          <Event sx={{mr: 1}} />
          Select date
        </Typography>
        <Calendar />
      </Box>
    </Box>
  );
}

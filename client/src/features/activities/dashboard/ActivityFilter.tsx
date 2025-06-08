import {Event, FilterList} from "@mui/icons-material";
import {Box, Button, ListItemText, MenuItem, MenuList, Paper, Typography,} from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import {Calendar} from "react-calendar";
import {useStore} from "../../../lib/hooks/useStore.ts";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";

const ActivityFilter = observer(function ActivityFilter() {
    const {activityStore: {setFilter, setStartDate, filter, startDate}} = useStore();
    const [activeStartDate, setActiveStartDate] = useState(
        startDate ? new Date(startDate) : new Date()
    );


    useEffect(() => {
        setActiveStartDate(new Date(startDate));
    }, [startDate]);

    return (
        <Box sx={{display: "flex", gap: 2, flexDirection: "column", borderRadius: 3}}>
            <Paper sx={{p: 2, borderRadius: 3}}>
                <Box p={2}>
                    <Typography
                        variant="h6"
                        sx={{display: "flex", alignItems: "center", mb: 1, color: "secondary.main"}}
                    >
                        <FilterList sx={{mr: 1}}/>
                        Filters
                    </Typography>
                    <MenuList>
                        <MenuItem
                            selected={filter === 'all'}
                            onClick={() => setFilter('all')}
                        >
                            <ListItemText primary="All events"/>
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isGoing'}
                            onClick={() => setFilter('isGoing')}
                        >
                            <ListItemText primary="I'm going"/>
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isHost'}
                            onClick={() => setFilter('isHost')}
                        >
                            <ListItemText primary="I'm hosting"/>
                        </MenuItem>
                    </MenuList>
                </Box>
            </Paper>
            <Box component={Paper} sx={{width: "100%", p: 3, borderRadius: 3}}>
                <Typography variant="h6" sx={{display: "flex", alignItems: "center", mb: 1, color: "secondary.main"}}>
                    <Event sx={{mr: 1}}/>
                    Select date
                </Typography>
                <Calendar
                    value={startDate}
                    onChange={date => setStartDate(date as Date)}
                    activeStartDate={activeStartDate}
                    onActiveStartDateChange={({activeStartDate}) => setActiveStartDate(activeStartDate as Date)}

                />
            </Box>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setFilter('all');
                        setStartDate(new Date());
                    }}
                >
                    Reset filters
                </Button>
            </Box>
        </Box>
    );
});

export default ActivityFilter;
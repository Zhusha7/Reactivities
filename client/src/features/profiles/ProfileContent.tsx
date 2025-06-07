import {SyntheticEvent, useState} from "react"
import {Box, Paper, Tab, Tabs} from "@mui/material";
import ProfilePhotos from "./ProfilePhotos.tsx";
import ProfileAbout from "./ProfileAbout.tsx";
import ProfileFollow from "./ProfileFollow.tsx";

export default function ProfileContent() {
    const [value, setValue] = useState(0);

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const tabContent = [
        {label: "About", content: <ProfileAbout />},
        {label: "Photos", content: <ProfilePhotos />},
        {label: "Events", content: <div>Events</div>},
        {label: "Followers", content: <ProfileFollow activeTab={value} />},
        {label: "Following", content: <ProfileFollow activeTab={value} />},
    ]

    return (
        <Box
            component={Paper}
            my={2}
            p={3}
            elevation={3}
            height={600}
            sx={{display: "flex", alignItems: "flex-start", borderRadius: 3}}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={{
                    borderRight: 1,
                    height: "100%",
                    minWidth: 200,
                    borderRightColor: "divider",
                    borderRightWidth: 2,
                    borderRadius: 0,
                    mr: 3,
                }}
            >
                {tabContent.map((tab, index) => (
                    <Tab key={index} label={tab.label} sx={{mr: 3}}/>
                ))}
            </Tabs>
            <Box sx={{flexGrow: 1, p: 3, pt: 0}}>
                {tabContent[value].content}
            </Box>
        </Box>
    );
}
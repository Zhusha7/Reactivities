import { Container, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import NavBar from "./NavBar";
import { useActivities } from "../../lib/hooks/useActivities";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#cba6f7", // Catppuccin Mocha - Mauve
      light: "#f5c2e7", // Catppuccin Mocha - Pink
      dark: "#9399b2", // Catppuccin Mocha - Subtext0
    },
    secondary: {
      main: "#89b4fa", // Catppuccin Mocha - Blue
      light: "#b4befe", // Catppuccin Mocha - Lavender
      dark: "#74c7ec", // Catppuccin Mocha - Sapphire
    },
    background: {
      default: "#1e1e2e", // Catppuccin Mocha - Base
      paper: "#313244", // Catppuccin Mocha - Surface0
    },
    error: {
      main: "#f38ba8", // Catppuccin Mocha - Red
      light: "#eba0ac", // Catppuccin Mocha - Maroon
      dark: "#f38ba8", // Catppuccin Mocha - Red
    },
    success: {
      main: "#a6e3a1", // Catppuccin Mocha - Green
      light: "#94e2d5", // Catppuccin Mocha - Teal
      dark: "#40a02b", // Catppuccin Mocha - Dark Green
    },
    warning: {
      main: "#fab387", // Catppuccin Mocha - Peach
      light: "#f9e2af", // Catppuccin Mocha - Yellow
      dark: "#fe640b", // Catppuccin Mocha - Dark Orange
    },
    info: {
      main: "#89dceb", // Catppuccin Mocha - Sky
      light: "#89b4fa", // Catppuccin Mocha - Blue
      dark: "#209fb5", // Catppuccin Mocha - Dark Sky
    },
    text: {
      primary: "#cdd6f4", // Catppuccin Mocha - Text
      secondary: "#bac2de", // Catppuccin Mocha - Subtext1
      disabled: "#6c7086", // Catppuccin Mocha - Surface2
    },
    divider: "#494d64", // Catppuccin Mocha - Overlay2
    action: {
      active: "rgba(205, 214, 244, 0.3)", // Catppuccin Mocha - Text (transparent)
      hover: "rgba(108, 112, 134, 0.1)", // Catppuccin Mocha - Text (transparent)
      selected: "rgba(205, 214, 244, 0.3)", // Catppuccin Mocha - Text (transparent)
      disabled: "rgba(108, 112, 134, 0.3)", // Catppuccin Mocha - Surface2 (transparent)
    }
  },
});

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { data: activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities?.find((x: Activity) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar handleFormOpen={handleFormOpen} />
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {isPending || !activities ? (
          <Typography variant="h2">Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            handleSelectActivity={handleSelectActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            handleFormClose={handleFormClose}
            handleFormOpen={handleFormOpen}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;

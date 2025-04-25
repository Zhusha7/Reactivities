import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  LinearProgress,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Observer } from "mobx-react-lite";
import { NavLink } from "react-router";
import { useStore } from "../../lib/hooks/useStore";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
  const { uiStore } = useStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage:
            "linear-gradient(135deg,rgba(203, 166, 247, 0.66),rgba(180, 190, 254, 0.66))",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <MenuItem
                sx={{ display: "flex", gap: 2 }}
                component={NavLink}
                to="/"
              >
                <Group />
                <Typography
                  sx={{ textDecoration: "none" }}
                  variant="h5"
                  fontWeight="bold"
                  color="text.primary"
                >
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
              <MenuItemLink to="/createActivity">Create Activity</MenuItemLink>
              <MenuItemLink to="/counter">Counter</MenuItemLink>
              <MenuItemLink to="/errors">Errors</MenuItemLink>
            </Box>
            <MenuItemLink to="/">User Menu</MenuItemLink>
          </Toolbar>
        </Container>

        <Observer>
          {() =>
            uiStore.isLoading ? (
              <LinearProgress
                color="secondary"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                }}
              />
            ) : null
          }
        </Observer>
      </AppBar>
    </Box>
  );
}

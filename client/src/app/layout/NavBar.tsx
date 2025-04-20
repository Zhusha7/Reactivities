import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
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
              <MenuItem sx={{ display: "flex", gap: 2 }}  component={NavLink} to="/">
                <Group />
                <Typography sx={{textDecoration: "none"}} variant="h5" fontWeight="bold" color="text.primary">
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <MenuItemLink
                to="/activities"
              >
                Activities
              </MenuItemLink>
              <MenuItemLink
                to="/createActivity"
              >
                create activity
              </MenuItemLink>
            </Box>

            <MenuItemLink
                to="/"
              >
                User Menu
              </MenuItemLink>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

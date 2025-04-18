import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

type Props = {
  handleFormOpen: () => void;
};

export default function NavBar({ handleFormOpen }: Props) {
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
              <MenuItem sx={{ display: "flex", gap: 2 }}>
                <Group />
                <Typography variant="h5" fontWeight="bold">
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <MenuItem
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Activities
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                About
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Contact
              </MenuItem>
            </Box>
            <Button size="small" variant="contained" color="secondary" onClick={() => handleFormOpen()}>
              Create Activity
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

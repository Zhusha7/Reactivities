import SearchOff from "@mui/icons-material/SearchOff";
import { Button, Paper, Typography } from "@mui/material";
import { router } from "../../app/router/Routes";

export default function NotFound() {
  return (
    <Paper
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchOff sx={{ fontSize: 100 }} color="primary" />
      <Typography variant="h4" gutterBottom>
        Oops - we couldn't find what you're looking for
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.navigate("/activities")}
      >
        Return to activities page
      </Button>
    </Paper>
  );
}

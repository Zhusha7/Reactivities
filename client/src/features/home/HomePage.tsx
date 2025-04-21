import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center'
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          mb: 4
        }}
      >
        Welcome to Reactivities
      </Typography>

      <Typography
        variant="h5"
        sx={{
          mb: 6,
          color: "text.secondary"
        }}
      >
        Discover and join amazing activities in your area
      </Typography>

      <Box
        sx={{
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
            "100%": { transform: "scale(1)" }
          }
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            mt: 2,
            py: 2,
            px: 6,
            fontSize: "1.2rem",
            borderRadius: 3,
            boxShadow: 6
          }}
          onClick={() => navigate('/activities')}
        >
          Explore Activities
        </Button>
      </Box>
    </Container>
  )
}
import {
  Avatar,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

export default function ActivityDetailsChat() {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "primary.main",
          color: "white",
          padding: 2,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      >
        <Typography variant="h6">Chat about this event</Typography>
      </Box>
      <Card
        sx={{
          borderRadius: 0,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <CardContent>
          <div>
            <form>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
              />
            </form>
          </div>

          <Box>
            <Box sx={{ display: "flex", my: 2 }}>
              <Avatar
                src={"/images/user.png"}
                alt={"user image"}
                sx={{ mr: 2 }}
              />
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" gap={3}>
                  <Typography
                    component={Link}
                    color="primary"
                    to={`/profiles/username`}
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", textDecoration: "none" }}
                  >
                    Bob
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    2 hours ago
                  </Typography>
                </Box>

                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  Comment goes here
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

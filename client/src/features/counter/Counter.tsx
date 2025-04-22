import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";

const Counter = observer(function Counter() {
  const { counterStore } = useStore();
  return (
    <Box display="flex" justifyContent="space-between">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Typography variant="h4" gutterBottom>
          {counterStore.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {counterStore.count}
        </Typography>
        <ButtonGroup variant="contained" size="small" sx={{ mt: 3 }}>
          <Button color="error" onClick={() => counterStore.increment()}>
            Increment
          </Button>
          <Button color="success" onClick={() => counterStore.decrement()}>
            Decrement
          </Button>
          <Button color="primary" onClick={() => counterStore.increment(5)}>
            Increment by 5
          </Button>
          <Button color="secondary" onClick={() => counterStore.decrement(5)}>
            Decrement by 5
          </Button>
        </ButtonGroup>
      </Box>
      <Paper
        sx={{
          py: 2,
          width: "400px",
        }}
      >
        <Typography variant="h6" pl={2} gutterBottom>
          Events
        </Typography>
        <List
          sx={{
            height: "80vh",
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#cba6f7 #313244",
            backgroundColor: "#313244",
          }}
        >
          <ListSubheader>Current Count: {counterStore.count}</ListSubheader>
          {counterStore.events.map((event: string, index: number) => (
            <ListItem key={index}>
              <ListItemText primary={event} />
            </ListItem>
          )).reverse()}
        </List>
      </Paper>
    </Box>
  );
});

export default Counter;

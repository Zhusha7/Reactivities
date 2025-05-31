import {Star, StarBorder} from "@mui/icons-material";
import {Box, Button} from "@mui/material";

type Props = {
    selected: boolean;
}

export default function StarButton({selected}: Props) {
    return (
        <Box sx={{position: "relative"}}>
            <Button
                sx={{
                    opacity: 0.8,
                    transition: "opacity 0.3s",
                    position: "relative",
                    cursor: "pointer"
                }}
            >
                <StarBorder
                    sx={{
                        fontSize: 32,
                        color: "background.paper",
                        position: "absolute",
                        cursor: "pointer"
                    }}
                />
                <Star
                    sx={{
                        fontSize: 32,
                        color: selected ? "warning.main" : "background.default",
                        cursor: "pointer"
                    }}
                />
            </Button>
        </Box>
    )
}
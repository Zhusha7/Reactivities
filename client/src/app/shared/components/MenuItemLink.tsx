import {ReactNode} from "react";
import {NavLink} from "react-router";
import {MenuItem} from "@mui/material";

export default function MenuItemLink({children, to}: { children: ReactNode, to: string }) {
    return (
        <MenuItem
            component={NavLink}
            to={to}
            sx={{
                fontSize: "1.2rem",
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "inherit",
                textDecoration: "none",
                "&.active": {
                    color: "primary.light",
                    fontSize: "1.3rem",
                },
            }}
        >
            {children}
        </MenuItem>
    )
}
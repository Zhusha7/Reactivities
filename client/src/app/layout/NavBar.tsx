import {Group} from "@mui/icons-material";
import {AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography,} from "@mui/material";
import {Observer} from "mobx-react-lite";
import {NavLink} from "react-router";
import {useAccount} from "../../lib/hooks/useAccount";
import {useStore} from "../../lib/hooks/useStore";
import MenuItemLink from "../shared/components/MenuItemLink";
import UserMenu from "./UserMenu";

export default function NavBar() {
    const {uiStore} = useStore();
    const {currentUser} = useAccount();

    return (
        <Box sx={{flexGrow: 1}}>
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
                                sx={{display: "flex", gap: 2}}
                                component={NavLink}
                                to="/"
                            >
                                <Group/>
                                <Typography
                                    sx={{textDecoration: "none"}}
                                    variant="h5"
                                    fontWeight="bold"
                                    color="text.primary"
                                >
                                    Reactivities
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{display: "flex", gap: 2}}>
                            <MenuItemLink to="/activities">Activities</MenuItemLink>
                            <MenuItemLink to="/counter">Counter</MenuItemLink>
                            <MenuItemLink to="/errors">Errors</MenuItemLink>
                        </Box>
                        <Box display="flex" alignItems="center">
                            {currentUser ? (
                                <UserMenu/>
                            ) : (
                                <>
                                    <MenuItemLink to="/login">Login</MenuItemLink>
                                    <MenuItemLink to="/register">Register</MenuItemLink>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>

                <Observer>
                    {() => (
                        <Box
                            sx={{
                                height: 2,
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                transition: 'opacity 0.1s ease',
                                opacity: uiStore.isLoading ? 1 : 0
                            }}
                        >
                            <LinearProgress
                                color="secondary"
                                variant="query"
                            />
                        </Box>
                    )}
                </Observer>
            </AppBar>
        </Box>
    );
}
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Dashboard,
  Home,
  Folder,
  Delete,
  Settings,
  Star,
  Logout,
  Person,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface SidebarProps {
  open: boolean;
  drawerWidth: number;
}

const Sidebar = ({ open, drawerWidth }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const clearToken = useAuthStore((state) => state.clearToken);
  const user = useAuthStore((state) => state.user);

  const menuItems = [
    { text: "Home", icon: <Home />, route: "/" },
    { text: "Dashboard", icon: <Dashboard />, route: "/dashboard" },
    { text: "Favorites", icon: <Star />, route: "/favorites" },
    { text: "Folders", icon: <Folder />, route: "/folders" },
    { text: "Trash", icon: <Delete />, route: "/trash" },
  ];

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  const handleNavigation = (route: string) => navigate(route);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 64,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          bgcolor: "white",
          overflow: "hidden",
          borderRight: "1px solid rgba(0,0,0,0.08)",
        },
      }}
    >
      <Box
        sx={{
          mt: 8,
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {open && (
          <Box sx={{ p: 1.5, mb: 2 }}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              onClick={() => navigate("/profile")}
              sx={{
                p: 1.5,
                bgcolor: "grey.50",
                borderRadius: 2,
                cursor: "pointer",
                mb: 2,
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              <Avatar
                src={user?.avatar}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "primary.main",
                  fontSize: "1rem",
                }}
              >
                {!user?.avatar && <Person />}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap fontSize="0.85rem">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {user?.email}
                </Typography>
              </Box>
            </Stack>

            <Box>
              <Typography variant="body1" fontWeight={600} fontSize="0.9rem">
                Workspace
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Organize your thoughts
              </Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ flex: 1, px: open ? 1 : 0.5 }}>
          <List disablePadding>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.route;

              return (
                <Tooltip
                  key={item.text}
                  title={open ? "" : item.text}
                  placement="right"
                  arrow
                >
                  <ListItem disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => handleNavigation(item.route)}
                      sx={{
                        minHeight: 44,
                        justifyContent: open ? "initial" : "center",
                        px: 1.5,
                        borderRadius: 2,
                        bgcolor: isActive ? "primary.main" : "transparent",
                        color: isActive ? "white" : "grey.800",
                        "&:hover": {
                          bgcolor: isActive ? "primary.dark" : "grey.100",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1.5 : "auto",
                          justifyContent: "center",
                          color: "inherit",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={item.text}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.85rem",
                              fontWeight: isActive ? 600 : 500,
                            },
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              );
            })}
          </List>
        </Box>

        <Box sx={{ p: open ? 1.5 : 1, mt: "auto" }}>
          <Divider sx={{ mb: 1.5 }} />
          <List disablePadding>
            <Tooltip title={open ? "" : "Settings"} placement="right" arrow>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation("/settings")}
                  sx={{
                    minHeight: 44,
                    justifyContent: open ? "initial" : "center",
                    px: 1.5,
                    borderRadius: 2,
                    color: "grey.700",
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1.5 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    <Settings />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary="Settings"
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "0.85rem",
                          fontWeight: 500,
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>

            <Tooltip title={open ? "" : "Logout"} placement="right" arrow>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    minHeight: 44,
                    justifyContent: open ? "initial" : "center",
                    px: 1.5,
                    borderRadius: 2,
                    color: "error.main",
                    "&:hover": {
                      bgcolor: "error.50",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1.5 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    <Logout />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary="Logout"
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "0.85rem",
                          fontWeight: 500,
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

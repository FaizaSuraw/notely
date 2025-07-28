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

  const menuItems = [
      {
    text: "Home",
    icon: <Home />,
    route: "/",
  },
  {
    text: "Dashboard",
    icon: <Dashboard />,
    route: "/dashboard",
  },

  {
    text: "Favorites",
    icon: <Star />,
    route: "/favorites",
  },
  {
    text: "Folders",
    icon: <Folder />,
    route: "/folders",
  },
  {
    text: "Trash",
    icon: <Delete />,
    route: "/trash",
  },
];

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  const handleNavigation = (route: string) => {
    navigate(route);
  };

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
          borderRight: "1px solid rgba(0,0,0,0.08)",
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
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
          <Box sx={{ p: 2, mb: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "primary.main",
                  fontSize: "1.2rem",
                }}
              >
                <Person />
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="grey.800"
                  noWrap
                >
                  John Doe
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  john@example.com
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "grey.800",
                  mb: 0.5,
                  fontSize: "1.1rem",
                }}
              >
                Workspace
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organize your thoughts
              </Typography>
            </Box>
          </Box>
        )}
        <Box sx={{ flex: 1, px: open ? 2 : 1 }}>
          <List sx={{ px: 0 }}>
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
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        borderRadius: 2,
                        bgcolor: isActive ? "primary.main" : "transparent",
                        color: isActive ? "white" : "grey.700",
                        "&:hover": {
                          bgcolor: isActive ? "primary.dark" : "grey.100",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : "auto",
                          justifyContent: "center",
                          color: "inherit",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {open && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText
                            primary={item.text}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontWeight: isActive ? 600 : 500,
                                fontSize: "0.95rem",
                              },
                            }}
                          />
                         
                        </Box>
                      )}
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              );
            })}
          </List>
        </Box>

        {/* Settings and Logout */}
        <Box sx={{ p: open ? 2 : 1, mt: "auto" }}>
          <Divider sx={{ mb: 2 }} />
          <List sx={{ px: 0 }}>
            <Tooltip title={open ? "" : "Settings"} placement="right" arrow>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation("/settings")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderRadius: 2,
                    color: "grey.700",
                    "&:hover": {
                      bgcolor: "grey.100",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
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
                          fontWeight: 500,
                          fontSize: "0.95rem",
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
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderRadius: 2,
                    color: "error.main",
                    "&:hover": {
                      bgcolor: "error.50",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
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
                          fontWeight: 500,
                          fontSize: "0.95rem",
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

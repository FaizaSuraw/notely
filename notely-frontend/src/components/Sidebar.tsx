import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Stack,
  Tooltip,
  Typography,
  Divider,
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
    { text: "Home", icon: <Home />, route: "/" },
    { text: "Dashboard", icon: <Dashboard />, route: "/dashboard" },
    { text: "Favorites", icon: <Star />, route: "/favorites" },
    { text: "Folders", icon: <Folder />, route: "/folders" },
    { text: "Trash", icon: <Delete />, route: "/trash" },
  ];

  const handleNavigation = (route: string) => navigate(route);
  const handleLogout = () => {
    clearToken();
    navigate("/login");
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
          transition: "width 0.3s",
          bgcolor: "white",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          overflow: "hidden",
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
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2, borderRadius: 2, bgcolor: "grey.50" }}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <Person />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  John Doe
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  john@example.com
                </Typography>
              </Box>
            </Stack>
            <Box mt={2}>
              <Typography variant="h6" fontWeight={700} fontSize="1rem">
                Workspace
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organize your thoughts
              </Typography>
            </Box>
          </Box>
        )}

        <Box flex={1} px={open ? 2 : 1}>
          <List>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.route;
              return (
                <Tooltip key={item.text} title={open ? "" : item.text} placement="right" arrow>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(item.route)}
                      sx={{
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        borderRadius: 2,
                        bgcolor: isActive ? "primary.main" : "transparent",
                        color: isActive ? "white" : "grey.700",
                        "&:hover": {
                          bgcolor: isActive ? "primary.dark" : "grey.100",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", color: "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={item.text}
                          primaryTypographyProps={{
                            fontWeight: isActive ? 600 : 500,
                            fontSize: "0.95rem",
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

        <Box px={open ? 2 : 1} mt="auto">
          <Divider sx={{ mb: 2 }} />
          <List>
            <Tooltip title={open ? "" : "Settings"} placement="right" arrow>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation("/settings")}
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", color: "inherit" }}>
                    <Settings />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary="Settings"
                      primaryTypographyProps={{ fontWeight: 500, fontSize: "0.95rem" }}
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
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderRadius: 2,
                    color: "error.main",
                    "&:hover": {
                      bgcolor: "error.50",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", color: "inherit" }}>
                    <Logout />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary="Logout"
                      primaryTypographyProps={{ fontWeight: 500, fontSize: "0.95rem" }}
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

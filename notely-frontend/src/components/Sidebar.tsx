import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Sidebar = ({ open, drawerWidth }: { open: boolean; drawerWidth: number }) => {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);

  const navItems = [
    { text: "Home", icon: <HomeIcon />, route: "/" },
    { text: "Create New Entry", icon: <NoteAddIcon/>, route: "/new" },
    { text: "Trash", icon: <DeleteIcon />, route: "/trash" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 64,
          transition: "width 0.3s",
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ mt: 8 }}>
        <List>
          {navItems.map(({ text, icon, route }) => (
            <Tooltip title={open ? "" : text} placement="right" key={text}>
              <ListItem component = "button" onClick={() => navigate(route)}>
                <ListItemIcon>{icon}</ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>

        <Divider />

        <List>
          <Tooltip title={open ? "" : "Logout"} placement="right">
            <ListItem component = 
              "button"
              onClick={() => {
                clearToken();
                navigate("/login");
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" />}
            </ListItem>
          </Tooltip>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

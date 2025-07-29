import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Person, Logout, AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = ({
  open,
  drawerWidth,
  toggleDrawer,
}: {
  open: boolean;
  drawerWidth: number;
  toggleDrawer: () => void;
}) => {
  const appBarWidth = `calc(100% - ${open ? drawerWidth : 64}px)`;
  const appBarMarginLeft = open ? `${drawerWidth}px` : "64px";

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { user, clearToken } = useAuthStore();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleClose();
    clearToken();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: appBarWidth,
        ml: appBarMarginLeft,
        transition: "width 0.3s ease, margin 0.3s ease",
        bgcolor: "white",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            sx={{
              mr: 2,
              color: "grey.700",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              color: "grey.800",
              fontWeight: 700,
              fontSize: "1.3rem",
            }}
          >
            Notely
          </Typography>
        </Box>

        <Box>
          <IconButton onClick={handleAvatarClick}>
            <Avatar
              src={user?.avatar || ""}
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {!user?.avatar && <Person sx={{ fontSize: 20 }} />}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 4,
              sx: {
                mt: 1.5,
                minWidth: 160,
                borderRadius: 2,
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

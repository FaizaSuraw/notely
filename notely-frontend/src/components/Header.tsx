import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Person } from "@mui/icons-material";

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

        <Avatar
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
          <Person sx={{ fontSize: 20 }} />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

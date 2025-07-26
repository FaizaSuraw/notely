import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({
  open,
  drawerWidth,
  toggleDrawer,
}: {
  open: boolean;
  drawerWidth: number;
  toggleDrawer: () => void;
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${open ? drawerWidth : 64}px)`,
        ml: `${open ? drawerWidth : 64}px`,
        transition: "width 0.3s, margin 0.3s",
        bgcolor: "primary.main",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={toggleDrawer}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Notely
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

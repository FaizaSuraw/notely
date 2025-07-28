import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "text.primary",
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="small" edge="start" sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              color: "inherit",
              fontSize: "1.2rem",
            }}
          >
            Notely
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button variant="text" color="inherit" onClick={() => navigate("/favorites")}>
            Favorites
          </Button>
          <Button variant="text" color="inherit" onClick={() => navigate("/add")}>
            Add Note
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={onLogout}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 500,
              borderColor: "#ddd",
              "&:hover": { borderColor: "#aaa" },
            }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

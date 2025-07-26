import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!id || !password) {
      return setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "warning",
      });
    }

    const result = await loginUser(id, password);

    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? "success" : "error",
    });

    if (result.success) {
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: `linear-gradient(to right, #e3f2fd, #ffffff)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        backgroundColor: "#f0f4f8", // fallback color
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            boxShadow: 6,
            borderRadius: 3,
            px: 4,
            py: 6,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 56,
              height: 56,
              mb: 1,
              fontSize: 28,
            }}
          >
            📝
          </Avatar>

          <Typography variant="h5" fontWeight="bold" mb={1}>
            Notely
          </Typography>

          <Typography variant="h6" fontWeight="medium" mb={1}>
            Welcome Back
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Log in to your Notely account
          </Typography>

          <TextField
            fullWidth
            label="Email or Username"
            variant="outlined"
            value={id}
            autoFocus
            onChange={(e) => setId(e.target.value)}
            onKeyPress={handleKeyPress}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Button variant="text" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert severity={snackbar.severity as any} elevation={6} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Login;

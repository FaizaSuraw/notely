import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { firstName, lastName, username, email, password } = formData;
    if (!firstName || !lastName || !username || !email || !password) {
      return setSnackbar({
        open: true,
        message: "Please fill in all fields",
        severity: "warning",
      });
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        return setSnackbar({
          open: true,
          message: data.message,
          severity: "error",
        });
      }

      setSnackbar({
        open: true,
        message: "Account created! Redirecting to login...",
        severity: "success",
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Server error. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            boxShadow: 6,
            borderRadius: 4,
            p: 5,
            backgroundColor: "white",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 56,
              height: 56,
              mb: 2,
              fontSize: 28,
              mx: "auto",
            }}
          >
            📝
          </Avatar>

          <Typography variant="h4" fontWeight="bold" align="center" mb={2}>
            Create Your Account
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="username"
                label="Username"
                fullWidth
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
            onClick={handleRegister}
          >
            Sign Up
          </Button>

          <Typography align="center" mt={2}>
            Already have an account?{" "}
            <Button onClick={() => navigate("/login")}>Login</Button>
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbar.severity as any}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Register;

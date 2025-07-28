import type React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
  Paper,
  Stack,
  Divider,
  LinearProgress,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google,
  GitHub,
  ArrowBack,
} from "@mui/icons-material";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const { firstName, lastName, username, email, password } = formData;
    if (!firstName.trim()) return "First name is required";
    if (!lastName.trim()) return "Last name is required";
    if (!username.trim()) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email";
    if (!password) return "Password is required";
    if (passwordStrength < 50) return "Choose a stronger password";
    return null;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message || "Registration failed");
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 1,
        py: 2,
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          bgcolor: "rgba(255,255,255,0.1)",
          color: "white",
          "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
        }}
      >
        <ArrowBack />
      </IconButton>

      <Container maxWidth="xs">
        <Paper elevation={10} sx={{ borderRadius: 2, p: 2 }}>
          <form onSubmit={handleRegister}>
            <Stack spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                ✍️
              </Avatar>
              <Typography variant="h6" fontWeight={600}>
                Create Account
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <Stack direction="row" spacing={1} width="100%">
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => {}}
                  disabled={loading}
                  size="small"
                >
                  Google
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GitHub />}
                  onClick={() => {}}
                  disabled={loading}
                  size="small"
                >
                  GitHub
                </Button>
              </Stack>

              <Divider sx={{ width: "100%" }}>or use email</Divider>

              <Grid container spacing={1}>
                <Grid size = {{xs:6}}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    fullWidth
                    size="small"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid size = {{xs:6}}>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    size="small"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid size = {{xs:12}}>
                  <TextField
                    name="username"
                    label="Username"
                    fullWidth
                    size="small"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid size = {{xs:12}}>
                  <TextField
                    name="email"
                    label="Email"
                    fullWidth
                    type="email"
                    size="small"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid size = {{xs:12}}>
                  <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    slotProps={{
                      input : {
                        endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      }
                    }}
                  />
                  {formData.password && (
                    <Stack spacing={0.5} mt={1}>
                      <LinearProgress
                        variant="determinate"
                        value={passwordStrength}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor:
                              passwordStrength < 50
                                ? "error.main"
                                : passwordStrength < 75
                                ? "warning.main"
                                : "success.main",
                          },
                        }}
                      />
                      <Typography variant="caption">
                        Strength:{" "}
                        {passwordStrength < 50
                          ? "Weak"
                          : passwordStrength < 75
                          ? "Medium"
                          : "Strong"}
                      </Typography>
                    </Stack>
                  )}
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <Typography variant="body2" fontSize="0.8rem">
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
                  size="small"
                  sx={{ fontWeight: 600, textTransform: "none" }}
                >
                  Login
                </Button>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;

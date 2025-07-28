import type React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
  Link,
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
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await loginUser(formData.id, formData.password);
      
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
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
        alignItems: "center",
        justifyContent: "center",
        py: 2,
        px: 2,
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          bgcolor: "rgba(255,255,255,0.1)",
          color: "white",
          "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
        }}
      >
        <ArrowBack />
      </IconButton>

      <Container maxWidth="xs">
        <Paper elevation={12} sx={{ borderRadius: 3, p: 3 }}>
          <form onSubmit={handleLogin}>
            <Stack spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                ✍️
              </Avatar>
              <Typography variant="h6" fontWeight={600}>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to continue
              </Typography>

              {error && <Alert severity="error">{error}</Alert>}

              <Stack direction="row" spacing={1} width="100%">
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  disabled={loading}
                  size="small"
                >
                  Google
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GitHub />}
                  disabled={loading}
                  size="small"
                >
                  GitHub
                </Button>
              </Stack>

              <Divider sx={{ width: "100%" }}>or login with email</Divider>

              <TextField
                name="id"
                label="Email or Username"
                fullWidth
                value={formData.id}
                onChange={handleChange}
                disabled={loading}
                size="small"
              />
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                size="small"
                InputProps={{
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
                }}
              />

              <Stack direction="row" justifyContent="flex-end" width="100%">
                <Link
                  component="button"
                  onClick={() => navigate("/forgot-password")}
                  sx={{ fontSize: "0.75rem" }}
                >
                  Forgot password?
                </Link>
              </Stack>

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
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Don’t have an account?{" "}
                <Button
                  onClick={() => navigate("/register")}
                  size="small"
                  sx={{ fontWeight: 600, textTransform: "none" }}
                >
                  Sign up
                </Button>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

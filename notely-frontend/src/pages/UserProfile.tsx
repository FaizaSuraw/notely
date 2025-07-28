import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

const UserProfile = () => {
  const token = useAuthStore((state) => state.token);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
      } else {
        setSnackbar("Failed to load profile");
      }
    } catch (err) {
      setSnackbar("Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("http://localhost:5000/api/user", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setSnackbar("Profile updated successfully");
      } else {
        setSnackbar(data.message || "Update failed");
      }
    } catch (err) {
      setSnackbar("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Edit Profile
        </Typography>

        <Stack spacing={2}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={profile.avatar}
              sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
            />
            <TextField
              label="Avatar URL"
              name="avatar"
              fullWidth
              value={profile.avatar}
              onChange={handleChange}
            />
          </Box>

          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            value={profile.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            value={profile.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            name="username"
            fullWidth
            value={profile.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={profile.email}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{ mt: 2 }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Stack>
      </Card>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar("")}
        message={snackbar}
      />
    </Container>
  );
};

export default UserProfile;

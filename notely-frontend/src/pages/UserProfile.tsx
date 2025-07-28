import React, { useEffect, useState } from "react";
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
import { useAuthStore } from "../store/authStore";

const CLOUD_NAME = "your-cloud-name"; // e.g., "dfsj23abc"
const UPLOAD_PRESET = "your-upload-preset"; // e.g., "notely_preset"

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
    } catch {
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
      if (data.success) setSnackbar("Profile updated successfully");
      else setSnackbar(data.message || "Update failed");
    } catch {
      setSnackbar("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setProfile((prev) => ({ ...prev, avatar: data.secure_url }));
      setSnackbar("Image uploaded successfully!");
    } catch {
      setSnackbar("Failed to upload avatar");
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
            <Button variant="outlined" component="label" size="small">
              Upload New Avatar
              <input hidden type="file" accept="image/*" onChange={handleAvatarUpload} />
            </Button>
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

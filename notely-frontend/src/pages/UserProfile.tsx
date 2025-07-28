import type React from "react";
import { useEffect, useState } from "react";
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
  IconButton,
  Divider,
  Alert,
  Paper,
  Grid,
  Chip,
  useTheme,
  alpha,
  Fade,
  Skeleton,
} from "@mui/material";
import {
  PhotoCamera,
  Edit,
  Save,
  Cancel,
  Person,
  Email,
  AccountCircle,
  CheckCircle,
} from "@mui/icons-material";
import { useAuthStore } from "../store/authStore";

const api = import.meta.env.VITE_API_URL;

const CLOUD_NAME = "diuv0whr0";
const UPLOAD_PRESET = "notely_upload";

interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
  joinedDate?: string;
  lastLogin?: string;
}

const UserProfile = () => {
  const theme = useTheme();
  const token = useAuthStore((state) => state.token);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatar: "",
    joinedDate: "",
    lastLogin: "",
  });

  const [originalProfile, setOriginalProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [hasChanges, setHasChanges] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      setProfile(data.user);
      setOriginalProfile(data.user);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Error fetching profile",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProfile = { ...profile, [e.target.name]: e.target.value };
    setProfile(newProfile);
    setHasChanges(
      JSON.stringify(newProfile) !== JSON.stringify(originalProfile),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${api}/api/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to update profile");
      }

      setOriginalProfile(profile);
      setHasChanges(false);
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Error updating profile",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setHasChanges(false);
    setIsEditing(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: "File size must be less than 5MB",
        severity: "error",
      });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.secure_url) {
        setProfile((prev) => ({ ...prev, avatar: data.secure_url }));
        setHasChanges(true);
        setSnackbar({
          open: true,
          message: "Avatar uploaded successfully!",
          severity: "success",
        });
      } else {
        throw new Error("No secure_url returned");
      }
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to upload avatar",
        severity: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card sx={{ p: 4, borderRadius: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ textAlign: "center" }}>
              <Skeleton
                variant="circular"
                width={120}
                height={120}
                sx={{ mx: "auto", mb: 2 }}
              />
              <Skeleton
                variant="text"
                width={200}
                height={32}
                sx={{ mx: "auto" }}
              />
            </Box>
            <Divider />
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Skeleton variant="rectangular" height={56} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Skeleton variant="rectangular" height={56} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Skeleton variant="rectangular" height={56} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Skeleton variant="rectangular" height={56} />
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Fade in timeout={600}>
        <Box>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 3,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 20% 80%, ${alpha(theme.palette.common.white, 0.1)} 0%, transparent 50%)`,
              },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h4" fontWeight={800}>
                  Profile Settings
                </Typography>
                {!isEditing ? (
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setIsEditing(true)}
                    sx={{
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      color: "white",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.common.white, 0.3),
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      startIcon={
                        saving ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <Save />
                        )
                      }
                      onClick={handleSave}
                      disabled={saving || !hasChanges}
                      sx={{
                        bgcolor: alpha(theme.palette.common.white, 0.9),
                        color: theme.palette.primary.main,
                        "&:hover": {
                          bgcolor: "white",
                        },
                      }}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{
                        borderColor: alpha(theme.palette.common.white, 0.5),
                        color: "white",
                        "&:hover": {
                          borderColor: "white",
                          bgcolor: alpha(theme.palette.common.white, 0.1),
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                )}
              </Stack>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage your account settings and profile information
              </Typography>
            </Box>
          </Paper>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Box
                sx={{ position: "relative", display: "inline-block", mb: 3 }}
              >
                <Avatar
                  src={profile.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  }}
                >
                  <Person sx={{ fontSize: 60 }} />
                </Avatar>
                {isEditing && (
                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        bgcolor: theme.palette.primary.dark,
                      },
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <PhotoCamera sx={{ fontSize: 20 }} />
                    )}
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </IconButton>
                )}
              </Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                @{profile.username}
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                <Chip
                  icon={<CheckCircle sx={{ fontSize: 16 }} />}
                  label={`Joined ${new Date(profile.joinedDate || "").toLocaleDateString()}`}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
                <Chip
                  label={`Last login ${new Date(profile.lastLogin || "").toLocaleDateString()}`}
                  size="small"
                  variant="outlined"
                />
              </Stack>
            </Box>
            <Box sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    value={profile.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    value={profile.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Username"
                    name="username"
                    fullWidth
                    value={profile.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <AccountCircle
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <Email sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {hasChanges && isEditing && (
                <Alert
                  severity="info"
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    "& .MuiAlert-message": {
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                >
                  You have unsaved changes. Don't forget to save your updates!
                </Alert>
              )}
            </Box>
          </Card>
          <Card
            sx={{
              mt: 3,
              p: 4,
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Account Information
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    fontWeight={600}
                  >
                    Account Status
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active • Verified
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="success.main"
                    fontWeight={600}
                  >
                    Storage Used
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    2.4 GB of 15 GB
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Fade>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;

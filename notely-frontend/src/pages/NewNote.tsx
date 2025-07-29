import type React from "react";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack,
  Alert,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Save,
  Preview,
  ArrowBack,
  Star,
  StarBorder,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import MainLayout from "../components/MainLayout";

const NewNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    content: "",
    isFavorite: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const api = import.meta.env.VITE_API_URL;

  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.synopsis.trim() ||
      !formData.content.trim()
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${api}/api/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          synopsis: formData.synopsis.trim(),
          content: formData.content.trim(),
          isFavorite: formData.isFavorite,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Note created successfully! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(data.message || "Failed to create note");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsDraft = async () => {
    console.log("Save as draft");
  };

  const wordCount = formData.content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const charCount = formData.content.length;

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  bgcolor: "grey.100",
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" fontWeight={600} color="grey.800">
                📝 Create New Note
              </Typography>
            </Stack>

            <IconButton
              onClick={() =>
                setFormData({ ...formData, isFavorite: !formData.isFavorite })
              }
              sx={{
                color: formData.isFavorite ? "warning.main" : "grey.400",
                "&:hover": {
                  bgcolor: formData.isFavorite ? "warning.50" : "grey.100",
                },
              }}
            >
              {formData.isFavorite ? <Star /> : <StarBorder />}
            </IconButton>
          </Stack>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {success}
            </Alert>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Paper
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <Stack spacing={3}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  disabled={loading}
                  placeholder="Enter your note title..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1rem",
                      fontWeight: 300,
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  label="Synopsis"
                  name="synopsis"
                  value={formData.synopsis}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={1}
                  variant="outlined"
                  disabled={loading}
                  placeholder="Brief description of your note..."
                  helperText="A short summary that will help you find this note later"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  label="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  disabled={loading}
                  placeholder="Start writing your note here... Markdown is supported!"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontFamily: "monospace",
                      fontSize: "0.95rem",
                      lineHeight: 1,
                      borderRadius: 2,
                    },
                  }}
                  helperText="Supports Markdown formatting (# headers, **bold**, *italic*, etc.)"
                />

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    onClick={handleSaveAsDraft}
                    disabled={loading}
                    sx={{ px: 3 }}
                  >
                    Save as Draft
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<Preview />}
                    disabled={loading || !formData.content}
                    sx={{ px: 3 }}
                  >
                    Preview
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={loading}
                    sx={{
                      px: 2,
                      py: 1,
                      fontWeight: 600,
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </Button>
                </Stack>
              </Stack>
            </Paper>
            <Paper
              sx={{
                width: { xs: "100%", lg: 300 },
                p: 3,
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                height: "fit-content",
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Note Details
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    Status
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label="Draft"
                      size="small"
                      color="info"
                      variant="outlined"
                    />
                    {formData.isFavorite && (
                      <Chip
                        label="Favorite"
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    Word Count
                  </Typography>
                  <Typography variant="body2">{wordCount} words</Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    Character Count
                  </Typography>
                  <Typography variant="body2">
                    {charCount} characters
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    Tips
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.85rem"
                    >
                      • Use # for headers
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.85rem"
                    >
                      • **bold** and *italic* text
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.85rem"
                    >
                      • Create lists with - or 1.
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize="0.85rem"
                    >
                      • Add links with [text](url)
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </form>
      </Container>
    </MainLayout>
  );
};

export default NewNote;

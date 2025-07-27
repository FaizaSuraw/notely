import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import MainLayout from "../components/MainLayout";
import MdEditor from "react-markdown-editor-lite";
import Markdown from "react-markdown";

const NewNote = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const token = useAuthStore((state) => state.token);
  useEffect(() => {
  console.log("Token from authStore:", token);
}, [token]);
  const navigate = useNavigate();

  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    setContent(text);
  };

  const handleSubmit = async () => {
    if (!title || !synopsis || !content) {
      return setSnackbar({ open: true, message: "All fields are required", severity: "warning" });
    }

    setLoading(true);
    try {
      console.log("Token before POST:", token);
      const res = await fetch("http://localhost:5000/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, synopsis, content }),
      });

      const data = await res.json();

      if (!data.success) {
        return setSnackbar({ open: true, message: data.message, severity: "error" });
      }

      setSnackbar({ open: true, message: "Note created successfully", severity: "success" });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setSnackbar({ open: true, message: "Server error", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          📝 Create New Entry
        </Typography>

        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          margin="normal"
          required
        />

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Content (Markdown Supported)
          </Typography>
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => <Markdown>{text}</Markdown>}
            onChange={handleEditorChange}
            value={content}
          />
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create Note"}
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <MuiAlert elevation={6} variant="filled" severity={snackbar.severity as any}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </Container>
    </MainLayout>
  );
};

export default NewNote;

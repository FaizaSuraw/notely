import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useAuthStore } from "../store/authStore";
import MainLayout from "../components/MainLayout";

interface Note {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const ViewNote = () => {
  const { id } = useParams();
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/entry/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setNote(data.data);
        } else {
          setNote(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, token]);

  if (loading) return <CircularProgress />;
  if (!note) return <Typography>Note not found or deleted.</Typography>;

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            background: "#fff",
            p: 4,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {note.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={1}>
            {note.synopsis}
          </Typography>
          <Typography variant="caption" color="text.disabled" mb={3} display="block">
            Created: {new Date(note.createdAt).toLocaleString()}
          </Typography>

          <Box mt={4}>
            <Markdown>{note.content}</Markdown>
          </Box>

          <Box mt={4}>
            <Button variant="outlined" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ViewNote;

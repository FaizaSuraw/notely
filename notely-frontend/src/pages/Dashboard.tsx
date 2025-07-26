import {
  Box,
  Typography,
  Grid,
  Fab,
  CircularProgress,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";

interface Note {
  id: string;
  title: string;
  synopsis: string;
  createdAt: string;
}

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/entries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) setNotes(data.data);
      } catch (err) {
        console.error("Failed to load notes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [token]);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          📓 My Notes
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : notes.length === 0 ? (
          <Typography>No notes yet. Start writing your first one!</Typography>
        ) : (
          <Grid container spacing={3}>
            {notes.map((note) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={note.id}>
                <NoteCard
                  title={note.title}
                  synopsis={note.synopsis}
                  createdAt={note.createdAt}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        onClick={() => navigate("/new")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Dashboard;

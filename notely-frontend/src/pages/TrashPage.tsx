import {
  Box,
  Typography,
  IconButton,
  Stack,
  CircularProgress,
  Container,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  synopsis: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

const TrashPage = () => {
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchTrashedNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/entries/trash", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTrashedNotes(data.data || []);
    } catch (error) {
      console.error("Failed to fetch trashed notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/entry/restore/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTrashedNotes();
    } catch (error) {
      console.error("Restore failed:", error);
    }
  };

  const handlePermanentDelete = async (id: string) => {
  try {
    await fetch(`http://localhost:5000/api/entry/permanent/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTrashedNotes();
  } catch (error) {
    console.error("Permanent delete failed:", error);
  }
};


  useEffect(() => {
    fetchTrashedNotes();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Trash
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : trashedNotes.length === 0 ? (
        <Typography color="text.secondary">No deleted notes found.</Typography>
      ) : (
        <Stack spacing={3}>
          {trashedNotes.map((note) => (
            <Box
              key={note.id}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">{note.title}</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => handleRestore(note.id)}>
                    <RestoreIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handlePermanentDelete(note.id)}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </Stack>
              </Stack>
              <Typography color="text.secondary" mt={1}>
                {note.synopsis}
              </Typography>
              <Typography variant="caption" color="text.disabled" mt={2} display="block">
                Deleted: {new Date(note.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default TrashPage;

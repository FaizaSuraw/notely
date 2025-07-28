import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
  Stack,
  InputBase,
  Paper,
  IconButton,
  Chip,
  Button,
  Skeleton,
} from "@mui/material";
import {
  Add as AddIcon,
  Search,
  FilterList,
  ViewModule,
  ViewList,
  Sort,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import MainLayout from "../components/MainLayout";

interface Note {
  id: string;
  title: string;
  synopsis: string;
  createdAt: string;
  isDeleted: boolean;
  isFavorite?: boolean;
}

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/entries", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          const visibleNotes = data.data.filter((n: Note) => !n.isDeleted);
          setNotes(visibleNotes);
        }
      } catch (err) {
        console.error("Failed to load notes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [token]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.synopsis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteNotes = filteredNotes.filter((note) => note.isFavorite);
  const recentNotes = filteredNotes.slice(0, 3);

  const handleFavoriteToggle = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/entry/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Delete failed");
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Failed to delete the note. Please try again.");
    }
  };

  const renderSkeletons = () => (
    <Grid container spacing={2}>
      {[...Array(6)].map((_, index) => (
        <Grid size = {{xs:12, sm:6, md:4}} key={index}>
          <Card sx={{ p: 2, borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={4} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
            <Stack direction="row" justifyContent="space-between">
              <Skeleton variant="rectangular" width={60} height={20} />
              <Skeleton variant="circular" width={28} height={28} />
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight={700}>📓 My Notes</Typography>
              <Typography variant="body2" color="text.secondary">
                {loading ? "Loading..." : `${notes.length} notes in your workspace`}
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/new")} sx={{ px: 2, py: 1, borderRadius: 2, fontWeight: 600 }}>New Note</Button>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mb={2}>
            <Paper sx={{ p: 0.5, display: "flex", alignItems: "center", flex: 1, maxWidth: 400, borderRadius: 2 }}>
              <Search sx={{ color: "grey.500", mr: 1 }} />
              <InputBase placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ flex: 1, fontSize: "0.875rem" }} />
            </Paper>
            <Stack direction="row" spacing={1}>
              <IconButton><FilterList fontSize="small" /></IconButton>
              <IconButton><Sort fontSize="small" /></IconButton>
              <IconButton onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <ViewList fontSize="small" /> : <ViewModule fontSize="small" />}
              </IconButton>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            <Chip label={`${notes.length} Total`} color="primary" size="small" variant="outlined" />
            <Chip label={`${favoriteNotes.length} Favorites`} color="warning" size="small" variant="outlined" />
            <Chip label={`${recentNotes.length} Recent`} color="success" size="small" variant="outlined" />
          </Stack>
        </Box>

        {loading ? renderSkeletons() : filteredNotes.length === 0 ? (
          <Card sx={{ p: 4, textAlign: "center", border: "2px dashed #ddd" }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{searchQuery ? "No notes found" : "No notes yet"}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{searchQuery ? "Try a different search." : "Start writing your first note now!"}</Typography>
            <Button variant="contained" onClick={() => navigate("/new")}>{searchQuery ? `Create "${searchQuery}"` : "Create First Note"}</Button>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {filteredNotes.map((note) => (
              <Grid size = {{xs:12, sm:6, md:4}} key={note.id}>
                <NoteCard
                  id={note.id}
                  title={note.title}
                  synopsis={note.synopsis}
                  createdAt={note.createdAt}
                  isFavorite={note.isFavorite}
                  onFavoriteToggle={handleFavoriteToggle}
                  onDelete={handleDeleteNote}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </MainLayout>
  );
};

export default Dashboard;

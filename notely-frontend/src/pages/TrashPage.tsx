import {
  Box,
  Typography,
  IconButton,
  Stack,
  Container,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Grid,
} from "@mui/material";
import {
  RestoreFromTrash,
  DeleteForever,
  ArrowBack,
  Warning,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import MainLayout from "../components/MainLayout";

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
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    noteId: string;
    noteTitle: string;
  }>({
    open: false,
    noteId: "",
    noteTitle: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;

  const fetchTrashedNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${api}/api/entries/trash`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setTrashedNotes(data.data || []);
      } else {
        setError("Failed to load trashed notes");
      }
    } catch (err) {
      setError("Failed to load trashed notes");
      console.error("Failed to fetch trashed notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id: string, title: string) => {
    try {
      const res = await fetch(`${api}/api/entry/restore/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSuccess(`"${title}" has been restored successfully`);
        fetchTrashedNotes();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to restore note");
      }
    } catch (err) {
      setError("Failed to restore note");
      console.error("Restore failed:", err);
    }
  };

  const handlePermanentDelete = async (id: string, title: string) => {
    try {
      const res = await fetch(`${api}/api/entry/permanent/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSuccess(`"${title}" has been permanently deleted`);
        fetchTrashedNotes();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to delete note permanently");
      }
    } catch (err) {
      setError("Failed to delete note permanently");
      console.error("Permanent delete failed:", err);
    }
  };

  const openDeleteDialog = (noteId: string, noteTitle: string) => {
    setDeleteDialog({
      open: true,
      noteId,
      noteTitle,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      noteId: "",
      noteTitle: "",
    });
  };

  const confirmPermanentDelete = () => {
    handlePermanentDelete(deleteDialog.noteId, deleteDialog.noteTitle);
    closeDeleteDialog();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    fetchTrashedNotes();
  }, []);

  const renderSkeletons = () => (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={24}
                  sx={{ borderRadius: 1 }}
                />
                <Stack direction="row" spacing={1}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="circular" width={32} height={32} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                onClick={() => navigate("/dashboard")}
                sx={{
                  bgcolor: "grey.100",
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" fontWeight={700} color="grey.800">
                🗑️ Trash
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={fetchTrashedNotes}
                disabled={loading}
                sx={{ borderRadius: 2 }}
              >
                Refresh
              </Button>
            </Stack>
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {loading ? "Loading..." : `${trashedNotes.length} notes in trash`}
          </Typography>
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
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Warning fontSize="small" />
              <Typography variant="body2">
                Notes in trash will be automatically deleted after 30 days. You
                can restore them or delete them permanently.
              </Typography>
            </Stack>
          </Alert>
        </Box>
        {loading ? (
          renderSkeletons()
        ) : trashedNotes.length === 0 ? (
          <Card
            sx={{
              p: 8,
              textAlign: "center",
              bgcolor: "grey.50",
              border: "2px dashed rgba(0,0,0,0.1)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Trash is empty
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
            >
              When you delete notes, they'll appear here. You can restore them
              or delete them permanently.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/dashboard")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Back to Dashboard
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {trashedNotes.map((note) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={note.id}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    bgcolor: "grey.50",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Stack spacing={2} sx={{ height: "100%" }}>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "grey.700",
                            lineHeight: 1.3,
                            mb: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {note.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            flex: 1,
                          }}
                        >
                          {note.synopsis}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: "auto" }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={1}
                        >
                          <Chip
                            label={`Deleted: ${formatDate(note.updatedAt)}`}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: "0.75rem",
                              height: 24,
                              borderColor: "error.main",
                              color: "error.main",
                              bgcolor: "error.50",
                            }}
                          />

                          <Stack direction="row" spacing={1}>
                            <IconButton
                              size="small"
                              onClick={() => handleRestore(note.id, note.title)}
                              sx={{
                                color: "success.main",
                                "&:hover": {
                                  bgcolor: "success.50",
                                },
                              }}
                              title="Restore note"
                            >
                              <RestoreFromTrash fontSize="small" />
                            </IconButton>

                            <IconButton
                              size="small"
                              onClick={() =>
                                openDeleteDialog(note.id, note.title)
                              }
                              sx={{
                                color: "error.main",
                                "&:hover": {
                                  bgcolor: "error.50",
                                },
                              }}
                              title="Delete permanently"
                            >
                              <DeleteForever fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog
          open={deleteDialog.open}
          onClose={closeDeleteDialog}
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Warning color="error" />
              <Typography variant="h6" fontWeight={600}>
                Permanently Delete Note?
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to permanently delete{" "}
              <strong>"{deleteDialog.noteTitle}"</strong>?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This action cannot be undone. The note will be permanently removed
              from your account.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={closeDeleteDialog}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmPermanentDelete}
              variant="contained"
              color="error"
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Delete Permanently
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

export default TrashPage;

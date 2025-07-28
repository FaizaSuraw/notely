import type React from "react"
import { useState, useEffect } from "react"
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Box,
  Stack,
  IconButton,
  Chip,
  Divider,
  Alert,
  Skeleton,
} from "@mui/material"
import { ArrowBack, Save, Preview, Delete, Star, StarBorder } from "@mui/icons-material"
import { useParams, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import MainLayout from "../components/MainLayout"

interface Note {
  id: string
  title: string
  synopsis: string
  content: string
  createdAt: string
  updatedAt: string
  isFavorite?: boolean
}

const EditNote = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)

  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    synopsis: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    isFavorite: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/entry/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()

        if (data.success) {
          setNote(data.data)
        } else {
          setError("Failed to load note")
        }
      } catch (err) {
        setError("Failed to load note")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id && token) {
      fetchNote()
    }
  }, [id, token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!note.title.trim() || !note.synopsis.trim() || !note.content.trim()) {
      setError("All fields are required")
      return
    }

    setSaving(true)
    setError("")

    try {
      const res = await fetch(`http://localhost:5000/api/entry/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: note.title.trim(),
          synopsis: note.synopsis.trim(),
          content: note.content.trim(),
        }),
      })

      const data = await res.json()

      if (data.success) {
        setLastSaved(new Date())
        setSuccess("Note saved successfully!")
        setTimeout(() =>{
           navigate(`/note/${id}`); 
        }, 1000);
      } else {
        setError(data.message || "Failed to save note")
      }
    } catch (err) {
      setError("Failed to save note")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleFavoriteToggle = () => {
    setNote({ ...note, isFavorite: !note.isFavorite })
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/entry/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.ok) {
          navigate("/dashboard")
        }
      } catch (err) {
        setError("Failed to delete note")
      }
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Stack spacing={3}>
            <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
            <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
              </Box>
              <Box sx={{ width: { xs: "100%", lg: 300 } }}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
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
              <Typography variant="h4" fontWeight={700} color="grey.800">
                Edit Note
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              {lastSaved && (
                <Chip
                  label={`Last saved: ${lastSaved.toLocaleTimeString()}`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              )}
              <IconButton
                onClick={handleFavoriteToggle}
                sx={{
                  color: note.isFavorite ? "warning.main" : "grey.400",
                  "&:hover": {
                    bgcolor: note.isFavorite ? "warning.50" : "grey.100",
                  },
                }}
              >
                {note.isFavorite ? <Star /> : <StarBorder />}
              </IconButton>
            </Stack>
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
                  value={note.title}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  disabled={saving}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  label="Synopsis"
                  name="synopsis"
                  value={note.synopsis}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  disabled={saving}
                  helperText="Brief description of your note"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <Divider />

                <TextField
                  label="Content"
                  name="content"
                  value={note.content}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={20}
                  variant="outlined"
                  disabled={saving}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontFamily: "monospace",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      borderRadius: 2,
                    },
                  }}
                  helperText="Supports Markdown formatting"
                />
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleDelete}
                    disabled={saving}
                    sx={{ px: 3 }}
                  >
                    Delete
                  </Button>

                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<Preview />}
                      onClick={() => navigate(`/note/${id}`)}
                      disabled={saving}
                      sx={{ px: 3 }}
                    >
                      Preview
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Save />}
                      disabled={saving}
                      sx={{
                        px: 4,
                        py: 1.5,
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
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </Stack>
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
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Created
                  </Typography>
                  <Typography variant="body2">
                    {note.createdAt ? new Date(note.createdAt).toLocaleString() : "Unknown"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Last Modified
                  </Typography>
                  <Typography variant="body2">
                    {lastSaved
                      ? lastSaved.toLocaleString()
                      : note.updatedAt
                        ? new Date(note.updatedAt).toLocaleString()
                        : "Not saved yet"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Word Count
                  </Typography>
                  <Typography variant="body2">
                    {note.content.split(/\s+/).filter((word) => word.length > 0).length} words
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Character Count
                  </Typography>
                  <Typography variant="body2">{note.content.length} characters</Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Status
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label={note.isFavorite ? "Favorite" : "Regular"}
                      size="small"
                      color={note.isFavorite ? "warning" : "default"}
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </form>
      </Container>
    </MainLayout>
  )
}

export default EditNote

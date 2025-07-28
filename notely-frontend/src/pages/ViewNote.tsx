import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  IconButton,
  Chip,
  Divider,
  Alert,
  Skeleton,
} from "@mui/material"
import { ArrowBack, Edit, Delete, Star, StarBorder, Share, Print, MoreVert } from "@mui/icons-material"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
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

const ViewNote = () => {
  const { id } = useParams()
  const token = useAuthStore((state) => state.token)
  const navigate = useNavigate()

  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
          setError("Note not found or you don't have permission to view it")
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

  const handleEdit = () => {
    navigate(`/edit/${id}`)
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
        } else {
          setError("Failed to delete note")
        }
      } catch (err) {
        setError("Failed to delete note")
      }
    }
  }

  const handleFavoriteToggle = async () => {
    if (!note) return

    try {
      const res = await fetch(`http://localhost:5000/api/entry/${id}/favorite`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isFavorite: !note.isFavorite }),
      })

      if (res.ok) {
        setNote({ ...note, isFavorite: !note.isFavorite })
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderMarkdown = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <Typography key={index} variant="h4" fontWeight={700} sx={{ mt: 3, mb: 2 }}>
            {line.substring(2)}
          </Typography>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <Typography key={index} variant="h5" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
            {line.substring(3)}
          </Typography>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <Typography key={index} variant="h6" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
            {line.substring(4)}
          </Typography>
        )
      }
      if (line.trim() === "") {
        return <Box key={index} sx={{ height: 16 }} />
      }
      return (
        <Typography key={index} variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
          {line}
        </Typography>
      )
    })
  }

  if (loading) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Stack spacing={3}>
            <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
            <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="rectangular" height={600} sx={{ borderRadius: 2 }} />
              </Box>
              <Box sx={{ width: { xs: "100%", lg: 300 } }}>
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </MainLayout>
    )
  }

  if (error || !note) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error || "Note not found"}
          </Alert>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/dashboard")}
              sx={{ borderRadius: 2 }}
            >
              Back to Dashboard
            </Button>
          </Box>
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
                View Note
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
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

              <IconButton
                sx={{
                  color: "grey.600",
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <Share />
              </IconButton>

              <IconButton
                sx={{
                  color: "grey.600",
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <Print />
              </IconButton>

              <IconButton
                sx={{
                  color: "grey.600",
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <MoreVert />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

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
              <Typography variant="h3" fontWeight={700} color="grey.800" sx={{ lineHeight: 1.2 }}>
                {note.title}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontStyle: "italic",
                }}
              >
                {note.synopsis}
              </Typography>

              <Divider />
              <Box sx={{ minHeight: 400 }}>{renderMarkdown(note.content)}</Box>
              <Stack direction="row" spacing={2} justifyContent="flex-start" sx={{ pt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Edit Note
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleDelete}
                  sx={{ px: 3, py: 1.5, borderRadius: 2 }}
                >
                  Delete
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
              Note Information
            </Typography>

            <Stack spacing={3}>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Status
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip label="Published" size="small" color="success" variant="outlined" />
                  {note.isFavorite && <Chip label="Favorite" size="small" color="warning" variant="outlined" />}
                </Stack>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Created
                </Typography>
                <Typography variant="body2">{formatDate(note.createdAt)}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Last Modified
                </Typography>
                <Typography variant="body2">{formatDate(note.updatedAt)}</Typography>
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
                  Reading Time
                </Typography>
                <Typography variant="body2">
                  {Math.ceil(note.content.split(/\s+/).filter((word) => word.length > 0).length / 200)} min read
                </Typography>
              </Box>

              <Divider />

              <Stack spacing={2}>
                <Button variant="outlined" fullWidth onClick={() => navigate("/dashboard")} sx={{ borderRadius: 2 }}>
                  Back to Dashboard
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </MainLayout>
  )
}

export default ViewNote

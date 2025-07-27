import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

interface NoteCardProps {
  id: string;
  title: string;
  synopsis: string;
  createdAt: string;
}

const NoteCard = ({ id, title, synopsis, createdAt }: NoteCardProps) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/entry/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#fff",
        transition: "all 0.3s ease",
        ":hover": {
          boxShadow: 4,
          transform: "translateY(-3px)",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => navigate(`/edit/${id}`)} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleDelete} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Typography color="text.secondary" mt={1}>
        {synopsis}
      </Typography>

      <Typography
        variant="caption"
        color="text.disabled"
        mt={2}
        display="block"
      >
        {new Date(createdAt).toLocaleDateString()}
      </Typography>

      <Button
        variant="text"
        size="small"
        sx={{ mt: 2 }}
        onClick={() => navigate(`/note/${id}`)}
      >
        Read More →
      </Button>
    </Box>
  );
};

export default NoteCard;

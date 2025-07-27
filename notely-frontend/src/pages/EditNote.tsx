import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditNoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", synopsis: "", content: "" });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch(`http://localhost:5000/api/entry/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) setNote(data.data);
    };
    fetchNote();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:5000/api/entry/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });

    const data = await res.json();
    setLoading(false);
    if (data.success) navigate(`/note/${id}`); // redirect to notes list or detail
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Edit Note</Typography>
      <TextField
        label="Title"
        name="title"
        value={note.title}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Synopsis"
        name="synopsis"
        value={note.synopsis}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Content"
        name="content"
        value={note.content}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </Paper>
  );
};

export default EditNoteForm;

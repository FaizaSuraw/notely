import { Box, Typography } from "@mui/material";

interface NoteCardProps {
  title: string;
  synopsis: string;
  createdAt: string;
}

const NoteCard = ({ title, synopsis, createdAt }: NoteCardProps) => {
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
          cursor: "pointer",
        },
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
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
    </Box>
  );
};

export default NoteCard;

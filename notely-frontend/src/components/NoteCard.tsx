import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MoreVert,
  Star,
  StarBorder,
  Edit,
  Delete,
  Visibility,
  Share,
  Archive,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NoteCardProps {
  id: string;
  title: string;
  synopsis: string;
  createdAt: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const NoteCard = ({
  id,
  title,
  synopsis,
  createdAt,
  isFavorite = false,
  onFavoriteToggle,
  onDelete,
}: NoteCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
    onFavoriteToggle?.(id);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleEditClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleMenuClose();
    navigate(`/edit/${id}`);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getAccentColor = () => {
    const colors = [
      "#667eea", "#764ba2", "#f093fb", "#f5576c",
      "#4facfe", "#00f2fe", "#43e97b", "#38f9d7",
    ];
    return colors[title.length % colors.length];
  };

  return (
    <>
      <Card
        sx={{
          height: "100%", display: "flex", flexDirection: "column",
          borderRadius: 3, cursor: "pointer", position: "relative",
          border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          transition: "0.3s ease", "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            "& .note-actions": { opacity: 1 },
          },
        }}
        onClick={() => navigate(`/note/${id}`)}
      >
        <Box sx={{ height: 4, bgcolor: getAccentColor() }} />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Stack spacing={2} sx={{ height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", minHeight: 48 }}>
              <Typography variant="h6" fontWeight={600} noWrap sx={{ flex: 1, mr: 1 }}>
                {title}
              </Typography>
              <Box className="note-actions" sx={{ opacity: 0, display: "flex", gap: 0.5 }}>
                <IconButton size="small" onClick={handleFavoriteClick}>
                  {favorite ? <Star color="warning" fontSize="small" /> : <StarBorder fontSize="small" />}
                </IconButton>
                <IconButton size="small" onClick={handleMenuClick}>
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                flex: 1,
              }}
            >
              {synopsis}
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
              <Chip
                label={formatDate(createdAt)}
                size="small"
                sx={{
                  fontSize: "0.75rem", height: 24,
                  borderColor: "grey.300", color: "grey.600", bgcolor: "grey.50",
                }}
              />
              <IconButton size="small" onClick={handleEditClick}>
                <Edit fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {[
          { icon: <Visibility />, text: "View", action: () => navigate(`/note/${id}`) },
          { icon: <Edit />, text: "Edit", action: handleEditClick },
          { icon: <Share />, text: "Share", action: () => {} },
          { icon: <Archive />, text: "Archive", action: () => {} },
          {
            icon: <Delete />,
            text: "Delete",
            action: (e: React.MouseEvent) => {
              e.stopPropagation();
              handleMenuClose();
              onDelete?.(id);
            },
          },
        ].map((item, i) => (
          <MenuItem key={i} onClick={item.action}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NoteCard;

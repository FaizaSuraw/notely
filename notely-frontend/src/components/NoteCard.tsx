import type React from "react";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getAccentColor = () => {
    const colors = [
      "#667eea",
      "#764ba2",
      "#f093fb",
      "#f5576c",
      "#4facfe",
      "#00f2fe",
      "#43e97b",
      "#38f9d7",
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
    onFavoriteToggle?.(id);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleMenuClose();
    navigate(`/edit/${id}`);
  };

  const handleViewClick = () => {
    navigate(`/note/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMenuClose();
    onDelete?.(id);
  };

  const menuItems = [
    { icon: <Visibility />, text: "View", action: handleViewClick },
    { icon: <Edit />, text: "Edit", action: handleEditClick },
    { icon: <Share />, text: "Share", action: () => console.log("Share") },
    {
      icon: <Archive />,
      text: "Archive",
      action: () => console.log("Archive"),
    },
    {
      icon: <Delete />,
      text: "Delete",
      action: handleDeleteClick,
      color: "error.main",
    },
  ];

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            "& .note-actions": {
              opacity: 1,
            },
          },
        }}
        onClick={handleViewClick}
      >
        <Box
          sx={{
            height: 4,
            bgcolor: getAccentColor(),
            background: `linear-gradient(90deg, ${getAccentColor()}, ${getAccentColor()}88)`,
          }}
        />

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Stack spacing={2} sx={{ height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                minHeight: "48px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "grey.800",
                  lineHeight: 1.3,
                  flex: 1,
                  mr: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </Typography>

              <Box
                className="note-actions"
                sx={{
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                  display: "flex",
                  gap: 0.5,
                  flexShrink: 0,
                }}
              >
                <IconButton
                  size="small"
                  onClick={handleFavoriteClick}
                  sx={{
                    color: favorite ? "warning.main" : "grey.400",
                    "&:hover": {
                      bgcolor: favorite ? "warning.50" : "grey.100",
                    },
                  }}
                >
                  {favorite ? (
                    <Star fontSize="small" />
                  ) : (
                    <StarBorder fontSize="small" />
                  )}
                </IconButton>

                <IconButton
                  size="small"
                  onClick={handleMenuClick}
                  sx={{
                    color: "grey.400",
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
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

            <Box sx={{ mt: "auto", pt: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Chip
                  label={formatDate(createdAt)}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    height: 24,
                    borderColor: "grey.300",
                    color: "grey.600",
                    bgcolor: "grey.50",
                  }}
                />

                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    size="small"
                    onClick={handleEditClick}
                    sx={{
                      color: "primary.main",
                      opacity: 0.7,
                      "&:hover": {
                        bgcolor: "primary.50",
                        opacity: 1,
                      },
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              minWidth: 160,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={item.action}
            sx={{
              color: item.color || "inherit",
              "&:hover": {
                bgcolor: item.color ? `${item.color}15` : "grey.100",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NoteCard;

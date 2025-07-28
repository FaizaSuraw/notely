import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Card,
  Grid,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Edit,
  Security,
  Cloud,
  Speed,
  Devices,
  Group,
  Star,
  ArrowForward,
} from "@mui/icons-material";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <Edit sx={{ fontSize: 36, color: "primary.main" }} />,
      title: "Rich Text Editor",
      description:
        "Write with a powerful editor that supports markdown, formatting, and media embedding.",
    },
    {
      icon: <Security sx={{ fontSize: 36, color: "primary.main" }} />,
      title: "Secure & Private",
      description:
        "Your notes are encrypted end-to-end and stored securely in the cloud.",
    },
    {
      icon: <Cloud sx={{ fontSize: 36, color: "primary.main" }} />,
      title: "Cloud Sync",
      description:
        "Access your notes from anywhere with real-time synchronization across devices.",
    },
    {
      icon: <Speed sx={{ fontSize: 36, color: "primary.main" }} />,
      title: "Lightning Fast",
      description:
        "Optimized for speed with instant search and quick note creation.",
    },
    {
      icon: <Devices sx={{ fontSize: 36, color: "primary.main" }} />,
      title: "Cross Platform",
      description: "Works seamlessly on desktop, tablet, and mobile devices.",
    },
    {
      icon: <Group sx={{ fontSize: 36, color: "primary.main" }} />,
      title: "Team Collaboration",
      description:
        "Share notes and collaborate with team members in real-time.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      avatar: "SJ",
      rating: 5,
      text: "Notely has transformed how I organize my thoughts and manage projects. The interface is intuitive and the sync is flawless.",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      avatar: "MC",
      rating: 5,
      text: "As a developer, I love the markdown support and code syntax highlighting. It's perfect for technical documentation.",
    },
    {
      name: "Emily Rodriguez",
      role: "Content Writer",
      avatar: "ER",
      rating: 5,
      text: "The rich text editor is fantastic for drafting articles. I can focus on writing without distractions.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Notes Created" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          py: { xs: 6, md: 10 },
          px: 2,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 20% 80%, ${alpha(theme.palette.common.white, 0.1)} 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, ${alpha(theme.palette.common.white, 0.1)} 0%, transparent 50%)`,
            opacity: 0.8,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Stack spacing={6} alignItems="center" textAlign="center">
            <Chip
              label="✨ New: AI-powered note suggestions"
              sx={{
                bgcolor: alpha(theme.palette.common.white, 0.15),
                color: "white",
                fontSize: "0.8rem",
                px: 2,
                py: 0.5,
                borderRadius: 2,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                fontWeight: 800,
                color: "white",
              }}
            >
              ✍️ Welcome to{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(45deg, ${alpha(theme.palette.common.white, 0.9)}, ${alpha(theme.palette.common.white, 0.7)})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Notely
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: alpha(theme.palette.common.white, 0.9),
                maxWidth: "700px",
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
              }}
            >
              Capture ideas, plan tasks, and keep your thoughts organized —
              beautifully and securely.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/register")}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 3,
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: 3,
                }}
              >
                Sign In
              </Button>
            </Stack>
            <Grid container spacing={2} sx={{ maxWidth: 600 }}>
              {stats.map((stat, index) => (
                <Grid size={{ xs: 6, sm: 3 }} key={index}>
                  <Box textAlign="center">
                    <Typography
                      variant="h5"
                      sx={{ color: "white", fontWeight: 700 }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: alpha(theme.palette.common.white, 0.8) }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: 8, bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ mb: 4, fontWeight: 700 }}
          >
            Everything you need to stay organized
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Card sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ mb: 4, fontWeight: 700 }}
          >
            Loved by thousands of users
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card sx={{ p: 3 }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} sx={{ color: "#FFD700", fontSize: 18 }} />
                    ))}
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic", mb: 2 }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: 8,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          textAlign: "center",
          color: "white",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Ready to get organized?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of users who’ve transformed their note-taking with
            Notely.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate("/register")}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              px: 5,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 3,
            }}
          >
            Start Free Today
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;

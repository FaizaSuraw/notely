import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <><Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(145deg, ${theme.palette.primary.light}, #f5f5f5)`,
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography variant="h2" fontWeight="bold">
            ✍️ Welcome to Notely
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="sm">
            Your personal note-taking companion. Capture ideas, plan tasks, and
            keep your thoughts organized — beautifully and securely.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
          </Stack>

          <Box mt={6}>
            <img
              src="/assets/notes-illustration.svg"
              alt="Note Illustration"
              style={{ width: "100%", maxWidth: "500px" }} />
          </Box>
        </Stack>
      </Container>
    </Box>
    <footer />
    </>
  );
  
};

export default Home;

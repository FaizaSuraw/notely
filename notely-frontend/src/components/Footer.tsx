import { Box, Container, Link, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Notely. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#" underline="hover" color="inherit">
              Terms
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Privacy
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Contact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

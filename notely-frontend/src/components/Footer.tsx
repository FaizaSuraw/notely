import { Box, Container, Grid, Typography, Link, Stack, IconButton, Divider } from "@mui/material"
import { Twitter, LinkedIn, GitHub, Email } from "@mui/icons-material"

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Security", href: "#security" },
      { name: "Integrations", href: "#integrations" },
    ],
    Company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Press", href: "#press" },
    ],
    Support: [
      { name: "Help Center", href: "#help" },
      { name: "Contact Us", href: "#contact" },
      { name: "Status", href: "#status" },
      { name: "API Docs", href: "#api" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" },
    ],
  }

  const socialLinks = [
    { icon: <Twitter fontSize="small" />, href: "#twitter", label: "Twitter" },
    { icon: <LinkedIn fontSize="small" />, href: "#linkedin", label: "LinkedIn" },
    { icon: <GitHub fontSize="small" />, href: "#github", label: "GitHub" },
    { icon: <Email fontSize="small" />, href: "#email", label: "Email" },
  ]

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size = {{xs:12, md:4}}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✍️ Notely
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: "grey.400",
                maxWidth: 300,
                fontSize: "0.85rem",
                lineHeight: 1.5,
              }}
            >
              Your personal note-taking companion that grows with you. Capture ideas, plan tasks, and keep your thoughts organized beautifully and securely.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    color: "grey.400",
                    "&:hover": {
                      color: "primary.main",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid size = {{xs:6, sm:3, md:2}} key={category}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  fontSize: "0.9rem",
                  color: "white",
                }}
              >
                {category}
              </Typography>
              <Stack spacing={0.8}>
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: "grey.400",
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      "&:hover": {
                        color: "primary.main",
                      },
                      transition: "color 0.3s ease",
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, borderColor: "grey.800" }} />

        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="caption" color="grey.500" sx={{ fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} Notely. All rights reserved.
          </Typography>
          <Typography variant="caption" color="grey.500" sx={{ fontSize: "0.75rem" }}>
            Made with ❤️ for better note-taking
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer

import { Box, Container, Grid, Paper, Typography, Stack } from "@mui/material";

function CbtDashboard() {
  const stats = [
    {
      label: "Downloaded Exams",
      value: 128,
      gradient: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    },
    {
      label: "Uploaded Exams",
      value: 94,
      gradient: "linear-gradient(135deg, #111827, #2563eb)",
    },
    {
      label: "Total Candidates",
      value: 4520,
      gradient: "linear-gradient(135deg, #0b1120, #1d4ed8)",
    },
    {
      label: "Avg Candidates / Exam",
      value: 48,
      gradient: "linear-gradient(135deg, #0f172a, #3730a3)",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 800,
            mb: 4,
            letterSpacing: 1,
          }}
        >
          CBT Dashboard
        </Typography>

        {/* STATS GRID */}
        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.label}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  color: "#fff",
                  background: item.gradient,
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "0.3s ease",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0px 20px 40px rgba(37,99,235,0.25)",
                  },

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "120px",
                    height: "120px",
                    background: "rgba(255,255,255,0.08)",
                    filter: "blur(40px)",
                  },
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {item.label}
                  </Typography>

                  <Typography variant="h3" sx={{ fontWeight: 900 }}>
                    {item.value}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* EXTRA INFO SECTION */}
        <Box
          sx={{
            mt: 5,
            p: 3,
            borderRadius: 4,
            background: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
            System Insights
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
            • All exam downloads are synced with centre servers
            <br />
            • Upload integrity check is active
            <br />
            • Candidate distribution is balanced across exams
            <br />• System latency remains within acceptable threshold
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default CbtDashboard;

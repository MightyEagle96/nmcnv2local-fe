import {
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "CBT",
      subtitle: "Computer Based Testing Management",
      path: "/admin/cbt",
      gradient:
        "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,64,175,0.85))",
    },
    {
      title: "CAOSCE",
      subtitle: "Clinical Assessment & OSCE Management",
      path: "/admin/caosce",
      gradient:
        "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(79,70,229,0.85))",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #172554 0%, #020617 45%)",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontWeight: 800,
            mb: 1,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Admin Dashboard
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            mb: 6,
          }}
        >
          Select a management module
        </Typography>

        <Grid container spacing={4}>
          {dashboardCards.map((card) => (
            <Grid size={{ xs: 12, md: 6 }} key={card.title}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "transparent",
                }}
              >
                <CardActionArea
                  onClick={() => navigate(card.path)}
                  sx={{
                    height: 320,
                    borderRadius: 6,
                    position: "relative",
                    overflow: "hidden",
                    background: card.gradient,
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",

                    transition: "all 0.4s ease",

                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0px 20px 50px rgba(37,99,235,0.35)",
                    },

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top right, rgba(255,255,255,0.06), transparent)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      px: 4,
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        color: "#fff",
                        fontWeight: 900,
                        letterSpacing: 3,
                        mb: 2,
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: "rgba(255,255,255,0.75)",
                        maxWidth: 320,
                        lineHeight: 1.6,
                      }}
                    >
                      {card.subtitle}
                    </Typography>
                  </Box>

                  {/* Glow Effect */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: 250,
                      height: 250,
                      borderRadius: "50%",
                      background: "rgba(59,130,246,0.18)",
                      filter: "blur(60px)",
                      bottom: -80,
                      right: -80,
                    }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

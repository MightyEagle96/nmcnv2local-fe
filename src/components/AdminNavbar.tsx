import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppUser } from "../context/AppUserContext";

const cbtLinks = [
  { label: "Dashboard", path: "/admin/cbt" },
  { label: "Monitor Exam", path: "/admin/cbt/monitorexam" },
  { label: "Manage Exam", path: "/admin/cbt/manageexam" },
  { label: "Download & Upload", path: "/admin/cbt/download&upload" },
  { label: "Examination History", path: "/admin/cbt/examinationhistory" },
];

const caosceLinks = [
  { label: "Stations", path: "/caosce/stations" },
  { label: "Candidates", path: "/caosce/candidates" },
  { label: "Assessment", path: "/caosce/assessment" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const [cbtAnchor, setCbtAnchor] = useState<null | HTMLElement>(null);
  const [caosceAnchor, setCaosceAnchor] = useState<null | HTMLElement>(null);
  const { user } = useAppUser();

  const openMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: "cbt" | "caosce",
  ) => {
    if (type === "cbt") {
      setCbtAnchor(event.currentTarget);
    } else {
      setCaosceAnchor(event.currentTarget);
    }
  };

  const closeMenus = () => {
    setCbtAnchor(null);
    setCaosceAnchor(null);
  };

  const menuItemStyle = {
    py: 1.5,
    px: 2,
    transition: "0.3s ease",
    borderRadius: 1,
    "&:hover": {
      background: "linear-gradient(90deg, #0f172a 0%, #1e3a8a 100%)",
      color: "#fff",
    },
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#0b1120",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          py: 1,
        }}
      >
        {/* LEFT */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            color: "#fff",
          }}
        >
          CENTRE ID: {user?.centreId}
        </Typography>

        {/* CENTER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            component={Link}
            to={"/admin"}
            //onClick={() => navigate("/admin")}
            sx={{
              color: "#fff",
              fontWeight: 700,
              textTransform: "none",
              px: 2,
              borderRadius: 2,
              position: "relative",
              transition: "0.3s ease",

              "&:hover": {
                background: "linear-gradient(90deg, #0f172a, #1e3a8a)",
              },

              "&::after": {
                content: '""',
                position: "absolute",
                left: 12,
                right: 12,
                bottom: 6,
                height: "2px",
                background: "transparent",
                transition: "0.3s ease",
              },

              "&:hover::after": {
                background: "#2563eb",
              },
            }}
          >
            HOME
          </Button>
          {/* CBT MENU */}
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => openMenu(e, "cbt")}
            sx={{
              color: "#fff",
              fontWeight: 600,
              px: 2,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #0f172a 0%, #1e3a8a 100%)",
              },
            }}
          >
            CBT
          </Button>

          <Menu
            anchorEl={cbtAnchor}
            open={Boolean(cbtAnchor)}
            onClose={closeMenus}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  borderRadius: 3,
                  minWidth: 220,
                  background: "#111827",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.08)",
                },
              },
            }}
          >
            {cbtLinks.map((link, index) => (
              <Box key={link.path}>
                <MenuItem
                  sx={menuItemStyle}
                  onClick={() => {
                    navigate(link.path);
                    closeMenus();
                  }}
                >
                  {link.label}
                </MenuItem>

                {index !== cbtLinks.length - 1 && (
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
                )}
              </Box>
            ))}
          </Menu>

          {/* CAOSCE MENU */}
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            onClick={(e) => openMenu(e, "caosce")}
            sx={{
              color: "#fff",
              fontWeight: 600,
              px: 2,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #0f172a 0%, #1e3a8a 100%)",
              },
            }}
          >
            CAOSCE
          </Button>

          <Menu
            anchorEl={caosceAnchor}
            open={Boolean(caosceAnchor)}
            onClose={closeMenus}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  borderRadius: 3,
                  minWidth: 220,
                  background: "#111827",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.08)",
                },
              },
            }}
          >
            {caosceLinks.map((link, index) => (
              <Box key={link.path}>
                <MenuItem
                  sx={menuItemStyle}
                  onClick={() => {
                    navigate(link.path);
                    closeMenus();
                  }}
                >
                  {link.label}
                </MenuItem>

                {index !== caosceLinks.length - 1 && (
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
                )}
              </Box>
            ))}
          </Menu>
        </Box>

        {/* RIGHT */}
        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          sx={{
            borderRadius: 3,
            px: 3,
            fontWeight: 700,
            textTransform: "none",
            background: "linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)",
            "&:hover": {
              background: "linear-gradient(90deg, #172554 0%, #1d4ed8 100%)",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

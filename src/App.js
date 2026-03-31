import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import gif1 from "./video/gif1.gif";
import gif2 from "./video/gif2.gif";
import gif3 from "./video/gif3.gif";

dayjs.extend(duration);

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d97706",
    },
    secondary: {
      main: "#2f9c95",
    },
    background: {
      default: "#f3e8dc",
      paper: "#f7efe6",
    },
    text: {
      primary: "#2f241d",
      secondary: "#6f5b4d",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Segoe UI", "Trebuchet MS", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
});

const FormTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#7e695b",
    fontWeight: 600,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#d97706",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    backgroundColor: "#fbf7f2",
    color: "#2f241d",
    "& fieldset": {
      borderColor: "#d9c4b3",
    },
    "&:hover fieldset": {
      borderColor: "#c7a88d",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#d97706",
      borderWidth: 2,
    },
  },
});

const PrimaryButton = styled(Button)({
  borderRadius: 999,
  padding: "12px 18px",
  background: "linear-gradient(135deg, #e68a1c 0%, #c76a00 100%)",
  boxShadow: "0 12px 22px rgba(197, 111, 18, 0.22)",
  transition: "transform 180ms ease, box-shadow 180ms ease",
  "&:hover": {
    background: "linear-gradient(135deg, #ef9528 0%, #d9780a 100%)",
    boxShadow: "0 16px 26px rgba(197, 111, 18, 0.28)",
    transform: "translateY(-1px)",
  },
});

const SecondaryButton = styled(Button)({
  borderRadius: 999,
  padding: "12px 18px",
  borderColor: "#ceb9aa",
  color: "#6f5b4d",
  backgroundColor: "rgba(255, 252, 248, 0.45)",
  transition: "transform 180ms ease, border-color 180ms ease, background-color 180ms ease",
  "&:hover": {
    borderColor: "#bea391",
    backgroundColor: "#f1e6db",
    transform: "translateY(-1px)",
  },
});

const moodConfig = {
  1: {
    chip: "Long way to go",
    text: "Abhi logout ka sapna thoda door hai.",
    gif: gif1,
  },
  2: {
    chip: "Almost there",
    text: "Bas thoda aur, phir azaadi hi azaadi.",
    gif: gif2,
  },
  3: {
    chip: "You are free",
    text: "Aaj ka kaam khatam, ab zindagi shuru.",
    gif: gif3,
  },
};

function App() {
  const [loginTime, setLoginTime] = useState("");
  const [requiredHours, setRequiredHours] = useState("07:45");
  const [effectiveHours, setEffectiveHours] = useState("");
  const [lastLoginTime, setLastLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);
  const [gifStage, setGifStage] = useState(null);

  const mood = useMemo(() => {
    if (!gifStage) return null;
    return moodConfig[gifStage];
  }, [gifStage]);

  const calculateLogoutTime = () => {
    if (!loginTime || !requiredHours || !effectiveHours || !lastLoginTime) {
      alert("Please fill all the fields correctly.");
      return;
    }

    const [effH, effM] = effectiveHours.split(":").map(Number);
    const totalEffectiveMinutes = effH * 60 + effM;

    const [reqH, reqM] = requiredHours.split(":").map(Number);
    const requiredMinutes = reqH * 60 + reqM;

    const remainingMinutes = requiredMinutes - totalEffectiveMinutes;

    setHasCalculated(true);

    if (remainingMinutes <= 0) {
      setGifStage(3);
      setRemainingTime("0h 0m");
      setLogoutTime("You can log out now");
      return;
    }

    if (remainingMinutes > requiredMinutes / 2) {
      setGifStage(1);
    } else {
      setGifStage(2);
    }

    const [lastH, lastM] = lastLoginTime.split(":").map(Number);
    const lastLogin = dayjs().hour(lastH).minute(lastM);
    const logout = lastLogin.add(remainingMinutes, "minute");

    setRemainingTime(
      `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m`,
    );
    setLogoutTime(logout.format("hh:mm A"));
  };

  const clearFields = () => {
    setLoginTime("");
    setRequiredHours("07:45");
    setEffectiveHours("");
    setLastLoginTime("");
    setLogoutTime("");
    setRemainingTime("");
    setHasCalculated(false);
    setGifStage(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, rgba(255, 244, 229, 0.85) 0%, transparent 28%), radial-gradient(circle at 85% 15%, rgba(238, 198, 156, 0.35) 0%, transparent 22%), linear-gradient(180deg, #f8efe5 0%, #efe1d2 52%, #e6d5c3 100%)",
          py: { xs: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          "@keyframes floatGlow": {
            "0%": {
              transform: "translateY(0px) scale(1)",
            },
            "50%": {
              transform: "translateY(-12px) scale(1.03)",
            },
            "100%": {
              transform: "translateY(0px) scale(1)",
            },
          },
          "@keyframes fadeLift": {
            "0%": {
              opacity: 0,
              transform: "translateY(18px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
          "&::before": {
            content: '""',
            position: "absolute",
            width: { xs: 180, md: 260 },
            height: { xs: 180, md: 260 },
            top: { xs: -40, md: -70 },
            right: { xs: -60, md: -80 },
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(231, 164, 89, 0.24) 0%, rgba(231, 164, 89, 0) 72%)",
            animation: "floatGlow 8s ease-in-out infinite",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: { xs: 150, md: 210 },
            height: { xs: 150, md: 210 },
            bottom: { xs: -30, md: -50 },
            left: { xs: -30, md: -40 },
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(47, 156, 149, 0.12) 0%, rgba(47, 156, 149, 0) 72%)",
            animation: "floatGlow 10s ease-in-out infinite",
          },
        }}
      >
        <Container maxWidth="lg">
          <Stack
            spacing={{ xs: 2.5, md: 3 }}
            sx={{ alignItems: "center" }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: hasCalculated ? "100%" : 620,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                animation: "fadeLift 320ms ease-out",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{ mb: 1, width: "100%", textAlign: "center" }}
              >
                Work Hours Tracker
              </Typography>
              <Typography
                align="center"
                color="text.secondary"
                sx={{
                  width: "100%",
                  maxWidth: hasCalculated ? 640 : 560,
                  textAlign: "center",
                  mx: "auto",
                  display: "block",
                }}
              >
                Fill in your work details and calculate the exact time you can
                finally log out.
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: hasCalculated ? "minmax(320px, 430px) minmax(360px, 1fr)" : "minmax(320px, 620px)",
                },
                justifyContent: "center",
                alignItems: "stretch",
                gap: { xs: 2, md: 2.5 },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.4 },
                  borderRadius: 3,
                  backgroundColor: "background.paper",
                  border: "1px solid #dcc8b8",
                  boxShadow: "0 14px 26px rgba(87, 58, 33, 0.09)",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  animation: "fadeLift 420ms ease-out",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 30%)",
                    pointerEvents: "none",
                  },
                }}
              >
                <Stack spacing={1.6}>
                  <Typography variant="h6">Fill your details</Typography>

                  <FormTextField
                    label="Login Time"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={loginTime}
                    onChange={(e) => setLoginTime(e.target.value)}
                    fullWidth
                  />

                  <FormTextField
                    label="Required Hours (HH:mm)"
                    placeholder="e.g. 07:45"
                    value={requiredHours}
                    onChange={(e) => setRequiredHours(e.target.value)}
                    fullWidth
                  />

                  <FormTextField
                    label="Effective Hours Till Now (HH:mm)"
                    placeholder="e.g. 07:00"
                    value={effectiveHours}
                    onChange={(e) => setEffectiveHours(e.target.value)}
                    fullWidth
                  />

                  <FormTextField
                    label="Last Login Time"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={lastLoginTime}
                    onChange={(e) => setLastLoginTime(e.target.value)}
                    fullWidth
                  />

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 1.5,
                    }}
                  >
                    <PrimaryButton
                      variant="contained"
                      onClick={calculateLogoutTime}
                      fullWidth
                    >
                      Calculate Logout Time
                    </PrimaryButton>
                    <SecondaryButton
                      variant="outlined"
                      onClick={clearFields}
                      fullWidth
                    >
                      Clear
                    </SecondaryButton>
                  </Box>
                </Stack>
              </Paper>

              {hasCalculated && mood && (
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.75, sm: 2.1 },
                    borderRadius: 3,
                    backgroundColor: "#f3e8de",
                    border: "1px solid #d8c2b1",
                    boxShadow: "0 14px 26px rgba(87, 58, 33, 0.09)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.4,
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    animation: "fadeLift 520ms ease-out",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 45%)",
                      pointerEvents: "none",
                    },
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ mb: 0.4 }}>
                      Work Mood
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: "0.97rem" }}>
                      {mood.text}
                    </Typography>
                  </Box>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.2,
                      borderRadius: 2,
                      background:
                        "linear-gradient(180deg, #fbf3ea 0%, #f6eadf 100%)",
                      border: "1px solid #d6bda9",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.98rem",
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      Remaining Time: {remainingTime}
                    </Typography>
                    <Typography sx={{ fontSize: "0.98rem" }}>
                      <strong>Logout Time:</strong> {logoutTime}
                    </Typography>
                  </Paper>

                  <Box
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      background:
                        "linear-gradient(180deg, #f8eee4 0%, #f3e6da 100%)",
                      border: "1px solid #d6bda9",
                      minHeight: { xs: 180, md: 210 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={mood.gif}
                      alt="Work status gif"
                      sx={{
                        width: "100%",
                        maxWidth: 320,
                        height: { xs: 150, sm: 180, md: 180 },
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Typography
                    color="text.secondary"
                    sx={{ textAlign: "center", fontSize: "0.95rem" }}
                  >
                    {remainingTime === "0h 0m"
                      ? "All done. No extra minutes left."
                      : `${remainingTime} left before logout.`}
                  </Typography>
                </Paper>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

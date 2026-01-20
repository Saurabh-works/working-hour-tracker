// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   Paper,
//   Stack,
//   CssBaseline,
//   createTheme,
//   ThemeProvider,
//   TextField,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import dayjs from "dayjs";
// import duration from "dayjs/plugin/duration";

// dayjs.extend(duration);

// // Dark Theme
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     background: {
//       default: "#282826",
//       paper: "#33332f",
//     },
//     text: {
//       primary: "#ffffff",
//     },
//   },
// });

// // Styled Orange Button
// const StyledButton = styled(Button)({
//   backgroundColor: "#a3644e",
//   "&:hover": {
//     backgroundColor: "#854b39",
//   },
//   color: "#fff",
// });

// // Styled Text Field
// const StyledTextField = styled(TextField)({
//   "& .MuiInputBase-root": {
//     backgroundColor: "#44443e",
//     borderRadius: 4,
//     color: "#ddd", // text color
//     caretColor: "#a3644e", // orange caret
//   },
//   "& input": {
//     color: "#ddd",
//     backgroundColor: "#44443e", // same dark background
//   },
//   "& input[type='time']::-webkit-calendar-picker-indicator": {
//     filter: "invert(0.8)", // makes clock icon visible in dark mode
//   },
//   "& label": {
//     color: "#bbb",
//   },
//   "& label.Mui-focused": {
//     color: "#a3644e",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#666",
//     },
//     "&:hover fieldset": {
//       borderColor: "#a3644e",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#a3644e",
//     },
//   },
// });

// function App() {
//   const [loginTime, setLoginTime] = useState("");
//   const [requiredHours, setRequiredHours] = useState("07:45");
//   const [effectiveHours, setEffectiveHours] = useState("");
//   const [lastLoginTime, setLastLoginTime] = useState("");
//   const [logoutTime, setLogoutTime] = useState("");
//   const [remainingTime, setRemainingTime] = useState("");

//   const calculateLogoutTime = () => {
//     if (!loginTime || !requiredHours || !effectiveHours || !lastLoginTime) {
//       alert("Please fill all the fields correctly.");
//       return;
//     }

//     const [effH, effM] = effectiveHours.split(":").map(Number);
//     const totalEffectiveMinutes = effH * 60 + effM;

//     const [reqH, reqM] = requiredHours.split(":").map(Number);
//     const requiredMinutes = reqH * 60 + reqM;

//     const remainingMinutes = requiredMinutes - totalEffectiveMinutes;

//     if (remainingMinutes <= 0) {
//       setRemainingTime("0h 0m");
//       setLogoutTime("You can log out now ✅");
//       return;
//     }

//     const [lastH, lastM] = lastLoginTime.split(":").map(Number);
//     const lastLogin = dayjs().hour(lastH).minute(lastM);

//     const logout = lastLogin.add(remainingMinutes, "minute");

//     setRemainingTime(
//       `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m`
//     );
//     setLogoutTime(logout.format("hh:mm A"));
//   };

//   const clearFields = () => {
//     setLoginTime("");
//     setRequiredHours("07:45");
//     setEffectiveHours("");
//     setLastLoginTime("");
//     setLogoutTime("");
//     setRemainingTime("");
//   };

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <Container maxWidth="sm" sx={{ mt: 5 }}>
//         <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//           <Typography variant="h5" gutterBottom align="center">
//             🕒 Work Hours Tracker
//           </Typography>

//           <Stack spacing={3}>
//             <StyledTextField
//               label="Login Time"
//               type="time"
//               InputLabelProps={{ shrink: true }}
//               value={loginTime}
//               onChange={(e) => setLoginTime(e.target.value)}
//               fullWidth
//             />

//             <StyledTextField
//               label="Required Hours (HH:mm)"
//               placeholder="e.g. 07:45"
//               value={requiredHours}
//               onChange={(e) => setRequiredHours(e.target.value)}
//               fullWidth
//             />

//             <StyledTextField
//               label="Effective Hours Till Now (HH:mm)"
//               placeholder="e.g. 07:00"
//               value={effectiveHours}
//               onChange={(e) => setEffectiveHours(e.target.value)}
//               fullWidth
//             />

//             <StyledTextField
//               label="Last Login Time"
//               type="time"
//               InputLabelProps={{ shrink: true }}
//               value={lastLoginTime}
//               onChange={(e) => setLastLoginTime(e.target.value)}
//               fullWidth
//             />

//             <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
//               <StyledButton variant="contained" onClick={calculateLogoutTime} fullWidth>
//                 Calculate Logout Time
//               </StyledButton>
//               <Button variant="outlined" color="error" onClick={clearFields} fullWidth>
//                 Clear
//               </Button>
//             </Box>

//             {logoutTime && (
//               <Paper
//                 elevation={1}
//                 sx={{ mt: 3, p: 2, backgroundColor: "#3c3c37", borderRadius: 2 }}
//               >
//                 <Typography variant="body1" gutterBottom>
//                   ⏳ <strong>Remaining Time:</strong> {remainingTime}
//                 </Typography>
//                 <Typography variant="body1">
//                   ✅ <strong>You can log out at:</strong> {logoutTime}
//                 </Typography>
//               </Paper>
//             )}
//           </Stack>
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default App;

import React, { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  CssBaseline,
  createTheme,
  ThemeProvider,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
// ✅ Put your GIFs in: src/video/
// (or adjust paths if your folder is elsewhere)
import gif1 from "./video/gif1.gif"; // more than half time remaining
import gif2 from "./video/gif2.gif"; // more than half time completed (but not finished)
import gif3 from "./video/gif3.gif"; // completed time

dayjs.extend(duration);

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#282826",
      paper: "#33332f",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

// Styled Orange Button
const StyledButton = styled(Button)({
  backgroundColor: "#a3644e",
  "&:hover": {
    backgroundColor: "#854b39",
  },
  color: "#fff",
});

// Styled Text Field
const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#44443e",
    borderRadius: 4,
    color: "#ddd",
    caretColor: "#a3644e",
  },
  "& input": {
    color: "#ddd",
    backgroundColor: "#44443e",
  },
  "& input[type='time']::-webkit-calendar-picker-indicator": {
    filter: "invert(0.8)",
  },
  "& label": {
    color: "#bbb",
  },
  "& label.Mui-focused": {
    color: "#a3644e",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#666",
    },
    "&:hover fieldset": {
      borderColor: "#a3644e",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#a3644e",
    },
  },
});

function App() {
  const [loginTime, setLoginTime] = useState("");
  const [requiredHours, setRequiredHours] = useState("07:45");
  const [effectiveHours, setEffectiveHours] = useState("");
  const [lastLoginTime, setLastLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  // new UI state
  const [hasCalculated, setHasCalculated] = useState(false);
  const [gifStage, setGifStage] = useState(null); // 1 | 2 | 3 | null

  const selectedGif = useMemo(() => {
    if (!hasCalculated) return null;
    if (gifStage === 1) return gif1;
    if (gifStage === 2) return gif2;
    if (gifStage === 3) return gif3;
    return null;
  }, [hasCalculated, gifStage]);

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

    // ✅ Completed
    if (remainingMinutes <= 0) {
      setGifStage(3);
      setRemainingTime("0h 0m");
      setLogoutTime("You can log out now ✅");
      return;
    }

    // ✅ Choose GIF stage based on "half time" rule
    // - If remaining > half => gif1
    // - Else (more than half completed, not finished) => gif2
    if (remainingMinutes > requiredMinutes / 2) setGifStage(1);
    else setGifStage(2);

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {/* Wider container after calculation so form can sit left and gif on right */}
      <Container maxWidth={hasCalculated ? "lg" : "sm"} sx={{ mt: 5 }}>
        {/* Layout switches AFTER calculate:
            - before: single centered card
            - after: left form card + right gif, both vertically centered */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 3, md: 4 },
            }}
          >
            {/* LEFT: Form */}
            <Paper
              elevation={3}
              sx={{
                p: hasCalculated ? 2.2 : 4,
                borderRadius: 3,
                width: "100%",
                maxWidth: hasCalculated ? 420 : 560,
              }}
            >
              <Typography
                variant={hasCalculated ? "h6" : "h5"}
                gutterBottom
                align="center"
                sx={{ mb: hasCalculated ? 1 : 2 }}
              >
                🕒 Work Hours Tracker
              </Typography>

              <Stack spacing={hasCalculated ? 1.6 : 3}>
                <StyledTextField
                  label="Login Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={loginTime}
                  onChange={(e) => setLoginTime(e.target.value)}
                  fullWidth
                />

                <StyledTextField
                  label="Required Hours (HH:mm)"
                  placeholder="e.g. 07:45"
                  value={requiredHours}
                  onChange={(e) => setRequiredHours(e.target.value)}
                  fullWidth
                />

                <StyledTextField
                  label="Effective Hours Till Now (HH:mm)"
                  placeholder="e.g. 07:00"
                  value={effectiveHours}
                  onChange={(e) => setEffectiveHours(e.target.value)}
                  fullWidth
                />

                <StyledTextField
                  label="Last Login Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={lastLoginTime}
                  onChange={(e) => setLastLoginTime(e.target.value)}
                  fullWidth
                />

                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  gap={2}
                >
                  <StyledButton
                    size={hasCalculated ? "small" : "medium"}
                    variant="contained"
                    onClick={calculateLogoutTime}
                    fullWidth
                  >
                    Calculate Logout Time
                  </StyledButton>

                  <Button
                    size={hasCalculated ? "small" : "medium"}
                    variant="outlined"
                    color="error"
                    onClick={clearFields}
                    fullWidth
                  >
                    Clear
                  </Button>
                </Box>

                {logoutTime && (
                  <Paper
                    elevation={1}
                    sx={{
                      mt: 3,
                      p: hasCalculated ? 1.4 : 2,
                      backgroundColor: "#3c3c37",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1" gutterBottom>
                      ⏳ <strong>Remaining Time:</strong> {remainingTime}
                    </Typography>
                    <Typography variant="body1">
                      ✅ <strong>You can log out at:</strong> {logoutTime}
                    </Typography>
                  </Paper>
                )}
              </Stack>
            </Paper>

            {/* RIGHT: GIF (only after calculate) */}
            {hasCalculated && selectedGif && (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 520,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={selectedGif}
                  alt="Work status gif"
                  sx={{
                    width: "100%",
                    maxWidth: 520,
                    height: { xs: 260, md: 360 },
                    objectFit: "contain",
                    borderRadius: 3,
                    backgroundColor: "#33332f",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

import React, { useState, useMemo } from "react";
import Shortener from "./components/Shortener.jsx";
import { Typography, Box, ThemeProvider, createTheme, CssBaseline, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function App() {
  // default dark mode
  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: { main: "#90caf9" },
          success: { main: "#4caf50" },
          background: {
            default: mode === "dark" ? "#121212" : "#f9fafb",
            paper: mode === "dark" ? "#1e1e1e" : "#fff",
          },
        },
      }),
    [mode]
  );

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* applies global theme */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          px: 2,
        }}
      >
        {/* Top-left title + toggle */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4">URL Shortener</Typography>
          <IconButton onClick={toggleMode} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* Centered Shortener */}
        <Shortener />
      </Box>
    </ThemeProvider>
  );
}

export default App;

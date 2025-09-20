import React, { useState } from "react";
import { TextField, Button, Alert, Paper, useTheme } from "@mui/material";

const Shortener = () => {
  const theme = useTheme(); // get current theme mode
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.data.shortUrl);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  // Set link color depending on theme
  const urlColor = theme.palette.mode === "dark" ? "#a5d6a7" : "#2e7d32"; // light green in dark, dark green in light

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "background.paper",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-basic"
          label="Enter URL"
          variant="filled"
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          fullWidth
          required
          margin="normal"
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            borderRadius: 1,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 1 }}
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>

      {shortUrl && (
        <Alert severity="success" sx={{ wordBreak: "break-word" }}>
          Short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: urlColor,
              textDecoration: "underline",
            }}
          >
            {shortUrl}
          </a>
        </Alert>
      )}

      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
};

export default Shortener;

const express = require("express");
const TorrentSearchApi = require("torrent-search-api");

// Enable Torrent9 provider
// TorrentSearchApi.enableProvider("Torrent9");
TorrentSearchApi.enablePublicProviders();

const app = express();
const port = 3232;

// Define route to handle search query
app.get("/search", async (req, res) => {
  try {
    // Get search query and category from request parameters
    const query = req.query.query || ""; // Default to empty string if no query provided
    const category = req.query.category || "Movies"; // Default to 'Movies' if no category provided
    const limit = parseInt(req.query.limit) || 20; // Default to 20 if no limit provided

    // Perform the search
    const torrents = await TorrentSearchApi.search(query, category, limit);

    // Send the results back as JSON
    res.json(torrents);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("An error occurred while searching torrents");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

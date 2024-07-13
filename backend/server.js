const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("./controllers/userController.js");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and form data
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" })); // Increased limit for large base64 images



app.get("/api/summoner", async (req, res) => {
  const { gameName, tagLine } = req.query;
  const apiKey = "RGAPI-8ad5975a-93a8-4d4c-8b3b-1764d79529af";

  if (!gameName || !tagLine) {
    return res.status(400).json({ error: "gameName and tagLine are required" });
  }

  try {
    const response = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});


// Serve your React app (if using client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
console.log(`Server running on ${PORT}`);
});
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
app.use(express.static(path.join(__dirname, "../dist")));


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
  console.log(`Server is running on http://localhost:${PORT}`);
});
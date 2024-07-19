const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
require("dotenv").config();
const userController = require("./controllers/userController");
const authRouter = require("./oauth");
const requestRouter = require("./request");

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/dist")));
app.use("/oauth", authRouter);
app.use("/request", requestRouter);

// Route for adding user to the database
app.post("/api/register", userController.addUser, (req, res) => {
  res.status(200).json({ message: "Successful Registration" });
});


// authenticating users from the database
app.post('/api/login', userController.verifyUser, (req, res) => {
  
    console.log(req.cookies)
     res.status(200).json(res.locals.user.username);
})

// Finding all users in the database
app.post("/api/findAllUsers", userController.findAllUsers, (req, res) => {
  res.status(200).send(res.locals.users);
});

app.post("/api/getMyPfp", userController.getMyPfp, (req, res) => {
  res.status(200).send(res.locals.myPfp);
})

app.post('/api/getEmail', userController.getEmail, (req, res) => {
  res.status(200).send(res.locals.email);
})



// Endpoint to link Riot account
app.post("/api/link-riot-account", async (req, res) => {
  const { gameName, tagLine } = req.body;

  if (!gameName || !tagLine) {
    return res.status(400).json({ error: "gameName and tagLine are required" });
  }

  try {
    // Get PUUID from Riot ID
    const accountUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`;
    const accountResponse = await axios.get(accountUrl, {
      headers: { "X-Riot-Token": "RGAPI-0407f298-655a-43f5-ad4e-ab572c954b1d" },
    });

    const puuid = accountResponse.data.puuid;

    // Get Summoner data (only rank)
    const summonerUrl = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const summonerResponse = await axios.get(summonerUrl, {
      headers: { "X-Riot-Token": "RGAPI-0407f298-655a-43f5-ad4e-ab572c954b1d" },
    });

    const summonerId = summonerResponse.data.id;

    // Fetch the rank data
    const rankUrl = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
    const rankResponse = await axios.get(rankUrl, {
      headers: { "X-Riot-Token": "RGAPI-0407f298-655a-43f5-ad4e-ab572c954b1d" },
    });

    return res.status(200).json({
      gameName,
      tagLine,
      ranks: rankResponse.data,
    });
  } catch (error) {
    console.error("Error fetching data from Riot API:", error.message);
    if (error.response) {
      console.error("Riot API Response:", {
        data: error.response.data,
        status: error.response.status,
      });
    }
    res.status(error.response ? error.response.status : 500).json({
      error: error.response?.data || error.message,
    });
  }
});

// Serve your built React application
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

// Unknown route error handler
app.use("*", (req, res) => res.status(404).send("Page not found"));

// Global error handler
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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on PORT ${port}`));

module.exports = app;

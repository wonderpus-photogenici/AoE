const express = require('express'); 
const app = express();
const path = require('path');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');


const userController = require('./controllers/userController');

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '/dist')));

// route for adding user to the database
app.post("/api/register", userController.addUser, (req, res) => {
  res.status(200).json({ message: "Successful Registration" });
});


// authenticating users from the database
app.post('/api/login', userController.verifyUser, (req, res) => {
     res.status(200).json({message: 'Login Success'});
})



// Endpoint to link Riot account
app.post('/api/link-riot-account', async (req, res) => {
  const { gameName, tagLine, userId } = req.body;
  const apiKey = "RGAPI-8ad5975a-93a8-4d4c-8b3b-1764d79529af";

  if (!gameName || !tagLine || !userId) {
    return res.status(400).json({ error: 'gameName, tagLine, and userId are required' });
  }

  try {
    const response = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      { headers: { 'X-Riot-Token': apiKey } }
    );

    // Save the fetched data in the user's profile (assuming you have a user model or database)
    await userController.saveRiotAccountData(userId, response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});


app.get("/api/most-played-champion", async (req, res) => {
  const { userId } = req.query;
  const apiKey = "RGAPI-8ad5975a-93a8-4d4c-8b3b-1764d79529af";

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  // Fetch user data to get puuid
  const userData = await userController.fetchUserById(userId);
  const { puuid } = userData.riotAccount;

  try {
    const response = await axios.get(
      `https://americas.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`,
      { headers: { "X-Riot-Token": apiKey } }
    );
    const mastery = response.data[0]; // Assuming the first element is the most played

    res.status(200).json(mastery);
  } catch (error) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

app.get('*', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
})

// Unknown route error handler 
app.use('*', (req, res) => res.status(404).sendFile('../src/index.html'));

// Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


const port = process.env.port || 3001;
app.listen(3001, () => console.log(`Listening on PORT ${port}`))

module.exports = app;

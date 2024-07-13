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
app.post('/api/register', userController.addUser, (req, res) => {
    // res.status(200).json({message: 'Successful Registration'});
    res.redirect('/login');
})

// authenticating users from the database
app.post('/api/login', userController.verifyUser, (req, res) => {
    // res.status(200).json({message: 'Login Success'});
    console.log('end of login');
    res.redirect('/'); 
})

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
app.listen(3001, () => console.log(`Listening on PORT ${port}}`))

module.exports = app;

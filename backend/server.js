const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');
require('dotenv').config();
const userController = require('./controllers/userController');
const authRouter = require('./oauth');
const requestRouter = require('./request');
const { Server } = require('socket.io');

const expressServer = app.listen(port, () =>
  console.log(`Listening on PORT ${port}`)
);

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === 'product' ? false : ['http://localhost:8080'],
  },
});


app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/dist')));
app.use('/oauth', authRouter);
app.use('/request', requestRouter);

io.on('connection', (socket) => {
  console.log('User connected with socket id: ', socket.id);

  // upon connection - only to user
  socket.emit('message', 'Welcome to the Chat!');

  // upon connection - to all others except the user (broadcast)
  socket.broadcast.emit(
    'message',
    `User ${socket.id.substring(0, 5)} connected`
  );

  // socket.id is a unique identifier assigned by the server to each connected client
  // randomly generated and serves to indentify each connection
  socket.on('message', (data) => {
    console.log('Message Recevied in Server: ', data);
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });

  // knows if the user is disconnected
  socket.on('disconnect', () => {
    console.log('User disconnected with socket id: ', socket.id);
  });

  // listen for activity
  socket.on('activity', (data) => {
    console.log('data: ', data);
    socket.broadcast.emit('activity', data);
  });
});

// Route for adding user to the database
app.post('/api/register', userController.addUser, (req, res) => {
  res.status(200).json({ message: 'Successful Registration' });
});

// authenticating users from the database
app.post('/api/login', userController.verifyUser, (req, res) => {
  console.log(req.cookies);
  res.status(200).json(res.locals.user.username);
});

// Finding all users in the database
app.post('/api/findAllUsersPfp', userController.findAllUsersPfp, (req, res) => {
  // console.log('res.locals.users: ', res.locals.users);
  res.status(200).send(res.locals.users);
});

app.post('/api/getMyPfp', userController.getMyPfp, (req, res) => {
  res.status(200).send(res.locals.myPfp);
});

app.post('/api/getEmail', userController.getEmail, (req, res) => {
  res.status(200).send(res.locals.email);
});

app.post('/api/addGame', userController.addGame, (req, res) => {
  res.status(200).send(res.locals.allgames);
});

app.post('/api/getUserGames', userController.getUserGames, (req, res) => {
  res.status(200).send(res.locals.userGames);
});

app.post('/api/getUserName', userController.getUserName, (req, res) => {
  res.status(200).send(res.locals.username);
});

app.post('/api/getFeedData', userController.getFeedData, (req, res) => {
  res.status(200).send(res.locals.feedData);
});

app.post('/api/saveBio', userController.saveBio, (req, res) => {
  return res.status(200).send(res.locals.bio);
});

app.post('/api/getBio', userController.getBio, (req, res) => {
  res.status(200).send(res.locals.bio);
});

app.post('/api/getProfData', userController.getProfData, (req, res) => {
  res.status(200).send(res.locals.profData);
});

// Endpoint to link Riot account
app.post('/api/link-riot-account', async (req, res) => {
  const { gameName, tagLine } = req.body;

  if (!gameName || !tagLine) {
    return res.status(400).json({ error: 'gameName and tagLine are required' });
  }

  try {
    // Get PUUID from Riot ID
    const accountUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`;
    const accountResponse = await axios.get(accountUrl, {
      headers: { 'X-Riot-Token': 'RGAPI-d26b2775-02f2-4843-a9ce-0987a6a42710' },
    });

    const puuid = accountResponse.data.puuid;

    // Get Summoner data (only rank)
    const summonerUrl = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const summonerResponse = await axios.get(summonerUrl, {
      headers: { 'X-Riot-Token': 'RGAPI-d26b2775-02f2-4843-a9ce-0987a6a42710' },
    });

    const summonerId = summonerResponse.data.id;

    // Fetch the rank data
    const rankUrl = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
    const rankResponse = await axios.get(rankUrl, {
      headers: { 'X-Riot-Token': 'RGAPI-d26b2775-02f2-4843-a9ce-0987a6a42710' },
    });

    return res.status(200).json({
      gameName,
      tagLine,
      ranks: rankResponse.data,
    });
  } catch (error) {
    console.error('Error fetching data from Riot API:', error.message);
    if (error.response) {
      console.error('Riot API Response:', {
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
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// Unknown route error handler
app.use('*', (req, res) => res.status(404).send('Page not found'));

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

module.exports = app;

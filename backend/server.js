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
const db = require('./models/dbModels');

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

//Store connected users
const users = {}; // { userId: { id: socketId, name: username }}

// able to add User to the chatting page
// const addUser = (userId, username,  socketId) => {
//   !users.some((user)=> user.userId === userId) &&
//   users.push({ userId, username, socketId });
// }

// listening to connection of user
io.on('connection', (socket) => {
  console.log('User connected with socket id: ', socket.id);

  // Handling adding a user
  socket.on('addUser', (user) => {
    if (user.id) {
      users[user.id] = { id: socket.id, name: user.username };
      io.emit('getUsers', Object.values(users)); // Broadcast updated users list to all client
    }
  });

  // socket.id is a unique identifier assigned by the server to each connected client
  // randomly generated and serves to indentify each connection

  // handling incoming messages
  socket.on('message', async (message) => {
    console.log('message in server: ', message);

    const timestamp = new Date().toLocaleString(); // Get current timestamp
    const messageWithDetails = {
      sender: message.username,
      sender_id: message.userId,
      receiver_id: message.selectedFriendId,
      message: message.text,
      date_time: timestamp,
    };

    try {
      // save message to database
      const text = `INSERT INTO messages (sender_id, receiver_id, message, date_time)
      VALUES ($1, $2, $3, $4);`;
      const params = [
        message.userId,
        message.selectedFriendId,
        message.text,
        timestamp,
      ];

      await db.query(text, params);
      console.log('Message saved to database');

      io.emit('message', messageWithDetails);
    } catch (err) {
      console.error('Error saving message to database: ', err);
    }
  });

  // knows if the user is disconnected
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
    for (const [userId, user] of Object.entries(users)) {
      if (user.id === socket.id) {
        delete user[userId];
        io.emit('getUsers', Object.values(users));
        break;
      }
    }
  });

  // listen for activity
  socket.on('activity', (username) => {
    console.log('username: ', username);
    socket.broadcast.emit('activity', username);
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

app.post('/api/removeGame', userController.removeGame, (req, res) => {
  res.status(200).send(res.locals.allgames);
});

app.post('/api/addLanguage', userController.addLanguage, (req, res) => {
  res.status(200).send(res.locals.languages);
});

app.post('/api/removeLanguage', userController.removeLanguage, (req, res) => {
  res.status(200).send(res.locals.languages);
});

app.post('/api/updateLocation', userController.updateLocation, (req, res) => {
  res.status(200).send(res.locals.location);
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

app.post('/api/saveEmail', userController.saveEmail, (req, res) => {
  return res.status(200).send(res.locals.email);
});

app.post('/api/getBio', userController.getBio, (req, res) => {
  res.status(200).send(res.locals.bio);
});

app.post('/api/getProfData', userController.getProfData, (req, res) => {
  res.status(200).send(res.locals.profData);
});

app.post('/api/updatePfp', userController.updatePfp, (req, res) => {
  // console.log('at end of /api/updatePfp');
  res.status(200).send(res.locals.pfp);
});

app.post('/api/getPfpPath', userController.getPfpPath, (req, res) => {
  // console.log('at end of /api/updatePfp');
  res.status(200).send(res.locals.pfp);
});

// My API Key: Group Finder
// Limited to 20 requests every 1 second, 100 requests every 2 minutes
const riotAPIkey = 'RGAPI-03459f39-07a6-4438-a4c3-7d36c3122aec';

app.post('/api/getUserId', userController.getUserId, (req, res) => {
  res.status(200).json(res.locals.userId);
});

app.post('/api/getFriendsList', userController.getFriends, (req, res) => {
  // res.status(200).json(res.locals.userId);
  res.status(200).json(res.locals.friendsList);
});

app.post('/api/getChatHistory', userController.getChatHistory, (req, res) => {
  res.status(200).json(res.locals.chatHistory);
});

app.post(
  '/api/checkFriendsStatus',
  userController.checkFriendsStatus,
  (req, res) => {
    res.status(200).json(res.locals.friendsStatus);
  }
);

app.post('/api/addFriendById', userController.addFriendById, (req, res) => {
  res
    .status(200)
    .json({ success: true, message: 'Friend added successfully.' });
});

app.post(
  '/api/removeFriendById',
  userController.removeFriendById,
  (req, res) => {
    res
      .status(200)
      .json({ success: true, message: 'Friend removed successfully.' });
  }
);

app.post('/api/removeFriendByUsername',userController.removeFriendByUsername,(req, res) => {
    res.status(200)
      .json({ success: true, message: 'Friend removed successfully.' });
  }
);

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
      headers: { 'X-Riot-Token': riotAPIkey },
    });

    const puuid = accountResponse.data.puuid;

    // Get Summoner data (only rank)
    const summonerUrl = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const summonerResponse = await axios.get(summonerUrl, {
      headers: { 'X-Riot-Token': riotAPIkey },
    });

    const summonerId = summonerResponse.data.id;

    // Fetch the rank data
    const rankUrl = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
    const rankResponse = await axios.get(rankUrl, {
      headers: { 'X-Riot-Token': riotAPIkey },
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
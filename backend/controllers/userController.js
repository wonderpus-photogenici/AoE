const { checkPrime } = require('crypto');
const db = require('../models/dbModels');
const pass = require('../models/userModels');

const userController = {};

const createErr = (errInfo) => {
  const { method, type, err, status } = errInfo;
  return {
    log: `userController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`,
    },
    status: status,
  };
};

userController.addUser = async (req, res, next) => {
  const { username, password, email, pfp, supabase_id } = req.body;

  // First checking if the username already exists
  const text = `SELECT id, username, password FROM users WHERE username = $1`;
  const params = [username];
  const result = await db.query(text, params);

  if (result.rows.length !== 0) {
    return res.status(409).json({ message: 'Username already exists' });
  } else {
    try {
      // Creating blank profile
      const textProfile = `
      INSERT INTO profile ( bio, pfp, location, server, languages, fav4games, contact_info, friends, allgames )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;
      const paramsProfile = ['', '', '', '', [], ['', '', '', ''], '', [], []];
      const resultProfile = await db.query(textProfile, paramsProfile);
      res.locals.profile = resultProfile.rows[0];

      // Creating user
      const hashedPassword = await pass.hashPassword(password);
      const text = `
            INSERT INTO users ( username, password, email, pfp, profile_id, supabase_id )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;
      const params = [
        username,
        hashedPassword,
        email,
        pfp,
        res.locals.profile.id,
        supabase_id,
      ];
      const result = await db.query(text, params);
      // inserted cookies for adding in user;
      // res.cookies = ('username', username)
      res.locals.user = result.rows[0];
      return next();
    } catch (err) {
      return next(
        createErr({
          method: 'addUser',
          type: 'database query error',
          err,
          stat: 500,
        })
      );
    }
  }
};

userController.updatePfp = async (req, res, next) => {
  const { pfp, username } = req.body;
  // console.log('in uC.updatePfp');
  // console.log('pfp: ', pfp);
  // console.log('username: ', username);

  try {
    const text = `UPDATE users SET pfp = $1 WHERE username = $2 RETURNING pfp`;
    const params = [pfp, username];
    const result = await db.query(text, params);

    // console.log('in uC.updatePfp 2');

    res.locals.pfp = result.rows[0].pfp;

    // console.log('res.locals.pfp: ', res.locals.pfp);
    return next();
  } catch (err) {
    return next('Error in userController.updatePfp: ' + JSON.stringify(err));
  }
};

userController.getPfpPath = async (req, res, next) => {
  const { username } = req.body;

  console.log('in uC.getPfpPath username: ', username);

  try {
    const text = `SELECT pfp FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);
    res.locals.pfp = result.rows[0].pfp;

    return next();
  } catch (err) {
    return next('Error in userController.getPfpPath: ' + JSON.stringify(err));
  }
};

userController.addGame = async (req, res, next) => {
  const { userId, game } = req.body;
  console.log('userId: ', userId);
  console.log('game: ', game);
  try {
    // first I need to retrieve the list of current games played
    const text = `
    SELECT profile_id FROM users WHERE supabase_id = $1`;
    const params = [userId];
    const result = await db.query(text, params);
    // console.log('result.rows[0].profile_id: ', result.rows[0].profile_id);

    const text2 = `
    SELECT allgames FROM profile WHERE id = $1`;
    const params2 = [result.rows[0].profile_id];
    const result2 = await db.query(text2, params2);
    // console.log('result2.rows[0].allgames: ', result2.rows[0].allgames);

    // If the allgames array for that user already includes the game
    if (result2.rows[0].allgames.includes(game)) {
      return next();
    }

    result2.rows[0].allgames.push(game);
    // console.log('result2.rows[0].allgames: ', result2.rows[0].allgames);
    // const text = `
    // SELECT id, allgames FROM profile WHERE users
    // `

    // Then I'll need to push the new game to the array, later also implement logic that if the game is
    // already in the array then don't push it

    const text3 = `UPDATE profile SET allgames = $1 WHERE id = $2 RETURNING allgames`;
    const params3 = [result2.rows[0].allgames, result.rows[0].profile_id];
    const result3 = await db.query(text3, params3);

    // console.log('result3.rows[0].allgames: ', result3.rows[0].allgames);
    res.locals.allgames = result3.rows[0].allgames;
    return next();
  } catch (err) {
    return next('Error in userController.addGame: ' + JSON.stringify(err));
  }
};

userController.addLanguage = async (req, res, next) => {
  const { userId, language } = req.body;

  try {
    // first I need to retrieve the list of current games played
    const text = `
    SELECT profile_id FROM users WHERE supabase_id = $1`;
    const params = [userId];
    const result = await db.query(text, params);
    // console.log('result.rows[0].profile_id: ', result.rows[0].profile_id);

    const text2 = `
    SELECT languages FROM profile WHERE id = $1`;
    const params2 = [result.rows[0].profile_id];
    const result2 = await db.query(text2, params2);
    // console.log('result2.rows[0].allgames: ', result2.rows[0].allgames);

    // If the allgames array for that user already includes the language
    if (result2.rows[0].languages.includes(language)) {
      return next();
    }

    result2.rows[0].languages.push(language);
    // console.log('result2.rows[0].allgames: ', result2.rows[0].allgames);
    // const text = `
    // SELECT id, allgames FROM profile WHERE users
    // `

    // Then I'll need to push the new game to the array, later also implement logic that if the game is
    // already in the array then don't push it

    const text3 = `UPDATE profile SET languages = $1 WHERE id = $2 RETURNING languages`;
    const params3 = [result2.rows[0].languages, result.rows[0].profile_id];
    const result3 = await db.query(text3, params3);

    // console.log('result3.rows[0].allgames: ', result3.rows[0].allgames);
    res.locals.languages = result3.rows[0].languages;
    return next();
  } catch (err) {
    return next('Error in userController.addLanguage: ' + JSON.stringify(err));
  }
};

userController.removeLanguage = async (req, res, next) => {
  const { userId, language } = req.body;
  try {
    const text = `
    SELECT profile_id FROM users WHERE supabase_id = $1`;
    const params = [userId];
    const result = await db.query(text, params);
    // console.log('result.rows[0].profile_id: ', result.rows[0].profile_id);

    const text2 = `
    SELECT languages FROM profile WHERE id = $1`;
    const params2 = [result.rows[0].profile_id];
    const result2 = await db.query(text2, params2);

    // console.log('result2.rows[0].allgames: ', result2.rows[0].allgames);
    let newArr = result2.rows[0].languages.filter((e) => e !== language);
    // console.log('newArr: ', newArr);
    const text3 = `UPDATE profile SET languages = $1 WHERE id = $2 RETURNING languages`;
    const params3 = [newArr, result.rows[0].profile_id];
    const result3 = await db.query(text3, params3);

    res.locals.languages = result3.rows[0].languages;

    return next();
  } catch (err) {
    return next(
      'Error in userController.removeLanguage: ' + JSON.stringify(err)
    );
  }
};

userController.updateLocation = async (req, res, next) => {
  const { userId, location } = req.body;
  try {
    // first I need to retrieve the list of current games played
    const text = `
    SELECT profile_id FROM users WHERE supabase_id = $1`;
    const params = [userId];
    const result = await db.query(text, params);
    // console.log('result.rows[0].profile_id: ', result.rows[0].profile_id);

    const text2 = `
    UPDATE profile SET location = $1 WHERE id = $2 returning location`;
    const params2 = [location, result.rows[0].profile_id];
    const result2 = await db.query(text2, params2);

    res.locals.location = result2.rows[0].location;
    return next();
  } catch (err) {
    return next('Error in userController.addLanguage: ' + JSON.stringify(err));
  }
};

userController.removeGame = async (req, res, next) => {
  const { userId, game } = req.body;
  try {
    const text = `
    SELECT profile_id FROM users WHERE supabase_id = $1`;
    const params = [userId];
    const result = await db.query(text, params);
    // console.log('result.rows[0].profile_id: ', result.rows[0].profile_id);

    const text2 = `
    SELECT allgames FROM profile WHERE id = $1`;
    const params2 = [result.rows[0].profile_id];
    const result2 = await db.query(text2, params2);

    // console.log('result2.rows[0].allgames: ', result2.rows[0].allgames);
    let newArr = result2.rows[0].allgames.filter((e) => e !== game);
    // console.log('newArr: ', newArr);
    const text3 = `UPDATE profile SET allgames = $1 WHERE id = $2 RETURNING allgames`;
    const params3 = [newArr, result.rows[0].profile_id];
    const result3 = await db.query(text3, params3);

    res.locals.allgames = result3.rows[0].allgames;

    return next();
  } catch (err) {
    return next('Error in userController.removeGame: ' + JSON.stringify(err));
  }
};

userController.getUserGames = async (req, res, next) => {
  console.log('in getUserGames controller');
  const { userId } = req.body;
  try {
    const text = `
    SELECT profile_id FROM users WHERE supabase_id = $1`;
    const params = [userId];
    const result = await db.query(text, params);

    const text2 = `
    SELECT allgames FROM profile WHERE id = $1`;
    const params2 = [result.rows[0].profile_id];
    const result2 = await db.query(text2, params2);

    res.locals.userGames = result2.rows[0].allgames;
    return next();
  } catch (err) {
    return next('Error in userController.getUserGames: ' + JSON.stringify(err));
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: 'Missing username or password in userController.verifyUser',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }

  try {
    const text = `
    SELECT id, username, password FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'Username or password does not match' });
    }

    const user = result.rows[0];
    const passwordMatch = await pass.comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: 'Username or password does not match' });
    } else {
      res.locals.user = user;
      return next();
    }
  } catch (err) {
    return next('Error in userController.verifyUser: ' + JSON.stringify(err));
  }
};

userController.getUserName = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const text = `
    SELECT username FROM users WHERE supabase_id = $1`;
    const params = [userId];
    const result = await db.query(text, params);

    res.locals.username = result.rows[0].username;
    return next();
  } catch (err) {
    return next('Error in userController.getUserName: ' + JSON.stringify(err));
  }
};

userController.saveBio = async (req, res, next) => {
  const { bio, username } = req.body;
  // console.log('bio: ', bio);

  try {
    const text = `
    SELECT profile_id FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);
    // console.log('result.rows[0].profile_id: ', result.rows[0].profile_id);

    const text2 = `UPDATE profile SET bio = $1 WHERE id = $2 RETURNING bio;`;
    const params2 = [bio, result.rows[0].profile_id];
    const result2 = await db.query(text2, params2);

    res.locals.bio = result2.rows[0].bio;
    // console.log('result2.rows[0].bio: ', result2.rows[0].bio);
    // const text = `UPDATE profile SET riot_account = $1 WHERE id = $2 RETURNING *;`;
    // const params = [riotData, userId];
    // const result = await db.query(text, params);
    return next();
  } catch (err) {
    return next('Error in userController.saveBio: ' + JSON.stringify(err));
  }
};

userController.getProfData = async (req, res, next) => {
  const { username } = req.body;

  try {
    const text = `SELECT users.pfp, profile.allgames, profile.bio, profile.location, profile.languages, profile.contact_info FROM users JOIN profile on users.profile_id = profile.id WHERE users.username = $1`;
    const params = [username];
    const result = await db.query(text, params);

    res.locals.profData = result.rows[0];

    // console.log('res.locals.profData: ', res.locals.profData);
    return next();
  } catch (err) {
    return next('Error in userController.getProfData: ' + JSON.stringify(err));
  }
};

userController.saveEmail = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const text = `
    SELECT profile_id FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);
    // console.log('result.rows[0].profile_id: ', result.rows[0].profile_id);

    const text2 = `UPDATE profile SET contact_info = $1 WHERE id = $2 RETURNING contact_info;`;
    const params2 = [email, result.rows[0].profile_id];
    const result2 = await db.query(text2, params2);

    res.locals.email = result2.rows[0].contact_info;
    // console.log('result2.rows[0].bio: ', result2.rows[0].bio);
    // const text = `UPDATE profile SET riot_account = $1 WHERE id = $2 RETURNING *;`;
    // const params = [riotData, userId];
    // const result = await db.query(text, params);
    return next();
  } catch (err) {
    return next('Error in userController.saveEmail: ' + JSON.stringify(err));
  }
};

userController.getBio = async (req, res, next) => {
  const { username } = req.body;
  try {
    const text = `
    SELECT profile_id FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);

    const text2 = `SELECT bio FROm profile WHERE id = $1`;
    const params2 = [result.rows[0].profile_id];
    const result2 = await db.query(text2, params2);
    // console.log('result2.rows[0]: ', result2.rows[0]);
    res.locals.bio = result2.rows[0];
    return next();
  } catch (err) {
    return next('Error in userController.getBio: ' + JSON.stringify(err));
  }
};

userController.getFeedData = async (req, res, next) => {
  try {
    // Data Needed: pfp[users], username[users], allgames [profile]
    const text = `SELECT users.id, users.username, users.pfp, profile.allgames, profile.bio, profile.languages FROM users JOIN profile on users.profile_id = profile.id`;
    const params = [];
    const result = await db.query(text, params);

    res.locals.feedData = result.rows;
    return next();
  } catch (err) {
    return next('Error in userController.getFeedData: ' + JSON.stringify(err));
  }
};

userController.getPfpByUserId = async (req, res, next) => {
  console.log('at start of uC.getPfpByUserId');
  const { userId } = req.body;
  console.log( 'userId in uc.getPfpByUserId: ', userId);
  try {
    // Data Needed: pfp[users], username[users], allgames [profile]
    const text = `
    SELECT pfp FROM users WHERE id = $1`;
    const params = [userId];
    const result = await db.query(text, params);

    res.locals.pfp = result.rows[0].pfp;
    return next();
  } catch (err) {
    return next('Error in userController.getPfpByUserId: ' + JSON.stringify(err));
  }
}

userController.findAllUsersPfp = async (req, res, next) => {
  try {
    let usersObj = {};
    const text = `
    SELECT username, pfp FROM users`;
    const result = await db.query(text);
    for (let i = 0; i < result.rows.length; i++) {
      usersObj[result.rows[i].username] = result.rows[i].pfp;
    }
    res.locals.users = usersObj;
    return next();
  } catch (err) {
    return next('Error in userController.findUser: ' + JSON.stringify(err));
  }
};

userController.getMyPfp = async (req, res, next) => {
  try {
    let username = 'kyler';
    const text = `
    SELECT pfp FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);
    let pfpBase64 = result.rows[0].pfp;
    res.locals.myPfp = pfpBase64;
    return next();
  } catch (err) {
    return next('Error in userController.getMyPfp: ' + JSON.stringify(err));
  }
};

userController.getEmail = async (req, res, next) => {
  const { username } = req.body;
  try {
    const text = `
    SELECT email FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);
    res.locals.email = result.rows[0].email;
    return next();
  } catch (err) {
    return next('Error in userController.getEmail: ' + JSON.stringify(err));
  }
};

userController.saveRiotAccountData = async (userId, riotData) => {
  try {
    const text = `UPDATE users SET riot_account = $1 WHERE id = $2 RETURNING *;`;
    const params = [riotData, userId];
    const result = await db.query(text, params);
    return result.rows[0];
  } catch (err) {
    console.error('Error saving Riot account data:', err);
    throw err;
  }
};

userController.fetchUserById = async (userId) => {
  try {
    const text = `SELECT * FROM users WHERE id = $1;`;
    const params = [userId];
    const result = await db.query(text, params);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    throw err;
  }
};

// get user ID and use the ID to find friends
userController.getUserId = async (req, res, next) => {
  const { username } = req.body;
  try {
    const text = `SELECT id FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userId = result.rows[0].id;
    // console.log('User ID from backend: ', userId);
    res.locals.userId = userId;
    return next();
  } catch (err) {
    console.error('Error in getUserId middleware: ', err);
    return res.status(500).send('Internal server error.');
  }
};

// use user ID to look up friends
userController.getFriends = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const text = `SELECT users.username, users.pfp, users.id FROM users 
    INNER JOIN friends ON friends.friend_id = users.id 
    WHERE friends.user_id = $1`;
    const params = [userId];
    const result = await db.query(text, params);
    // console.log('result: ', result.rows);
    res.locals.friendsList = result.rows;
    return next();
  } catch (err) {
    console.error('Error in getFriends middleware: ', err);
    return res.status(500).send('Internal server error.');
  }
};

// use user ID to look up chat history
userController.getChatHistory = async (req, res, next) => {
  const { userId, selectedFriendId } = req.body;
  try {
    const text = `SELECT u1.username AS sender, u2.username AS receiver, m.message, m.date_time
    FROM messages m
    INNER JOIN users u1 ON m.sender_id = u1.id
    INNER JOIN users u2 ON m.receiver_id = u2.id
    WHERE (m.sender_id = $1 AND m.receiver_id = $2) OR 
    (m.sender_id = $2 AND m.receiver_id = $1)
    ORDER BY m.date_time`;
    const params = [userId, selectedFriendId];
    const result = await db.query(text, params);
    console.log('Query result: ', result.rows);
    res.locals.chatHistory = result.rows;
    return next();
  } catch (err) {
    console.error('Error in getChatHistory middleware: ', err);
    return res.status(500).send('Internal server error.');
  }
};

userController.addFriendById = async (req, res, next) => {
  const { userId, friendId } = req.body;
  try {
    // check if already friends
    const text1 = `SELECT * FROM friends WHERE user_id = $1 AND friend_id = $2`;
    const checkResult = await db.query(text1, [userId, friendId]);

    if (checkResult.rows.length > 0) {
      return res.json({ success: false, message: 'User is already a friend.' });
    }

    // add friend to list
    const text2 = `INSERT INTO friends (user_id, friend_id) VALUES ($1, $2), ($2, $1)`;
    await db.query(text2, [userId, friendId]);

    return next();
  } catch (err) {
    console.error('Error in addFriendById middleware: ', err);
    return res
      .status(500)
      .json({ success: false, message: 'Error in addFriendById middleware.' });
  }
};

userController.removeFriendById = async (req, res, next) => {
  const { userId, friendId } = req.body;
  try {
    // check if already friends
    const text1 = `SELECT * FROM friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)`;
    const checkResult = await db.query(text1, [userId, friendId]);

    if (checkResult.rows.length === 0) {
      return res.json({ success: false, message: 'User is not your friend.' });
    }

    // delete the two rows in friends
    const text2 = `DELETE FROM friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)`;
    await db.query(text2, [userId, friendId]);

    return next();
  } catch (err) {
    console.error('Error in removeFriendById middleware: ', err);
    return res.status(500).json({
      success: false,
      message: 'Error in removeFriendById middleware.',
    });
  }
};

userController.removeFriendByUsername = async (req, res, next) => {
  const { username } = req.body;
  try {

  } catch (err) {
    console.error('Error in removeFriendByUsername middleware: ', err);
    return res.status(500).json({
      success: false,
      message: 'Error in removeFriendByUsername middleware.',
    });
  }
}

userController.checkFriendsStatus = async (req, res, next) => {
  const { userId, friendId } = req.body;
  try {
    const text = `SELECT * FROM friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)`;
    const result = await db.query(text, [userId, friendId]);

    if (result.rows.length > 0) {
      console.log('middleware result: ', result.rows[0]);
      res.locals.friendsStatus = result.rows[0];
    } else {
      res.locals.friendsStatus = null;
    }
    return next();
  } catch (err) {
    console.error('Error in checkFriendsStatus middleware: ', err);
    return res.status(500).json('Error in checkFriendsStatus middleware.');
  }
};

module.exports = userController;
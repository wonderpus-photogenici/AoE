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
      const paramsProfile = ['', '', '', '', '', ['', '', '', ''], '', [], []];
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
    const text = `SELECT users.pfp, profile.allgames, profile.bio FROM users JOIN profile on users.profile_id = profile.id WHERE users.username = $1`;
    const params = [username];
    const result = await db.query(text, params);

    res.locals.profData = result.rows[0];
    return next();
  } catch (err) {
    return next('Error in userController.getProfData: ' + JSON.stringify(err));
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
    const text = `SELECT users.username, users.pfp, profile.allgames, profile.bio FROM users JOIN profile on users.profile_id = profile.id`;
    const params = [];
    const result = await db.query(text, params);

    res.locals.feedData = result.rows;
    return next();
  } catch (err) {
    return next('Error in userController.getFeedData: ' + JSON.stringify(err));
  }
};

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
    console.log('User ID: ', userId);
    res.locals.userId = userId;
    return next();
  } catch (err) {
    console.error('Error in getUserId middleware: ', err);
    return next(err);
  }
};

// use user ID to look up friends
// userController.getFriends = async (req, res, next) => {
//   const { id } = req.body;
//   try {
//     const text = `SELECT username FROM users INNER JOIN friends
//     ON friends.friend_id = users.id WHERE friends.user_id = $1`;
//     const params = [id];
//     const result = await db.query(text, params);
//     const friendsList = result.rows[0];
//     console.log(friendsList);
//     return next();
//   } catch (err) {
//     console.error('Error in getFriends middleware: ', err);
//     return next(err);
//   }
// };

// use user ID to look up chat history
userController.getChatHistory = async (req, res, next) => {};

module.exports = userController;

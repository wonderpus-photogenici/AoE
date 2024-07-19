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
    return res.status(409).json({ message: "Username already exists" });
  } else {
    try {
      // Creating blank profile
      const textProfile = `
      INSERT INTO profile ( bio, pfp, location, server, languages, fav4games, contact_info, friends )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`;
      const paramsProfile = ["", "", "", "", "", ["", "", "", ""], "", []];
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
          method: "addUser",
          type: "database query error",
          err,
          stat: 500,
        })
      );
    }
  }
};



userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: "Missing username or password in userController.verifyUser",
      status: 400,
      message: { err: "An error occurred" },
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
        .json({ message: "Username or password does not match" });
    }

    const user = result.rows[0];
    const passwordMatch = await pass.comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Username or password does not match" });
    } else {
      // console.log('user in verify user: ', user);
      res.locals.user = user;
      return next();
    }
  } catch (err) {
    return next("Error in userController.verifyUser: " + JSON.stringify(err));
  }
};

userController.findAllUsers = async (req, res, next) => {
  try {
    let usersArray = [];
    const text = `
    SELECT username FROM users`;
    const result = await db.query(text);
    for (let i = 0; i < result.rows.length; i++) {
      usersArray.push(result.rows[i].username);
    };
    // console.log('usersArray: ', usersArray);
    res.locals.users = usersArray;
    return next();
  } catch (err ){
    return next("Error in userController.findUser: " + JSON.stringify(err));
  }
}

userController.getMyPfp = async (req, res, next) => {
  try {
    let username = 'kyler';
    const text = `
    SELECT pfp FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);
    // console.log('result: ', result);
    let pfpBase64 = result.rows[0].pfp;
    // console.log('pfpBase64.pfp: ', pfpBase64.pfp)
    res.locals.myPfp = pfpBase64;
    return next();
  } catch (err ) {
    return next("Error in userController.getMyPfp: " + JSON.stringify(err));
  }
}

userController.getEmail = async (req, res, next) => {
  const { username } = req.body;
  try {
    const text = `
    SELECT email FROM users WHERE username = $1`;
    const params = [username];
    const result = await db.query(text, params);
    // console.log('result.rows[0].email in getEmail: ', result.rows[0].email);
    res.locals.email = result.rows[0].email;
    return next();
  } catch (err) {
    return next("Error in userController.getEmail: " + JSON.stringify(err));
  }
}

userController.saveRiotAccountData = async (userId, riotData) => {
  try {
    const text = `UPDATE users SET riot_account = $1 WHERE id = $2 RETURNING *;`;
    const params = [riotData, userId];
    const result = await db.query(text, params);
    return result.rows[0];
  } catch (err) {
    console.error("Error saving Riot account data:", err);
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
    console.error("Error fetching user by ID:", err);
    throw err;
  }
};


module.exports = userController;

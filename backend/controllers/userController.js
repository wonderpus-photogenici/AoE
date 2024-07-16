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
  const { username, password, email, pfp } = req.body;

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
      INSERT INTO profile ( bio, pfp, location, server, languages, fav4games, contact_info )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;
      const paramsProfile = ["", "", "", "", "", ["", "", "", ""], ""];
      const resultProfile = await db.query(textProfile, paramsProfile);
      res.locals.profile = resultProfile.rows[0];

      // Creating user
      const hashedPassword = await pass.hashPassword(password);
      const text = `
            INSERT INTO users ( username, password, email, pfp, profile_id )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
      const params = [
        username,
        hashedPassword,
        email,
        pfp,
        res.locals.profile.id,
      ];
      const result = await db.query(text, params);
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
      res.locals.user = user;
      return next();
    }
  } catch (err) {
    return next("Error in userController.verifyUser: " + JSON.stringify(err));
  }
};

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

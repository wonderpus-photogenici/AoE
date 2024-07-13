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
  // write code here
  const { username, password } = req.body;

  // First checking if the username already exists
  const text = `
  SELECT id, username, password FROM users WHERE username = $1`;
  const params = [username];
  const result = await db.query(text, params);
  // If it does already exist, then don't let them use that username
  if (result.rows.length !== 0) {
    // Just a temp console log until we get something to pop up on the screen
    // saying username already exists
    return console.log('username already exists');
  } else {
    try {
      // creating blank profile
      const textProfile = `
      INSERT INTO profile ( bio, pfp, location, server, languages, fav4games, contact_info )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;
      const paramsProfile = ['', '', '', '', '', ARRAY[('', '', '', '')], ''];
      const resultProfile = await db.query(textProfile, paramsProfile);
      res.locals.profile = resultProfile.rows[0];
      // creating user
      const hashedPassword = await pass.hashPassword(password);
      const text = `
            INSERT INTO users ( username, password, profile_id )
            VALUES ($1, $2, $3)
            RETURNING *`;
      const params = [username, hashedPassword, res.locals.profile.id];
      const result = await db.query(text, params);
      res.locals.user = result.rows[0];
      return next();
    } catch (err) {
      return next(
        createErr({
          method: 'addUser',
          type: 'database query error', // best guess
          err,
          stat: 500, // best guess
        })
      );
    }
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  // Best practice is to verify the cookie when you verify the user, gotta figure this out
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
      res.redirect('/signup');
    }

    const user = result.rows[0];

    const passwordMatch = await pass.comparePasswords(password, user.password);
    if (!passwordMatch) {
      // Just a temp console log
      return console.log('username or password does not match');
      // return res.redirect('/signup');
    } else {
      res.locals.user = user;
      return next();
    }
  } catch (err) {
    return next('Error in userController.verifyUser: ' + JSON.stringify(err));
  }
};

module.exports = userController;

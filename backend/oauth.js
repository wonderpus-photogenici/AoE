const express = require('express')
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const {OAuth2Client} = require('google-auth-library');

async function getUserData(access_token){
    console.log('in oauth.js');
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    //console.log('data', data);
}

router.get('/', async(req, res, next) => {
    const code = req.query.code;
    try {
        console.log('in oauth.js');
        const redirectURL = 'http://127.0.0.1:3001/oauth';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
        );
        const res2 = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res2.tokens);

        const user = oAuth2Client.credentials;
        //console.log('credentials', user);
        await getUserData(user.access_token);

        res.redirect('http://localhost:8080/home')

    } catch(err) {
        console.log(err)
        console.log('Error with signing in with Google')
    }
})

module.exports = router; 
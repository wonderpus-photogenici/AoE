const express = require('express')
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const {OAuth2Client} = require('google-auth-library');



// Google requesting page
router.post('/', async(req, res) => {
    res.header('Acess-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Referrer-Policy','no-referrer-when-downgrade');

    const redirectURL = 'http://127.0.0.1:3001/oauth'

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    });

    res.json({url:authorizeUrl})

})



module.exports = router; 
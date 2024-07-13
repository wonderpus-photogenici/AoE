// express

const express = require('express'); 
const App = express();
const path = require('path');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');


const userController = require('./controllers/userController');

App.use(cors());
App.use(cookieParser());
App.use(express.json());
App.use(express.urlencoded({extended: true}))

// set up the static files for the entry of webpack path.join(direct path)
App.use(express.static(path.join(__dirname, '/dist')));

//route for adding user to the database
App.post('/api/register', userController.addUser, (req, res) => {
    res.status(200).json({message: 'Successful Registration'})
    res.redirect('/login');
})

//autenticating users from the database; 
App.post('/api/login', userController.verifyUser, (req, res) => {
    res.status(200).json({message: 'Login Success'})
    res.redirect('/home'); 
})

//User will be directed to the html login page. 
App.get('*', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
})

// App.get('/home', (req, res) => {
//     return res.status(200).sendFile('../src/index.html')
// }) 

// App.get('/profile', (req, res) => {
//     return res.status(200).sendFile('../src/index.html')
// })

// App.get('/signUp', (req, res) => {
//     return res.status(200).sendFile('../src/index.html')
// })





//Unknown route error handler 
App.use('*', (req, res) => res.status(404).sendFile('../src/index.html'))



//Global error handler
App.use((err, req, res, next) => {
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
App.listen(3001, () => console.log(`Listening on PORT ${port}}`))

module.exports = App;
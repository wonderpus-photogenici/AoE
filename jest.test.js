const { describe, after } = require('node:test');
const userController = require('./backend/controllers/userController.js');
//const createErr = require('./backend/controllers/userController.js');
import httpMocks from 'node-mocks-http';
import db from './backend/models/dbModels.js';

describe ('add user', () => {
let req;
let res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
// afterAll (() => {
// //handle side effects
// })
test('adds user', async () => {
    req.body.username = 'testUserJest'
    req.body.password = '123'
    jest.spyOn(db, 'query').mockResolvedValueOnce({ rowCount: 0, rows: [] }).mockResolvedValueOnce({ rowCount: 1, rows: ['hi'] }).mockResolvedValueOnce({ rowCount: 1, rows: ['hi'] });
    await userController.addUser(req, res, (err) => {
      //console.log(res.locals);
      expect(res.locals.profile).toEqual('hi');
      //expect(err).not.toBeDefined();
    })
  });
  //testing error handling on line 28 in userController
  test('fails to create user when the user already exists', async () => {
    jest.spyOn(db, 'query').mockResolvedValueOnce({ rowCount: 1, rows: ['wouldExistIfSameUserFound'] });
    let testResult = await userController.addUser(req, res)
    expect(testResult.statusCode).toEqual(409)
  });
  //testing global error handling created on line and invoked on line 61 in the userController file
  //but actually kind of redundant maybe
  test.skip('global error handler', async () => {
    req.body.username = 'gavin'
    req.body.password = '123'
    
    jest.spyOn(db, 'query').mockResolvedValueOnce({ rowCount: 0, rows: [] }).mockResolvedValueOnce({ rowCount: 1, rows: ['hi'] }).mockResolvedValueOnce({ rowCount: 1, rows: ['hi'] });
    let errObj = await userController.addUser(req, res);
      console.log('test is ', errObj);
      //expect(err).toEqual({});
    
  });
}
)

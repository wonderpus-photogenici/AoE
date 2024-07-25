const userController = require('/backend/controllers/userController.js');

test('adds 1 + 2 to equal 3', () => {
    expect(userController.addUser(1, 2)).toBe(3);
  });

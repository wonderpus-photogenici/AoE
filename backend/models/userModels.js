const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    return hashedPassword;
}

const comparePasswords = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}

module.exports = {
    hashPassword,
    comparePasswords,
};
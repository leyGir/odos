const User = require('../models/user');

exports.cleanUpDatabase = async function() {
  await Promise.all([
    User.deleteMany()
  ]);
};

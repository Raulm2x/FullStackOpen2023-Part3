const User = require('../models/user')
const bcrypt = require('bcrypt')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const passwdGen = async (passwd) => {
  const passwordHash = await bcrypt.hash(passwd, 10)
  return passwordHash
}

module.exports = {
    usersInDb,
    passwdGen
}
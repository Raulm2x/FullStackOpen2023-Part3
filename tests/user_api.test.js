const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../utils/test_helper')


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret',10)
    //const passwd = await helper.passwdGen('sekret')
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username and +3 length password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('password length < 3', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'rm2',
      name: 'Some new junior',
      password: 'sa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('login', () => {
  test('login...', async () => {
    
    const userData = {
      username: 'root',
      password: 'sekret',
    }

    await api
      .post('/api/login')
      .send(userData)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('login failed', async () => {
    const userData = {
      username: 'root',
      password: 'secret',
    }

    await api
      .post('/api/login')
      .send(userData)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(async () => {
    await mongoose.connection.close()
})
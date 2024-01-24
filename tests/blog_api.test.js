const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const { requestLogger } = require('../utils/middleware')
const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'The Mythical Man-Month',
        author: 'Frederick P. Brooks',
        url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
        likes: 10,
    },
    {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        url: 'https://www.goodreads.com/book/show/3735293-clean-code',
        likes: 8,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blogObject => blogObject.save())
    Promise.all(promiseArray)
})

describe('Getting blogs', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }, 100000)
      
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    }, 100000)
        
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
    
        const titles = response.body.map(r => r.title)
    
        expect(titles).toContainEqual( 
            'The Mythical Man-Month'
        )
    }, 100000)
      
    test('ID property', async () => {
        const response = await api.get('/api/blogs')
    
        const blogs = response.body
        const oneBlog = blogs[1]
        console.log(oneBlog)
    
        expect(oneBlog.id).toBeDefined()
    }, 100000)
})

describe('Creating blogs', () => {
    test('Creating a new blog', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
        }
        
        const newBlogObject = new Blog(newBlog)
        await newBlogObject.save()
        
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length + 1)
    })
    
    test('No likes property', async () => {
        const newBlog = {
            title: 'JavaScript: The Good Parts',
            author: 'Douglas Crockford',
            url: 'https://www.oreilly.com/library/view/javascript-the-good/9780596517748/'
        }
    
        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${user.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const addedBlog = response.body[3]
        console.log(addedBlog)
        expect(addedBlog.id).toBeDefined()
    })
    
    test('Bad request: title or url missing', async () => {
        const newBlog = {
            title: 'JavaScript: The Good Parts',
            author: 'Douglas Crockford',
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
        const newBlog2 = {
            author: 'Douglas Crockford',
            url: 'https://www.oreilly.com/library/view/javascript-the-good/9780596517748/'
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)
    })
})

describe('Deleting blogs', () => {
    test('deleting a blog', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body
        const blog = blogs[1]
        const id = blog.id
    
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)
    })
})

describe('Updating blogs', () => {
    test('updating amount of likes', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body
        const blog = blogs[1]
        const id = blog.id
        
        newInfo = {
            likes: 20
        }

        await api
            .put(`/api/blogs/${id}`)
            .send(newInfo)
            .expect(200)

        const newResponse = await api.get('/api/blogs')
        const updatedBlog = newResponse.body[1]
        console.log(updatedBlog)
        expect(updatedBlog.likes).toBe(20)
    })  

})

afterAll(async () => {
  await mongoose.connection.close()
})
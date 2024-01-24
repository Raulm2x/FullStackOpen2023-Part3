const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{username:1, name:1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
    
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!body || !body.title || !body.url) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user? user.id : null,
    })

    const savedBlog = await blog.save()
    
    if (user) {
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    }

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const newData = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
   
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newData, 
        { new: true})
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
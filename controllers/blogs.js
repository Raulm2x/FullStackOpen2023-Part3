const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    response.json(blog)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
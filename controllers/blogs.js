const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


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
    const userId = request.user.id
    const user = await User.findById(userId) 

    const blogId = request.params.id
    const blog = await Blog.findById(blogId)

    if (blog.user.toString() === userId.toString()){
        await Blog.findByIdAndDelete(blogId)
        user.blogs = user.blogs.filter(b => b != blogId)
        await user.save()
        response.status(204).end()
    }
    else{
        response.status(401).json({error: 'Unauthorized'})
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = request.user

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
    const userId = request.user.id
    const user = await User.findById(userId)
   
    const blog = await Blog.findById(request.params.id)

    const action = body.action? 1 : -1

    let userList
    if (body.action){
      if (blog.likedBy.some(id => id.toString() === userId.toString())) {
        return response.status(400).json({ error: 'Blog already liked by user' })
      } else {
        userList = blog.likedBy.concat(userId)
      }
    } else {
      if (blog.likedBy.some(id => id.toString() === userId.toString())) {
        userList = blog.likedBy.filter(u => u.toString() != userId.toString())
      }
      else {
        return response.status(400).json({ error: 'Blog already disliked by user' })
      }
    }
        
    //console.log('userList',userList)
    
    const newData = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: blog.likedBy? blog.likedBy.length + action : 1,
        likedBy: userList
    }
    
    //console.log('newData',newData)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newData, 
        { new: true})

    //console.log('updateBlog',updatedBlog)
    let blogList
    if (body.action) {
      if (!user.liked.some(id => id.toString() === request.params.id.toString())) {
        blogList = user.liked.concat(request.params.id)
      }
      else {
        return response.status(400).json({error: 'Blog already liked by user'})
      }
    } else {
      if (user.liked.some(id => id.toString() === request.params.id.toString())) {
        blogList = user.liked.filter(b => b.toString() !== request.params.id.toString())
      }
      else {
        return response.status(400).json({error: 'Blog already disliked by user'})
      }
  }

    //console.log(blogList)
    const upUser = { ...user.toObject(), liked: blogList }
    //console.log(upUser)
    await User.findByIdAndUpdate({ _id:userId}, upUser, {new: true})
    
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
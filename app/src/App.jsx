import { useState, useEffect, useRef, useCallback } from 'react'
import apiBlogs from './services/apiBlogs'
import loginService from './services/login'
import apiUsers from './services/apiUsers'

import ShowBlogs from './components/ShowBlogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogOutButton from './components/LogOutButton'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import listHelper from '../../utils/list_helper'

const App = () => {
  const [blogs,setBlogs] = useState([])

  //Login
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  //Notification
  const [Message, setMessage] = useState(null)
  const [type, setType] = useState(true)

  const hook = useCallback( async () => {
    try {
      const initialBlogs = await apiBlogs.getAll()
      const sortedBlogs = listHelper.sortByLikes(initialBlogs)
      setBlogs(sortedBlogs)
      console.log(blogs.length,'blogs were loaded')
    } catch (error) {
      console.error(error)
    }
  }, [blogs])

  const fetchUsers = useCallback( async () => {
    try {
      const userList = await apiUsers.getAll()
      setUsers(userList)
      //console.log(userList)
      const foundUser = userList.find(u => u.username === user.username)
      setCurrentUser(foundUser)
      console.log('user loaded')
    } catch (error) {
      console.error(error)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchUsers()
    }
  }, [user, fetchUsers])

  useEffect(() => {
    hook()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      apiBlogs.setToken(user.token)
    }
  }, [])

  // Add a new blog
  const blogFormRef = useRef()
  const addBlog = async (newBlog) => {
    try {
      await apiBlogs.create(newBlog)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()

      fetchUsers()

      setType(true)
      setMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      hook()
    } catch (error) {
      console.error(error)
    }
  }

  //Like Button
  const handleLikeButton = async (blog, action) => {
    const updatedBlog = { ...blog, action }

    try {
      await apiBlogs.update(blog.id, updatedBlog)
      console.log(action? 'liked':'disliked')

      const upBlogs = blogs.map(b => (b.id === blog.id
        ? { ...blog,
          likes: blog.likes + (action? 1:-1),
          likedBy: action
            ? blog.likedBy.concat(currentUser.id)
            : blog.likedBy.filter(b => b !== currentUser.id)
        }
        : b
      ))
      //console.log('upBlogs', upBlogs)
      setBlogs(upBlogs)

      const upUser = { ...currentUser,
        liked: action
          ? currentUser.liked.concat(blog.id)
          : currentUser.liked.filter(l => l.toString() !== blog.id.toString()) }
      //console.log('upUser', upUser)
      if (upUser && currentUser !== upUser) {
        setCurrentUser(upUser)
      }

      const updatedUsers = users.map(u => u.id.toString() === upUser.id.toString()? upUser : u )
      if (updatedUsers && users !== updatedUsers) {
        setUsers(updatedUsers)
      }
    } catch (error){
      console.error(error)
    }
  }

  /* // Check if blogs, currentUser and users updated after press dis/like button

  useEffect(() => {
    console.log('blogs', blogs)
  }, [blogs])

  useEffect(() => {
    console.log('currentUser',currentUser)
  }, [currentUser])

  useEffect(() => {
    console.log('users',users)
  }, [users])*/

  //Remove Button
  const handleRemove = async (blog) => {
    if (window.confirm(`Delete titled blog: ${blog.title}?`)) {
      try{
        await apiBlogs.erase(blog.id)

        const upUser = { ...currentUser,
          blogs: currentUser.blogs.filter(l => l !== blog.id) }
        setCurrentUser(upUser)

        const upBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(upBlogs)

        setType(true)
        setMessage(
          `${blog.title} by ${blog.author} was removed`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      } catch (error) {
        console.error(error)
      }
    }
  }

  // Log in
  const handleLogin = async (userData) => {
    try {
      const user = await loginService.login(userData)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      apiBlogs.setToken(user.token)
      setUser(user)

      setType(true)
      setMessage(
        'Successfully logged in'
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      console.log('error in handle login')

      setType(false)
      setMessage(
        'Wrong username or password'
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  //Log Out
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setCurrentUser(null)
    setUsers([])
  }


  //-----Show Components-----
  const showLoginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Log in'>
          <LoginForm
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const showBlogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Add blog' ref={blogFormRef}>
          <BlogForm
            createBlog = {addBlog}
          />
        </Togglable>
      </div>
    )
  }

  const shBlogs = () => {
    return (
      <ShowBlogs
        blogs={blogs}
        OnClick={handleLikeButton}
        user={currentUser}
        handleRemove={handleRemove}
      />
    )
  }

  return (
    <div>
      <h1>Blog list</h1>
      <Notification message={Message} type={type}/>
      {!user && showLoginForm()}
      <div>
        {user &&
          <div>
            {user.username} logged in
            <LogOutButton onClick={handleLogout}/>
            {showBlogForm()}
          </div>
        }
        <br/>
        {shBlogs()}
      </div>

    </div>
  )
}

export default App



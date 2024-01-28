import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import apiBlogs from './services/apiBlogs'
import loginService from './services/login'
import apiUsers from './services/apiUsers'

import ShowBlogs from './components/ShowBlogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogOutButton from './components/LogOutButton'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs,setBlogs] = useState([])

  //Login
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
 
  //Notification
  const [Message, setMessage] = useState(null)
  const [type, setType] = useState(true)

  //Refresher
  const [count, setCount] = useState(0)

  const hook = async () => {
    try {
      const initialBlogs = await apiBlogs.getAll()
      setBlogs(initialBlogs)
      console.log(blogs.length,"blogs were loaded")
    } catch (error) {
      console.error(error)
    }
  };

  const fetchUsers = async () => {
    try {
      const userList = await apiUsers.getAll()
      setUsers(userList)
      console.log(userList)
      const foundUser = userList.find(u => u.username === user.username)
      setCurrentUser(foundUser)
      console.log(foundUser)
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    if (user) {
      fetchUsers()
    }
  }, [user])
  
  useEffect(() => {
     hook()
  }, [])

  useEffect(() => {
    hook()
  }, [count])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      apiBlogs.setToken(user.token)
    } 
  }, [])
  
  const blogFormRef = useRef()
  const addBlog = async (newBlog) => {
    try {
      await apiBlogs.create(newBlog)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()

      setCount(count + 1)
      setType(true)
      setMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )       
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLikeButton = async (blog, action) => {
    console.log(user)
    console.log('likedBy',blog.likedBy)
    const updatedBlog = {...blog, action}

    try {
      await apiBlogs.update(blog.id, updatedBlog)
      console.log(action? 'liked':'unliked')
      setBlogs(blogs.map(
        b => b.id === updatedBlog.id
          ? updatedBlog
          : b
      ))
      setCount(count + 1)
    } catch (error){
      console.error(error)
    }
  }

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
        `Successfully logged in`
      )       
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      console.log('error in handle login')

      setType(false)
      setMessage(
        `Wrong username or password`
      )       
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setCurrentUser(null)
    setUsers([])
  }
  
 
  //Show Components
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
        <ShowBlogs
            blogs={blogs}
            OnClick={handleLikeButton}
            user={currentUser}
        />
      </div>
      
    </div>
  )
}

export default App;



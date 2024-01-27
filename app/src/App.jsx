import { useState, useEffect } from 'react'
import apiBlogs from './services/apiBlogs'
import loginService from './services/login'

import ShowBlogs from './components/ShowBlogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogOutButton from './components/LogOutButton'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs,setBlogs] = useState([])

  //New Blog Form
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)

  //Login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [login, setLogin] = useState(false)

  //Notification
  const [Message, setMessage] = useState(null)
  const [type, setType] = useState(true)

  const hook = async () => {
    try {
      const initialBlogs = await apiBlogs.getAll()
      setBlogs(initialBlogs)
      console.log(blogs.length,"blogs were loaded")
    } catch (error) {
      console.error(error)
    }
  };
  
  
  useEffect(() => {
    if (user){
      hook()
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      apiBlogs.setToken(user.token)
    } 
  }, [])
  
  

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor || 'Unknown',
      url: newUrl || 'Not found',
      likes: Number(newLikes) || 0,
    }
    try {
      await apiBlogs.create(newBlog)
      setBlogs(blogs.concat(newBlog))

      setType(true)
      setMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )       
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setNewAuthor('')
      setNewLikes(0)
      setNewTitle('')
      setNewUrl('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleLikeButton = (blog) =>{
    console.log('liked')
    const updatedBlog = {...blog, likes:blog.likes +1}
    //console.log('updated blog', updatedBlog)
    setBlogs(blogs.map(
      b => b.title === updatedBlog.title
        ? updatedBlog
        : b
    ))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)      ) 
      apiBlogs.setToken(user.token)
      setUser(user)
      
      setType(true)
      setMessage(
        `Successfully logged in`
      )       
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setUsername('')
      setPassword('')
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
  }
  
  //OnChanges
  const handleNewTitle = (event) => {
    //console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    //console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    //console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleNewLikes = (event) => {
    //console.log(event.target.value)
    setNewLikes(event.target.value)
  }

  //Show Components
  const showLoginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Log in'>
          <LoginForm
              onSubmit = {handleLogin}
              username = {username}
              onChangeUsername = {
                (event) => setUsername(event.target.value)
              }
              password = {password}
              onChangePassword = {
                (event) => setPassword(event.target.value)
              }
            />
        </Togglable>
      </div>
    )
  }

  const showBlogForm = () => {
    return (
      <div>
        <BlogForm
          onSubmit = {addBlog}
          onChangeTitle = {handleNewTitle}
          onChangeAuthor = {handleNewAuthor}
          onChangeUrl = {handleNewUrl}
          onChangeLikes = {handleNewLikes}
          title = {newTitle}
          author = {newAuthor}
          url = {newUrl}
          likes = {newLikes}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Blog list</h1>
      <Notification message={Message} type={type}/>
      {!user && showLoginForm()}
      {user &&
        <div>
          <p>
            {user.username} logged in
            <LogOutButton onClick={handleLogout}/>
          </p>
          <ShowBlogs blogs={blogs} OnClick={handleLikeButton}/>
          {showBlogForm()}
        </div>
      }
    </div>
  )
}

export default App;



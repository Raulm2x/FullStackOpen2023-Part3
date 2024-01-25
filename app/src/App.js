import { useState, useEffect } from 'react'
import apiBlogs from './services/apiBlogs'
import loginService from './services/login'

import ShowBlogs from './components/ShowBlogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs,setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)

  //const [loggedIn, setLoggedIn] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 

  const hook = async () => {
    try {
      const initialBlogs = await apiBlogs.getAll()
      setBlogs(initialBlogs)
      console.log("blogs were loaded")
    } catch (error) {
      console.error(error)
    }
  };
  
  
  useEffect(() => {
    hook()
  }, [user])
  
  

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
      apiBlogs.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error in handle login')
      /*
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)*/
    }
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

  return (
    <div>
      <h1>Blog list</h1>
      {!user
        ?<div>
          <h2>Login</h2>
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
        </div>
        :<div>
          <h3>Welcome {user.username}!</h3>
          <ShowBlogs blogs={blogs} OnClick={handleLikeButton}/>
          <h2>Add a new blog</h2>
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
      }
    </div>
  )
}

export default App;

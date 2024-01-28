import { useState } from "react"

const BlogForm = ({createBlog}) =>{
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newLikes, setNewLikes] = useState(0)

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

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: newTitle,
            author: newAuthor || 'Unknown',
            url: newUrl || 'Not found',
            likes: Number(newLikes) || 0,
        }
        createBlog(newBlog)
        setNewAuthor('')
        setNewLikes(0)
        setNewTitle('')
        setNewUrl('')
    }

    
    return (
        <div>
            <h2>Add a new blog</h2>
            <form onSubmit={addBlog}>
                <label htmlFor="inputTitle">Title: </label>
                <input id="inputTitle" value={newTitle} onChange={handleNewTitle} /><br/>
                
                <label htmlFor="inputAuthor">Author: </label>
                <input id="inputAuthor" value={newAuthor} onChange={handleNewAuthor} /><br/>

                <label htmlFor="inputUrl">Url: </label>
                <input id="inputUrl" value={newUrl} onChange={handleNewUrl} /><br/>

                <label htmlFor="inputLikes">Likes: </label>
                <input id="inputLikes" value={newLikes} onChange={handleNewLikes} /><br/>

                <button type="submit">Save</button>
            </form>
        </div>
    ) 
}

export default BlogForm
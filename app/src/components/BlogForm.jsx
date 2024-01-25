const BlogForm = (props) =>{
    const {
        onSubmit,
        onChangeTitle, onChangeAuthor, onChangeUrl, onChangeLikes,
        title, author, url, likes
    } = props
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="inputTitle">Title: </label>
                <input id="inputTitle" value={title} onChange={onChangeTitle} /><br/>
                
                <label htmlFor="inputAuthor">Author: </label>
                <input id="inputAuthor" value={author} onChange={onChangeAuthor} /><br/>

                <label htmlFor="inputUrl">Url: </label>
                <input id="inputUrl" value={url} onChange={onChangeUrl} /><br/>

                <label htmlFor="inputLikes">Likes: </label>
                <input id="inputLikes" value={likes} onChange={onChangeLikes} /><br/>

                <button type="submit">Save</button>
            </form>
        </div>
    ) 
}

export default BlogForm
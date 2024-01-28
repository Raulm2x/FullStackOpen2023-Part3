import { useState } from "react"
import LikeButton from "./LikeButton"

const BlogDetails = ({blog, OnClick, user}) => {
    const [visible, setVisible] = useState(true)

    const button = () => {
        return (
            <button onClick={() => setVisible(!visible)}>
                {visible? 'hide':'view'}
            </button>
        )
    }

    let likedBlog
    if (user){
        likedBlog = blog.likedBy
        ? blog.likedBy.some(u => u === user.id)
        : false
    }
    
    return (
        <li>
            <h3>{blog.title} {button()}</h3>
            {visible &&
            <div>
                
                Author: {blog.author}<br/>
                Url: <a href={blog.url} target="_blank">{blog.url}</a><br/>
                Likes: {blog.likes}<br/>
                {(blog.user && user) &&
                    <div>
                    Posted by: {blog.user.name || blog.user.username} 
                    </div>
                }
                {user && <LikeButton OnClick={OnClick} blog={blog} liked={likedBlog}/>}
            </div>
            }
        </li>
    )
}

export default BlogDetails
import { useState } from "react"
import LikeButton from "./LikeButton"

const BlogDetails = ({blog, OnClick, loggedIn}) => {
    const [visible, setVisible] = useState(true)

    const button = () => {
        return (
            <button onClick={() => setVisible(!visible)}>
                {visible? 'hide':'view'}
            </button>
        )
    }

    return (
        <li>
            <h3>{blog.title} {button()}</h3>
            {visible &&
            <div>
                
                Author: {blog.author}<br/>
                Url: <a href={blog.url} target="_blank">{blog.url}</a><br/>
                Likes: {blog.likes}<br/>
                {(blog.user && loggedIn) &&
                    <div>
                    Posted by: {blog.user.name || blog.user.username}
                    </div>
                }
                <LikeButton OnClick={OnClick} blog={blog}/> 
            </div>
            }
        </li>
    )
}

export default BlogDetails
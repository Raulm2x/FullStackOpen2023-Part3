import { useState } from "react"
import LikeButton from "./LikeButton"
import RemoveButton from "./RemoveButton"

const BlogDetails = ({blog, OnClick, user, handleRemove}) => {
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

    const ownedBlog = user? user.blogs.find(b => b.id === blog.id): false

    return (
        <li>
            <h3>{blog.title} {button()}</h3>
            {visible &&
            <div>
                
                Author: {blog.author}<br/>
                Url: <a href={blog.url} target="_blank">{blog.url}</a><br/>
                Likes: {blog.likes}
                {user && <LikeButton OnClick={OnClick} blog={blog} liked={likedBlog}/>}
                <br/>
                {(blog.user && user) &&
                    <div>
                    Posted by: {blog.user.name || blog.user.username} 
                    </div>
                }
                {ownedBlog && <RemoveButton handleRemove={handleRemove} blog={blog}/>}
            </div>
            }
        </li>
    )
}

export default BlogDetails
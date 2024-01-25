import LikeButton from "./LikeButton"

const ShowBlogs = ({blogs, OnClick}) => {
    return (
        <div>
            <ul>
                {blogs.map((blog, index) => (
                    <li key={index}>
                        <h3>{blog.title}</h3>
                        <LikeButton OnClick={OnClick} blog={blog}/>
                        <p>
                            Author: {blog.author}<br/>
                            Url: <a href={blog.url} target="_blank">{blog.url}</a><br/>
                            Likes: {blog.likes}
                        </p> 
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShowBlogs
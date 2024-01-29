import BlogDetails from "./BlogDetails"

const ShowBlogs = ({blogs, OnClick, user, handleRemove}) => {
    return (
        <div>
            <ul>
                {blogs.map((blog, index) => (
                    <BlogDetails
                        key={index}
                        blog={blog}
                        OnClick={OnClick}
                        user = {user}
                        handleRemove={handleRemove}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ShowBlogs
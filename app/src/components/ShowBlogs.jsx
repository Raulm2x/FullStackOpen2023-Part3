import BlogDetails from "./BlogDetails"

const ShowBlogs = ({blogs, OnClick, user}) => {
    return (
        <div>
            <ul>
                {blogs.map((blog, index) => (
                    <BlogDetails
                        key={index}
                        blog={blog}
                        OnClick={OnClick}
                        user = {user}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ShowBlogs
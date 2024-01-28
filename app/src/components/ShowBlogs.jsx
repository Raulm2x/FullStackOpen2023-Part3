import BlogDetails from "./BlogDetails"

const ShowBlogs = ({blogs, OnClick, loggedIn}) => {
    return (
        <div>
            <ul>
                {blogs.map((blog, index) => (
                    <BlogDetails
                        key={index}
                        blog={blog}
                        OnClick={OnClick}
                        loggedIn = {loggedIn}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ShowBlogs
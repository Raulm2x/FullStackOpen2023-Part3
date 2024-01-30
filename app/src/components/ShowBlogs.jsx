import BlogDetails from './BlogDetails'
import PropTypes from 'prop-types'

const ShowBlogs = ({ blogs, OnClick, user, handleRemove }) => {
  return (
    <div>
      <ul>
        {blogs.map((blog, index) => (
          <BlogDetails
            key={index}
            blog={blog}
            OnClick={OnClick}
            user={user}
            handleRemove={handleRemove}
          />
        ))}
      </ul>
    </div>
  )
}

ShowBlogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  OnClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default ShowBlogs

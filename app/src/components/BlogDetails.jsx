import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import LikeButton from './LikeButton'
import RemoveButton from './RemoveButton'

const BlogDetails = ({ blog, OnClick, user, handleRemove }) => {
  const [visible, setVisible] = useState(false)
  const [likedBlog, setLikedBlog] = useState(false)

  const button = () => {
    return (
      <button onClick={() => setVisible(!visible)}>
        {visible? 'hide':'view'}
      </button>
    )
  }

  useEffect(() => {
    if (user) {
      /*
      console.log(`${blog.title} liked by ${user.username}:`,
        blog.likedBy.some(u => u.toString() === user.id.toString()))
      */
      setLikedBlog(blog.likedBy
        ? blog.likedBy.some(u => u.toString() === user.id.toString())
        : false
      )
    }
  }, [user, blog.likedBy])

  const ownedBlog = user? user.blogs.find(b => b.id === blog.id): false

  return (
    <li className='blog'>
      <h3>{blog.title} {button()}</h3>
      Author: {blog.author}<br/>
      {visible &&
        <div className='moreDetails'>
          Url: <a href={blog.url} target="_blank" rel='noreferrer'>{blog.url}</a><br/>
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

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  OnClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default BlogDetails
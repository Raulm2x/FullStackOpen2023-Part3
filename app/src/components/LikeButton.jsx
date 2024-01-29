import { useState } from 'react'

const LikeButton = (props) => {
  const { blog, OnClick, liked } = props
  const [likedStatus, setLikedStatus] = useState(liked)

  const changeButton = () => {
    setLikedStatus(!likedStatus)
    console.log(likedStatus)
  }

  let text = likedStatus ? 'Dislike' : 'Like'
  return <button onClick={() => OnClick(blog, !likedStatus)}>{text}</button>
}

export default LikeButton

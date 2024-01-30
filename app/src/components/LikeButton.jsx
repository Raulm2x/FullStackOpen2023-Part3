const LikeButton = (props) => {
  const { blog, OnClick, liked } = props

  let text = liked ? 'Dislike' : 'Like'
  return <button onClick={() => OnClick(blog, !liked)}>{text}</button>
}

export default LikeButton

const LikeButton = ({blog, OnClick}) => {
    return (
        <button onClick={()=> OnClick(blog)}>
            Like
        </button>
    )
}

export default LikeButton
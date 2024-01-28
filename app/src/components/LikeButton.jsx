const LikeButton = ({blog, OnClick, liked}) => {
    const text = liked? 'Dislike':'Like'
    return (
        <button onClick={()=> OnClick(blog, !liked)}>
            {text}
        </button>
    )
}

export default LikeButton
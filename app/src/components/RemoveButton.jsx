const RemoveButton = ({ handleRemove, blog }) => (
  <button onClick={() => handleRemove(blog)}>
        remove
  </button>
)

export default RemoveButton
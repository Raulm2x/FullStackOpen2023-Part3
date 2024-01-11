const Notification = ({ message, type }) => {

  const show = type? 'rgb(134, 205, 72)': ' #e03333'

  const estilo = {
    color : show,
  }



  if (message === null) {
    return null
  }

  return (
    <div className='confirmation' style={estilo}>
      {message}
    </div>
  )
}

export default Notification
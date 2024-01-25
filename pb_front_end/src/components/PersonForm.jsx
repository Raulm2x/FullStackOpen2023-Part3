const PersonForm = (props) => {
    const onSubmit = props.onSubmit
    const name = props.name
    const onChangeName = props.onChangeName
    const number = props.number
    const onChangeNumber = props.onChangeNumber

    return (
    <form onSubmit={onSubmit} className="miFormulario">
      <div className="campo">
        <label htmlFor="inputName">Name:</label>
        <input value={name} onChange={onChangeName} id="inputName" />
      </div>
      <div className="campo">
        <label htmlFor="inputNumber">Number:</label>
        <input value={number} onChange={onChangeNumber} id="inputNumber" />
      </div>
      <div>
        <button type="submit" className="formButton">Add</button>
      </div>
    </form>
    )
}

export default PersonForm
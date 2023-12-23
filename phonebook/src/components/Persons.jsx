const Persons = ({person, onClick}) => (
    <li>{person.name}  
        <button onClick={onClick} className="deleteButton">delete</button> <br/>
        {person.number}
    </li>
)

export default Persons
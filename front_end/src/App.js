import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import services from './services'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [query, setQuery] = useState('')
  const [confMessage, setConfMessage] = useState(null)
  const [type, setType] = useState(true)

  const hook = () => {
    console.log("effect")
    services
    .getAll()
    .then(response =>{
      console.log('promise fulfilled') 
      setPersons(response)
    })
  }

  useEffect(hook,[])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const personExists = persons.some(person => person.name === newPerson.name)

    if (personExists) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newPerson.name)
        const id = person.id
        services
        .update(id, newPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== id? person : response ))
          alert(`${newPerson.name}'s number was updated`)
          setNewNumber('')
        })
      }    
    }
    else {
      services
      .create(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
      })
      setNewNumber('')
      setType(true)
      setConfMessage(
        `Added ${newPerson.name}`
      )       
      setTimeout(() => {
        setConfMessage(null)
      }, 5000)
    }
    setNewName('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleQuery = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
    setShowAll(query ? false : true)
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      services
      .erase(id)
      .then(response => {
        setType(true)
        setConfMessage(`${person.name} was removed from the server successfully`)
        hook()
      })
      .catch(error => {
        setType(false)
        setConfMessage(`${person.name} has already been removed from the server`)
        setPersons(persons.filter(p => p.id !== id))
      } )
    }
    setTimeout(() => {
      setConfMessage(null)
    }, 5000)    
    
  }

  const personsToShow = showAll
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="app">
      <h2>Los Santos Phonebook</h2>
      <Notification message={confMessage} type={type}/>
      <Filter value={query} onChange={handleQuery}  /> 
      <h3>add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        name={newName}
        onChangeName = {handleNewName}
        number = {newNumber}
        onChangeNumber = {handleNewNumber}
      />
      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(person => (
          <Persons 
          key={person.id} 
          person={person}
          onClick={() => deletePerson(person.id)}
          />))}
      </ul>
    </div>
  )
}

export default App

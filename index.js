const express = require("express")
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
app.use(morgan('tiny'))

app.use(express.static('build'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
    console.log(persons.length, "persons were loaded.")
})

const date = new Date().toDateString()
const time = new Date().toTimeString()

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date} ${time}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    console.log(person)

    if (!person) {
        response.status(404).json({
            error:`person with id ${id} does not exist.`
        })
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id != id)

    response.status(204).end()
})

const generateId = () => {
    let id

    while (true) {
        id = Math.floor(Math.random()*(100000))
        if (!persons.some(person => person.id === id)) {
            break
        }
    }

    return id
}

app.post('/api/persons', (request, response) => {
   const id = generateId()

    if (!request.body || !request.body.number || !request.body.name ) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    checkPerson = persons.some(p => p.name === request.body.name)

    if (checkPerson) {
        return response.status(400).json({
            error: `name must be unique`
        })
    }


   const person = {
        "name": request.body.name,
        "number": request.body.number,
        "id": id,
   }

   persons = persons.concat(person)

   response.json(person)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
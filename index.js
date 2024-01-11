const express = require("express")
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
app.use(morgan('tiny'))

app.use(express.static('build'))


require('dotenv').config()
const Person = require('./models/person')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

/*
const url =
  `mongodb+srv://raulm2x:${password}@cluster0.ga6npuf.mongodb.net/phonebook?retryWrites=true&w=majority`
*/

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        console.log(persons.length, "persons were loaded")
        response.json(persons)
      })
})

const date = new Date().toDateString()
const time = new Date().toTimeString()

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(
            `<p>Phonebook has info for ${persons.length} people</p>
            <p>${date} ${time}</p>`
        )
      })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    
    Person.findById(id)
    .then(person => {
        response.json(person)
    })
    .catch( error => {
        console.error("Hubo un error", error)
        response.status(404).json({
            error:`person with id ${id} does not exist.`
        })
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(person => {
        response.status(204).end()
    })
})

/*
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
*/

app.post('/api/persons', (request, response) => {
   //const id = generateId()

    if (!request.body || !request.body.number || !request.body.name ) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    /*
    checkPerson = persons.some(p => p.name === request.body.name)

    if (checkPerson) {
        return response.status(400).json({
            error: `name must be unique`
        })
    }
    */

   const person = new Person({
        "name": request.body.name,
        "number": request.body.number,
   })

   person.save().then(savedPerson => {
    response.json(savedPerson)
   })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
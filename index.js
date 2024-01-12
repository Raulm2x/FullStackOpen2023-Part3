const express = require("express")
const app = express()
app.use(express.static('build'))
app.use(express.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
app.use(morgan('tiny'))




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

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        console.log(persons.length, "persons were loaded")
        response.json(persons)
      }).catch(error => next(error))
})

const date = new Date().toDateString()
const time = new Date().toTimeString()

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
        response.send(
            `<p>Phonebook has info for ${persons.length} people</p>
            <p>${date} ${time}</p>`
        )
      }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    console.log(id)
    
    Person.findById(id)
    .then(person => {
        if (person) {
            response.json(person)
        }
        else {
            response.status(404).json({
                error:`person with id ${id} does not exist.`
            }).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(person => {
        response.status(204).end()
    })
    .catch( error => next(error))
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

app.post('/api/persons', (request, response, next) => {
   //const id = generateId()

    if (!request.body || !request.body.number || !request.body.name ) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    const person = new Person({
        "name": request.body.name,
        "number": request.body.number,
   })

   person.save().then(savedPerson => {
    response.json(savedPerson)
   })
   .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const newData = {
        name: body.name,
        number: body.number,
      }
   
    Person.findByIdAndUpdate(request.params.id, newData, { new: true })
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
  })

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
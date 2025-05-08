require('dotenv').config();

const express = require('express')
const cors = require('cors')
const Person = require('./models/persons');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const morgan = require('morgan')
app.use(morgan((tokens, req, res) => {
  const bodyString = req.body
    ? JSON.stringify({ name: req.body.name, number: req.body.number })
    : "";

  const logParts = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    bodyString
  ]

  return logParts.filter(part => part != "").join(' ');
}))

function requestTime(req, res, next) {
    req.receivedAt = new Date();
    next();
}
app.use(requestTime);

app.get('/api/persons', (req, res) => {
  Person.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(note => {
    res.json(note)
  })
})

app.get('/info', (req, res) => {
  const formattedTime = req.receivedAt.toString();
  res.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${formattedTime}</div>
  `);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
});

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const generateId = () => {
  return String(Math.floor(Math.random() * 1000));
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


function requestTime(req, res, next) {
    req.receivedAt = new Date();
    next();
}
app.use(requestTime);

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
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

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({error: 'name or number missing'})
  }

  const existingPerson = persons.find(person => person.name === body.name);

  if (existingPerson) {
    return res.status(400).json({error: `'${existingPerson.name}' is already in the phonebook`})
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
    res.json(person)
  }
});

const generateId = () => {
  return String(Math.floor(Math.random() * 1000));
}

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
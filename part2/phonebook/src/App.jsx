import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from'./services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName);
    const nameExists = Boolean(existingPerson);

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (nameExists) {
      personObject.id = existingPerson.id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(personObject.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === personObject.id ? returnedPerson : person));
            console.log(`Successfully updated person with id ${personObject.id} and updated state.`);
          })
       }
    } else {
      personObject.id = String(persons.length + 1)
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          console.log(`Successfully created person with id ${personObject.id} and updated state.`);
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const personToDelete = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          console.log(`Successfully deleted person with id ${id} and updated state.`);
        })
        .catch(error => {
          console.error(`Failed to delete person with id ${id} on server:`, error);
        })
    } 
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}/>
      <h3>Add New</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        onDeleteClick={deletePerson}
      />
    </div>
  )
}

export default App
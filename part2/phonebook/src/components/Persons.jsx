const Persons = ({ personsToShow, onDeleteClick }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </ul>
  )
}

const Person = ({ person, onDeleteClick }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => onDeleteClick(person.id)}>
        delete
      </button>
    </li>
  )
}

export default Persons
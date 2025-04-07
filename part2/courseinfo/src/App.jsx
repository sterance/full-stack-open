const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part}/>
      )}
      <Total total={total}/>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}

const Total = ({ total }) => {
  return (
    <div><b>total of {total} excercises</b></div>
  )
}

export default App
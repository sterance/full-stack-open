const Course = ({ course }) => (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  );
  
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
  
  const Part = ({ part }) => (
    <div>
      {part.name} {part.exercises}
    </div>
  );
  
  const Total = ({ total }) => (
    <div>
      <strong>Total of {total} exercises</strong>
    </div>
  );

export default Course
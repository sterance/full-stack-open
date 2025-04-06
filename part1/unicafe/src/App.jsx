import { useState } from 'react'

const Heading = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }
  const incrementNeutral= () => {
    setNeutral(neutral + 1)
  }
  const incrementBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Heading text='give feedback'/>
      <Button onClick={incrementGood} text='good'/>
      <Button onClick={incrementNeutral} text='neutral'/>
      <Button onClick={incrementBad} text='bad'/>
      <Heading text='statistics'/>
      <Statistics text='good' value={good}/>
      <Statistics text='neutral' value={neutral}/>
      <Statistics text='bad' value={bad}/>
    </div>
  )
}

export default App
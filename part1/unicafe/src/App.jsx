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

const Statistics = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
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

  const total = good + neutral + bad

  const average = total === 0 ? 0 : (good * 1 + bad * -1) / total

  const percentPositive = total === 0 ? 0 : good / total

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
      <Statistics text='all' value={total}/>
      <Statistics text='average' value={average}/>
      <Statistics text='positive' value={percentPositive + ' %'}/>
    </div>
  )
}

export default App
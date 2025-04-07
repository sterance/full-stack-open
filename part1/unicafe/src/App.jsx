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

const Statistics = ({ values }) => {
  if (values.total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={values.good}/>
        <StatisticLine text='neutral' value={values.neutral}/>
        <StatisticLine text='bad' value={values.bad}/>
        <StatisticLine text='all' value={values.total}/>
        <StatisticLine text='average' value={values.average.toFixed(2)}/>
        <StatisticLine text='positive' value={values.percentPositive.toFixed(1) + ' %'}/>
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
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
  const average = (good * 1 + bad * -1) / total
  const percentPositive = (good / total) * 100

  return (
    <div>
      <Heading text='give feedback'/>
      <Button onClick={incrementGood} text='good'/>
      <Button onClick={incrementNeutral} text='neutral'/>
      <Button onClick={incrementBad} text='bad'/>
      <Heading text='statistics'/>
      <Statistics values={{ good, neutral, bad, total, average, percentPositive }}/>
    </div>
  )
}

export default App
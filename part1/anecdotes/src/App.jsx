import { useState } from 'react';

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
);

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0);

  const initialVotes = Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(initialVotes);

  const getRandom = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * anecdotes.length);
    } while (newIndex === selected);
    setSelected(newIndex);
  }

  const incrementVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }


  let winner = -1;
  const maxValue = Math.max(...votes);
  winner = votes.indexOf(maxValue);


  return (
    <div>
      <Heading text='Anecdote of the day'/>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={incrementVote} text='vote'/>
      <Button onClick={getRandom} text='next anecdote'/>
      <Heading text='Anecdote with the most votes'/>
      <Anecdote text={anecdotes[winner]} votes={votes[winner]}/>
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Information from './components/Information'
import SearchResults from './components/SearchResults'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    {console.log(countriesToShow)}
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}/>
      <SearchResults countriesToShow={countriesToShow} />
      <Information />
    </div>
  )
}

export default App
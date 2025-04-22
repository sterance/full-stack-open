import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Information from './components/Information'
import SearchResults from './components/SearchResults'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailsCountries, setDetailsCountries] = useState([]);

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const countriesForSearchResults = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleDetailsVisibility = (countryToToggle) => {
    const isSelected = detailsCountries.some(c => c.cca3 === countryToToggle.cca3);

    if (isSelected) {
      setDetailsCountries(
        detailsCountries.filter(c => c.cca3 !== countryToToggle.cca3)
      );
    } else {
      setDetailsCountries([...detailsCountries, countryToToggle]);
    }
  };

  const countriesForInformation = countriesForSearchResults.length === 1
    ? countriesForSearchResults
    : detailsCountries;

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}/>
      <SearchResults
        countriesToShow={countriesForSearchResults}
        selectedCountries={detailsCountries}
        onShowToggle={handleToggleDetailsVisibility}
      />
      <Information countriesToDisplay={countriesForInformation} />
    </div>
  )
}

export default App
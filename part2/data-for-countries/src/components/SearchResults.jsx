const SearchResults = ({ countriesToShow, selectedCountries, onShowToggle }) => {
    if (countriesToShow.length < 1) {
        return (
            <div>No matches found!</div>
        )
    }

    if (countriesToShow.length === 1) {
        return null
    }

    if (countriesToShow.length > 11) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    return (
        <div>
          {countriesToShow.map((country) => {const isSelected = selectedCountries.some(c => c.cca3 === country.cca3);
          
            return (
              <div key={country.cca3}>
                {country.name.common}{' '}
                <button onClick={() => onShowToggle(country)}>
                  {isSelected ? 'hide' : 'show'}
                </button>
              </div>
            );
          })}
        </div>
      );
}

export default SearchResults
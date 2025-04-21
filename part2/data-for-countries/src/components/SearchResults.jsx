const SearchResults = ({countriesToShow}) => {
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
            {countriesToShow.map((country) => (
                <div key={country.cca3}>{country.name.common}</div>
            ))}
        </div>
    )
}

export default SearchResults
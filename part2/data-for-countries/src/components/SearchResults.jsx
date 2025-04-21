const SearchResults = ({countriesToShow}) => {
    return (
        <div>
            {countriesToShow.map((country) => (
                <div key={country.cca3}>{country.name.common}</div>
            ))}
        </div>
    )
}

export default SearchResults
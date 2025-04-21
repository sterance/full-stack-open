const Information = ({ countriesToShow }) => {
    if (countriesToShow.length != 1) {
        return null
    }
    const country = countriesToShow[0]
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area} km²</div>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(languageName => (
                    <li key={languageName}>{languageName}</li>
                ))}
            </ul>
            <img src={country.flags.svg} alt={`The flag of ${country.name.official}`}/>
        </div>
    )
}

export default Information
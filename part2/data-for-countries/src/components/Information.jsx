import CountryDetails from './CountryDetails'

const Information = ({ countriesToDisplay }) => {
    if (!countriesToDisplay || countriesToDisplay.length === 0) {
        return null;
    }

    return (
        <div>
            {countriesToDisplay.map(country => (
                <CountryDetails key={country.cca3} country={country} />
            ))}
        </div>
    );
};

export default Information
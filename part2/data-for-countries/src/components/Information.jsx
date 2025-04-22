import CountryDetails from './CountryDetails'

const Information = ({ countriesToShow }) => {
    if (countriesToShow.length === 1) {
        const country = countriesToShow[0];
        return <CountryDetails country={country} />;
    }
    return null;
};

export default Information
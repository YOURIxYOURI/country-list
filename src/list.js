import React, { useState, useEffect } from 'react';

const CountryList = () => {
  let [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setCountries(data);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  countries = countries.sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1;
    } else if (a.name.common > b.name.common) {
      return 1;
    } else {
      return 0;
    }
  });
  let filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div id="search">
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by country name"/>
    </div>
    <table>
        <thead>
          <th>FLAG</th>
          <th>NAME</th>
          <th>CAPITAL</th>
          <th>REGION</th>
          <th>POPULATION</th>
          <th>CURRENCY</th>
          <th>LANGUAGES</th>
          <th>TIMEZONES</th>
        </thead>
        <tbody>
            {filteredCountries.sort().map(country => (
                <tr>
                <td><img src={country.flags.svg} alt={country.name.common} width="50" height="30" /></td>
                <td><h2>{country.name.common}</h2></td> 
                <td>{country.capital}</td>
                <td>{country.region}</td>
                <td>{country.population} people</td>
                {country.currencies && (
                    <td>{Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</td>
                )}
                {country.languages && (
                    <td>{Object.values(country.languages).map(lang => lang).join(', ')}</td>
                )}
                <td>{country.timezones.map(zone => zone).join(', ')}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default CountryList;
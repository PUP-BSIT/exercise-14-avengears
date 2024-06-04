async function searchCountry() {
    const countryInput = document.getElementById('countryInput').value;
    try {
        const res = await fetch(
            `https://restcountries.com/v3.1/name/${countryInput}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        if (data && data.length) {
            const country = data[0];
            const details = document.getElementById('countryDetails');
            details.innerHTML = `<h2>${country.name.common}</h2>
                                 <p>Region: ${country.region}</p>
                                 <p>Capital: ${country.capital ? 
                                    country.capital.join(', ') : 'N/A'}</p>
                                 <p>Population: ${country.population}</p>
                                 <p>Area: ${country.area} sq km</p>
                                 <p>Language: ${country.languages ? 
                                    Object.values(country.languages).join(', ')
                                        : 'N/A'}</p>`;

            const regionRes = await fetch(
                `https://restcountries.com/v3.1/region/${country.region}`);
            if (!regionRes.ok) {
                throw new Error('Network response was not ok');
            }
            const regionData = await regionRes.json();

            const region = document.getElementById('countriesInRegion');
            region.innerHTML = '<h2>Other Countries in the Same Region</h2>';
            regionData.forEach(function(c) {
                if (c && c.name && c.name.common !== country.name.common) {
                    region.innerHTML += `<p>${c.name.common}</p>`;
                }
            });
        } else {
            alert('Country not found. Please enter a valid country name.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again later.');
    }
}
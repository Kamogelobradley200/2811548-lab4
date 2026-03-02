
const countryInput = document.getElementById("country-input");

document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

async function searchCountry(countryName) {
    
    try {
        const loader = document.getElementById("loading-spinner");
        loader.style.display = "block";

        document.getElementById('error-message').innerHTML = `
            <p></p>`;
        document.getElementById('country-info').innerHTML = ``;
        
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    
        if (!response.ok){
            throw Error ("Couldn't get country data!")
        }

        console.log(response);

        const data = await response.json();
        // console.log(data);
        const country = data[0]; 

        document.querySelector(".country-card").style.backgroundColor = "aliceblue";

        document.getElementById('country-info').innerHTML = `
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <img src="${country.flags.png}" alt="${country.name.common} flag">
`;

        loader.style.display = 'none';
    } 
    catch (error) {
        document.querySelector(".country-card").style.backgroundColor = "";
        document.getElementById('error-message').innerHTML = `
            <p> ${error} </P>`
        document.getElementById("loading-spinner").style.display = "none";
    }
}


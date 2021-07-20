let searchEl = document.getElementById("searchInput");
let containerEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");
let url = "https://restcountries.eu/rest/v2/all?fields=name;population;flag";
let searchInputVal = "";

let options = {
    method: "GET"
}

function createAndAppendCountry(country) {

    let colContainer = document.createElement("div");
    colContainer.classList.add("col-12", "col-md-6");

    let countryContainer = document.createElement("div");
    countryContainer.classList.add("country-card", "d-flex", "flex-row", "justify-content-start");

    let imageEl = document.createElement("img");
    imageEl.src = country.flag;
    imageEl.classList.add("country-flag");
    countryContainer.appendChild(imageEl);

    let textContainer = document.createElement("div");
    textContainer.classList.add("ml-2");
    countryContainer.appendChild(textContainer);

    let nameEl = document.createElement("h1");
    nameEl.textContent = country.name;
    nameEl.classList.add("country-name");
    textContainer.appendChild(nameEl);

    let populationEl = document.createElement("p");
    populationEl.textContent = country.population;
    populationEl.classList.add("country-population");
    textContainer.appendChild(populationEl);

    colContainer.appendChild(countryContainer);
    containerEl.appendChild(colContainer);
}

function displayCountries(countries) {
    containerEl.textContent = "";
    spinnerEl.classList.toggle("d-none");
    for (let country of countries) {
        let countryName = country.name;
        searchInputVal=searchInputVal.toLowerCase();
        countryName = countryName.toLowerCase();
        if (countryName.includes(searchInputVal)) {
            createAndAppendCountry(country);
        }
    }
}

function getDataFromServer() {
    spinnerEl.classList.toggle("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            displayCountries(jsonData);
        });
}

function searchCountries(event) {
    searchInputVal = event.target.value;
    getDataFromServer();
}

searchEl.addEventListener('keydown', searchCountries);
getDataFromServer();
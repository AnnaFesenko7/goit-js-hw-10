import './css/styles.css';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce'


import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 500;


const refs = {
    searchedConuntry: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.searchedConuntry.addEventListener('input', debounce(onSearchedConuntryInput, DEBOUNCE_DELAY))


function onSearchedConuntryInput(e) {
    const nameCountry = (e.target.value).trim()
    fetchCountries(nameCountry)
        .then(renderMarkup)
        .catch(onFetchError)
        
       
   }

function renderMarkup(arrey) {
    console.log(typeof arrey.length)
    if (arrey.length === 1) {
        renderCountryCard(arrey[0])
       
    } else if (arrey.length > 10) {
        onFetchTooMany()
    } else {
        renderCountryList(arrey)
    }
}

function renderCountryCard({flags, name, capital, population, languages}) {
    refs.countryList.innerHTML=''
    refs.countryInfo.innerHTML =
        `<img src="${flags.svg}" alt="country flag" class="flag-img">
        <h1>${name.official}</h1>
        <p> <b>Capital:</b> ${capital}</p>
        <p> <b>Population:</b> ${population}</p>
        <p> <b>Lenguages:</b> ${Object.values(languages)}</p>`

}


function renderCountryList(countries) {
    refs.countryInfo.innerHTML=""
const markup = countries
  .map((country) => `<li>
    <img src="${country.flags.png}" alt="country flag" class="flag-img">
    <p class="country-list">${country.name.official}</p>
    </li>`)
  .join("");

// refs.countryList.insertAdjacentHTML("beforeend", markup);
    refs.countryList.innerHTML = markup;
}

function onFetchError() {
   refs.countryList.innerHTML=''
    refs.countryInfo.innerHTML =''
     Notiflix.Notify.failure("Oops, there is no country with that name");
}
    
function onFetchTooMany() {
    refs.countryList.innerHTML=''
    refs.countryInfo.innerHTML =''
     Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}

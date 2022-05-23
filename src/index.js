import "./css/styles.css";
import countriesTpl from "./partials/countries.hbs";
import countriesListTpl from "./partials/countriesList.hbs";
import { SearchCountriesApiService } from "./js/fetchCountries";
import Notiflix from "notiflix";

const debounce = require("lodash.debounce");
const DEBOUNCE_DELAY = 300;

const countriesApiService = new SearchCountriesApiService();
const countryInfoEl = document.querySelector(".country-info");
const countriesListEl = document.querySelector(".country-list");
const inputSearch = document.querySelector("#search-box");

inputSearch.addEventListener("input", debounce(onSearchCountries, DEBOUNCE_DELAY));

function onSearchCountries(e) {
	e.preventDefault();

	if (inputSearch.value.trim() === "") {
		clearCountriesContainers();
		return;
	}

	countriesApiService.query = e.target.value.trim();
	countriesApiService
		.fetchCountries(countriesApiService.query)
		.then(tooManyMatches)
		.then(renderCountriesList)
		.then(fetchCountryInfo);
}

function tooManyMatches() {
	if (countriesApiService.countries.length >= 10) {
		Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
	}
}

function renderCountriesList() {
	if (countriesApiService.countries.length >= 2 && countriesApiService.countries.length <= 10) {
		countryInfoEl.innerHTML = "";
		appendCountriesListMarkup(countriesApiService.countries);
	}
}

function fetchCountryInfo() {
	if (countriesApiService.countries.length === 1) {
		countriesListEl.innerHTML = "";
		appendCountryInfoMarkup(countriesApiService.countries);
	}
}

function appendCountryInfoMarkup(countries) {
	countryInfoEl.insertAdjacentHTML("afterbegin", countriesTpl(countries));
}

function appendCountriesListMarkup(countries) {
	countriesListEl.insertAdjacentHTML("afterbegin", countriesListTpl(countries));
}

function clearCountriesContainers() {
	countryInfoEl.innerHTML = "";
	countriesListEl.innerHTML = "";
}

export { clearCountriesContainers };

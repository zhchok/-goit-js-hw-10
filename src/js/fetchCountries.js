import Notiflix from "notiflix";

class SearchCountriesApiService {
	constructor() {
		this.searchQuery = "";
		this.countries = [];
	}

	fetchCountries(name) {
		const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
		return fetch(url)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				}
				throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name"));
			})
			.then(countries => {
				return (this.countries = countries);
			});
	}

	get query() {
		return this.searchQuery;
	}
	set query(value) {
		this.searchQuery = value;
	}
}

export { SearchCountriesApiService };

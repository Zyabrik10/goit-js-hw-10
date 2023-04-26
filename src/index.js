import { fetchCountries } from "./js/fetchCountries.js";

const search_box = document.querySelector('#search-box');
const country_list = document.querySelector('.country-list');
const country_info = document.querySelector('.country-info');

search_box.addEventListener(
  'input',
  _.debounce(() => {
    if (search_box.value.trim() === '') {
      country_list.innerHTML = '';
      country_info.innerHTML = '';
      return;
    }

    const data = fetchCountries(search_box.value);
    
    data.then(arr => {
      const countrys = arr.slice();

      let list = '';

      if (countrys.length === 1) {
        const country = countrys[0];

        const languages = Object.values(country.languages).join(', ');

        country_info.innerHTML = `
          <ul class="conutry-info-list list">
              <li class="conutry-info-item conutry-info-name-flag">
                  <img src='${country.flags.svg}' alt="flag of ${country.name.official}" width="40">
                  <h1 class="hed">${country.name.official}</h1>
              </li>
              <li class="conutry-info-item">
                  <p class="par"><span class="info">Population:</span> ${country.population}</p>
              </li>
              <li class="conutry-info-item">
                  <p class="par"><span class="info">Capital:</span> ${country.capital}</p>
              </li>
              <li class="conutry-info-item">
                  <p class="par"><span class="info">Languages:</span> ${languages}</p>
              </li>
          </ul>
      `;
      } else if (countrys.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        list = countrys
          .map(country => {
            return `
              <li class="country-item">
                  <img src='${country.flags.svg}' alt="flag of ${country.name.official}" width="25">
                  <p class="par">${country.name.common}</p>
              </li>
          `;
          })
          .join('\n');

        country_info.innerHTML = '';
      }

      country_list.innerHTML = list;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      country_list.innerHTML = '';
      country_info.innerHTML = '';
    });
  }, 300)
);

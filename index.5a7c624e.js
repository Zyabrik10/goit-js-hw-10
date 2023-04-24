const n=document.querySelector("#search-box"),i=document.querySelector(".country-list"),a=document.querySelector(".country-info");n.addEventListener("input",_.debounce((()=>{if(""===n.value.trim())return i.innerHTML="",void(a.innerHTML="");fetch(`https://restcountries.com/v3.1/name/${n.value}?fields=name,capital,population,flags,languages`).then((n=>{if(!n.ok)throw new Error(n.status);return n.json()})).then((n=>{const e=n.slice();let t="";if(1===e.length){const n=e[0],i=Object.values(n.languages).join(", ");a.innerHTML=`\n            <ul class="conutry-info-list list">\n                <li class="conutry-info-item conutry-info-name-flag">\n                    <img src='${n.flags.svg}' alt="flag of ${n.name.official}" width="40">\n                    <h1 class="hed">${n.name.official}</h1>\n                </li>\n                <li class="conutry-info-item">\n                    <p class="par"><span class="info">Population:</span> ${n.population}</p>\n                </li>\n                <li class="conutry-info-item">\n                    <p class="par"><span class="info">Capital:</span> ${n.capital}</p>\n                </li>\n                <li class="conutry-info-item">\n                    <p class="par"><span class="info">Languages:</span> ${i}</p>\n                </li>\n            </ul>\n        `}else e.length>10?Notiflix.Notify.info("Too many matches found. Please enter a more specific name."):(t=e.map((n=>`\n                <li class="country-item">\n                    <img src='${n.flags.svg}' alt="flag of ${n.name.official}" width="25">\n                    <p class="par">${n.name.common}</p>\n                </li>\n            `)).join("\n"),a.innerHTML="");i.innerHTML=t})).catch((n=>{Notiflix.Notify.failure("Oops, there is no country with that name"),i.innerHTML="",a.innerHTML=""}))}),300));
//# sourceMappingURL=index.5a7c624e.js.map

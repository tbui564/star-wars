// Select container elements
const film_title = document.getElementById("film-title");
const release_div = document.getElementById("release");
const director_div = document.getElementById("director");
const episode_div = document.getElementById("episode");
const characters_container = document.getElementById("characters-container");
const planets_container = document.getElementById("planets-container");


// Get ID value
const sp = new URLSearchParams(window.location.search);
const id = sp.get("id");


// Make a fetch request to the Star Wars API
const film_endpoint = `https://swapi2.azurewebsites.net/api/films/${id}`;
const character_endpoint = `https://swapi2.azurewebsites.net/api/films/${id}/characters`;
const planet_endpoint = `https://swapi2.azurewebsites.net/api/films/${id}/planets`;

async function fetch_from_swapi(endpoints) {
    const promises = endpoints.map(endpoint => fetch_from_endpoint(endpoint));

    const results = await Promise.all(promises)
        .then(responses => {
            return responses;
        })
        .catch(error => console.error("Error resolving endpoint promises: ", error));

    return results;
}

async function fetch_from_endpoint(endpoint) {
    return fetch(endpoint)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error("Error fetching from endpoint: ", error));
}

async function display_to_html() {
    const [film, characters, planets] = await fetch_from_swapi([film_endpoint, character_endpoint, planet_endpoint]);

    // Aggregate film information
    film_title.innerText = film.title;
    release_div.innerText = film.release_date;
    director_div.innerText = film.director;
    episode_div.innerText = film.episode_id;

    // Aggregate characters
    for (const character in characters) {
        const char_div = document.createElement("a");
        char_div.setAttribute("href", `http://localhost:3000/character.html?id=${characters[character].id}#`);
        char_div.innerText = characters[character].name;
        characters_container.appendChild(char_div);
    }

    // Aggregate planets
    for (const planet in planets) {
        const planet_div = document.createElement("a");
        planet_div.setAttribute("href", `http://localhost:3000/planet.html?id=${planets[planet].id}#`);
        planet_div.innerText = planets[planet].name;
        planets_container.appendChild(planet_div);
    }
}

// Display characters and planets
display_to_html();
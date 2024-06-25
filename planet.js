const nameH1 = document.querySelector('h1#pName');
const surfaceWater = document.querySelector('span#surface_water');
const diameter = document.querySelector('span#diameter');
const rotation_Period = document.querySelector('span#rotation_period');
const terrain = document.querySelector('span#terrain');
const gravity = document.querySelector('span#gravity');
const orbital_Period = document.querySelector('span#orbital_period');
const population = document.querySelector('span#population');
const climate = document.querySelector('span#climate');
const charactersUl = document.querySelector('#characters>ul');
const filmsUl = document.querySelector('#films>ul');
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load

addEventListener('DOMContentLoaded', () => {
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getWorld(id)
});

async function getWorld(id) {
    let world,films,character;
    let charactersUrl = `${baseUrl}/planet/${world?.id}/characters`;
    let filmsUrl = `${baseUrl}/planet/${world?.id}/films`;
    let worldUrl = `${baseUrl}/planets/${id}`;

    //Getting Json Data
    try {
        world = await fetchData(worldUrl);
        films = await fetchData(filmsUrl);
        characters = await fetchData(charactersUrl);
    }
    catch (ex) {
        console.error(`Error reading world ${id} data.`, ex.message);
    }

    renderWorld(world,films,character);
}

async function fetchData(url){
    const jsonData = await fetch(url)
        .then(res => res.json())
    return jsonData;
}

function renderWorld(world,films,character) {
    console.log(world);
    document.title = `SWAPI - ${world?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = world?.name;
    climate.textContent = world?.climate;
    surfaceWater.textContent = world?.surface_water;
    diameter.textContent = world?.diameter;
    rotation_Period.textContent = world?.rotation_period;
    terrain.textContent = world?.terrain;
    gravity.textContent = world?.gravity;
    orbital_Period.textContent = world?.orbital_period;
    population.textContent = world?.population;

    for(const film in films){
        if(films[film].title){
            const tempListItem = document.createElement("a");
            tempListItem.setAttribute("href",`/film.html?id=${films[film].id}`);
            tempListItem.innerText = `${films[film].title}`;
            filmsUl.appendChild(tempListItem);
        }
        
    }
    
    const characterLis = characters?.map(character => `<a href="/film.html?id=${character.id}">${character.name}</a>`)
    charactersUl.innerHTML = characterLis.join("");
}
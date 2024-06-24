let nameH1;
let surfaceWater;
let diameter;
let rotation_Period; 
let terrain; 
let gravity; 
let orbital_Period;
let population;
let climate;
let charactersUl;
let filmsUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;
// Runs on page load

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#pName');
    surfaceWater = document.querySelector('span#surface_water');
    diameter = document.querySelector('span#diameter');
    climate = document.querySelector('span#climate');
    rotation_Period = document.querySelector('span#rotation_period');
    terrain = document.querySelector('span#terrain');
    gravity = document.querySelector('span#gravity');
    orbital_Period = document.querySelector('span#orbital_period');
    population = document.querySelector('span#population');
    charactersUl = document.querySelector('#characters>ul');
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getWorld(id)
});

async function getWorld(id) {
    let world;
    try {
        world = await fetchWorld(id);
        world.films = await fetchFilms(world);
        world.characters = await fetchCharacter(world);
    }
    catch (ex) {
        console.error(`Error reading world ${id} data.`, ex.message);
    }
    renderWorld(world);

}
async function fetchCharacter(world) {
    let url = `${baseUrl}/planet/${world?.id}/characters`;
    const characters = await fetch(url)
        .then(res => res.json())
    console.log("Grabbed Character");
    console.log(characters);
    return characters;
}

async function fetchFilms(world) {
    const url = `${baseUrl}/planet/${world?.id}/films`;
    const films = await fetch(url)
        .then(res => res.json())
    return films;
}

async function fetchWorld(id) {
    let worldUrl = `${baseUrl}/planets/${id}`;
    return await fetch(worldUrl)
      .then(res => res.json())
}

const renderWorld = world => {
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

    console.log(world.films);
    for(const film in world.films){
        console.log(world.films[film]);
        if(world.films[film].title){
            const tempListItem = document.createElement("a");
            tempListItem.setAttribute("href",`/film.html?id=${world.films[film].id}`);
            tempListItem.innerText = `${world.films[film].title}`;
            filmsUl.appendChild(tempListItem);
        }
        
    }
    
    const characterLis = world?.characters?.map(character => `<li><a href="/film.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = characterLis.join("");
}
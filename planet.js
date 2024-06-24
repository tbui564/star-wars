let nameH1;
let surfaceWater;
let diameter;
let rotation_Period; 
let terrain; 
let gravity; 
let orbital_Period;
let population;
let climate;
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
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getWorld(id)
});

async function getWorld(id) {
    let world;
    try {
        world = await fetchCharacter(id)
    }
    catch (ex) {
        console.error(`Error reading world ${id} data.`, ex.message);
    }
    renderWorld(world);

}

async function fetchCharacter(id) {
    let worldUrl = `${baseUrl}/planets/${id}`;
    return await fetch(worldUrl)
      .then(res => res.json())
}

const renderWorld = world => {
    console.log(world);
    document.title = `SWAPI - ${world?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = world?.name;
    climate.textContent = world?.climate;
    surfaceWater.textContent = world?.surfaceWater;
    diameter.textContent = world?.diameter;
    rotation_Period.textContent = world?.rotation_period;
    terrain.textContent = world?.terrain;
    gravity.textContent = world?.gravity;
    orbital_Period.textContent = world?.orbital_period;
    population.textContent = world?.population;
}
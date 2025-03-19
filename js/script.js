
const pokemonSelect = document.getElementById('pokemon-select');
const PokemonButton = document.getElementById('get-pokemon');
const pokemonInfoContainer = document.createElement('div');
pokemonInfoContainer.id = 'pokemon-info';
document.querySelector ('.container').appendChild(pokemonInfoContainer);


function getPokemonInfo (pokemonName) {
  fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then (response => {
     if (!response.ok){
       throw new Error (`Error: ${response.status}`);       
      }
      return response.json()
})

    .then (data => {              
     
      pokemonInfoContainer.innerHTML  = `
        <div class="pokemon-card">
          <h2> ${data.name.toUpperCase ()}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <p><strong>Tipo:</strong>  ${data.types.map(type => type.type.name).join(', ')}</p>
          <p><strong>Altura:</strong>  ${data.height / 10} m</p>
          <p><strong>Peso:</strong>  ${data.weight / 10} kg</p>
        </div>
      `;
    })
    .catch (() => {
      pokemonInfoContainer.innerHTML  = `<p>Hubo un error al obtener la información del Pokémon.</p>`;
    });
}

PokemonButton.addEventListener ('click', () => {
  const selectedPokemon = pokemonSelect.value; 
  getPokemonInfo(selectedPokemon); 
});
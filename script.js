let url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.";
let pokemonArray = [];
let limit = 20;

// function getTypeColor(type) {}


async function getContent(){
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let results = responseAsJson["results"]
  pokemonDataGrab(results);
}

async function pokemonDataGrab(results){
  for (let i = 0; i < limit; i++) {
    const result = results[i];

    if (pokemonArray.some(pokemon => pokemon.name.toLowerCase() === result.name.toLowerCase())) {
      continue;
    }

    let pokemonData = await fetch(result.url);
    let pokemonJson = await pokemonData.json();
    let pokemonSprite = pokemonJson.sprites.front_default;

    let pokemonTypes = pokemonJson.types.map((typeInfo) =>
      capitalizeFirstLetter(typeInfo.type.name)
    );

    let pokemonName = capitalizeFirstLetter(result["name"]);
    let typesHtml = "";
    pokemonTypes.forEach((type) => {
      typesHtml += `<div class="pokemonCardUnderTyp typFont ${type}">${type}</div>`;
    });

    let speciesData = await fetch(pokemonJson.species.url);
    let speciesJson = await speciesData.json();
    let pokedexNumber = speciesJson.id;

    pokemonArray.push({
      name: pokemonName,
      sprite: pokemonSprite,
      types: pokemonTypes,
      pokedexNumber: pokedexNumber,
      typesHtml: typesHtml
    });
  }
  renderPokemonCart();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPokemonCart(){
  let content = document.getElementById("pokemonCard");
  content.innerHTML = "";
  for (let i = 0; i < pokemonArray.length; i++) {
    const pokemon = pokemonArray[i];

    content.innerHTML += /*HTML*/ `
          <div class="pokemonCard ${pokemon['types'][0]}">
        <div class="pokemonCardUpPart">
        <h2 class="pokedexNumberFont"># ${pokemon['pokedexNumber']}</h2>
          <h2 class="h2">${pokemon['name']}</h2>
        </div>
        <div class="pokemonCardUnderPart">
          <div>
          ${pokemon['typesHtml']}
          </div>
          <img id="pokemonSprite${i}" src="${pokemon['sprite']}" alt="Pokemon Sprite">
        </div>
        <div></div>
      </div>
    `;
  }
}

function loadMorePokemon(){
  limit += 20;
  getContent();
}
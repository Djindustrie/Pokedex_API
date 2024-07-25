let url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.";
let pokemonArray = [];
let limit = 0;
let endPoint = 0;
// function getTypeColor(type) {}

async function getContent() {
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let results = responseAsJson["results"];
  endPoint += +20;
  pokemonDataToJarray(results);
}

async function pokemonDataToJarray(results) {
  for (let i = limit; i < endPoint; i++) {
    const result = results[i];
    let pokemonData = await fetch(result.url);
    let pokemonJson = await pokemonData.json();
    let pokemonSprite = pokemonJson.sprites.front_default;
    let speciesData = await fetch(pokemonJson.species.url);
    let speciesJson = await speciesData.json();
    let pokedexNumber = speciesJson.id;
    let pokemonName = capitalizeFirstLetter(result["name"]);
    let pokemonType = pokemonJson.types.map((typeInfo) =>
      test(typeInfo.type.name)
    );
    let pokemonTypes = pokemonJson.types.map((typeInfo) =>
      capitalizeFirstLetter(typeInfo.type.name)
    );
    let typesHtml = "";
    pokemonType.forEach((type) => {
      typesHtml += `<div class="pokemonCardUnderTyp typFont ${type}">${type}</div>`;
    });

    pokemonArray.push({
      sprite: pokemonSprite,
      pokedexNumber: pokedexNumber,
      name: pokemonName,
      type: pokemonType,
      types: pokemonTypes,
      typesHtml: typesHtml,
    });
  }
  renderPokemonCart();
}
function test(sting) {
  return sting;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPokemonCart() {
  let content = document.getElementById("pokemonCard");
  content.innerHTML = "";
  for (let i = 0; i < pokemonArray.length; i++) {
    const pokemon = pokemonArray[i];

    content.innerHTML += templeatRenderPokemonCart(pokemon, i);
  }
}

function toggleOverlay(){
  let OverlayRef = document.getElementById("overlay");
  let bodyRef = document.getElementById('myBody');

  OverlayRef.classList.toggle('d-none');
  bodyRef.classList.toggle('no-scroll');
}

function loadMorePokemon() {
  limit += 20;
  getContent();
}

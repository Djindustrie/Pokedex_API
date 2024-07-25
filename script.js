let url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.";
let pokemonArray = [];
let limit = 0;
let endPoint = 0;
// function getTypeColor(type) {}

async function getContent() {
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let results = responseAsJson["results"];
  endPoint += 20;
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
    let stats = pokemonJson.stats.reduce((acc, stat) => {
      switch (stat.stat.name) {
        case 'hp':
          acc.hp = stat.base_stat;
          break;
        case 'attack':
          acc.attack = stat.base_stat;
          break;
        case 'defense':
          acc.defense = stat.base_stat;
          break;
        case 'special-attack':
          acc.specialAttack = stat.base_stat;
          break;
        case 'special-defense':
          acc.specialDefense = stat.base_stat;
          break;
        case 'speed':
          acc.speed = stat.base_stat;
          break;
      }
      return acc;
    }, {});

    pokemonArray.push({
      sprite: pokemonSprite,
      pokedexNumber: pokedexNumber,
      name: pokemonName,
      type: pokemonType,
      types: pokemonTypes,
      typesHtml: typesHtml,
      stats: stats,
    });
  }
  renderPokemonCart();
}
function test(string) {
  return string;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPokemonCart() {
  let content = document.getElementById("pokemonCard");
  content.innerHTML = "";
  for (let i = 0; i < pokemonArray.length; i++) {
    const pokemon = pokemonArray[i];

    content.innerHTML += `
    <div class="pokemonCard ${pokemon["type"][0]}" onclick="toggleOverlay(${pokemon.pokedexNumber}, '${pokemon.name}', '${pokemon.sprite}', '${pokemon.type.join(' ,')}', '${pokemon.stats.attack}','${pokemon.stats.defense}','${pokemon.stats.hp}', '${pokemon.stats.specialAttack}','${pokemon.stats.specialDefense}','${pokemon.stats.speed}')">
      <div class="pokemonCardUpPart">
        <h2 class="pokedexNumberFont"># ${pokemon["pokedexNumber"]}</h2>
        <h2 class="h2">${pokemon["name"]}</h2>
      </div>
      <div class="pokemonCardUnderPart">
        <div>
          ${pokemon["typesHtml"]}
        </div>
        <img id="pokemonSprite${i}" src="${pokemon["sprite"]}" alt="Pokemon Sprite">
      </div>
    </div>`;
  }
}

function toggleOverlay(pokedexNumber, name, sprite, type, attack, defense, hp, specialAttack, specialDefense, speed) {
  let OverlayRef = document.getElementById("overlay");
  let bodyRef = document.getElementById("myBody");
  OverlayRef.classList.toggle("d-none");
  bodyRef.classList.toggle("no-scroll");

  let typesArray = type.split(',');
  let typesHtml = typesArray.map(type => `<div class="pokemonCardUnderTyp typFont ${type}">${type}</div>`).join("");

  OverlayRef.innerHTML = "";
  OverlayRef.innerHTML = overlayPokemonContent(pokedexNumber, name, sprite, typesHtml, type, attack, defense, hp, specialAttack, specialDefense, speed);
}

function logDownWBubblingProtection(event){
  event.stopPropagation()
}

function loadMorePokemon() {
  limit += 20;
  getContent();
}
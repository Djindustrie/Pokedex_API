// Die such Function

function searchPokemonName(event) {
  if (event.key === "Enter") {
    const input = event.target.value;
    pokemonName(input);
    event.target.vakue = "";
  }
}

async function pokemonName(input) {
  try {
    const pokemonName = input.toLowerCase();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    notResponse(response);
    searchPokemonSprite(response);
  } catch (error) {
    console.error(error);
  }
}

function notResponse(response) {
  if (!response.ok) {
    throw new Error("Could not fetch resource");
  }
}

async function searchPokemonSprite(response) {
  try {
    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement = document.getElementById("pokemonSprite"); // Die ID muss noch an das Passende HTML Element geändert werden.
    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}

// Content

async function loadData() {
  let url = `https://pokeapi.co/api/v2/pokemon/`;
  let response = await fetch(url);
  let responseToJson = await response.json();
  let results = responseToJson["results"];
  renderPokemonCart(results);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function renderPokemonCart(results) {
  let content = document.getElementById("pokemonCard");
  content.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const result = results[i];

    let pokemonData = await fetch(result.url);
    let pokemonJson = await pokemonData.json();
    let pokemonSprite = pokemonJson.sprites.front_default;
    let pokemonTypes = pokemonJson.types.map(typeInfo => capitalizeFirstLetter(typeInfo.type.name));
    let pokemonName = capitalizeFirstLetter(result['name']);
    let typesHtml = '';
    pokemonTypes.forEach(type => {
      typesHtml += `<div class="pokemonCardUnderTyp fontNormel">${type}</div>`;
    });

    content.innerHTML += /*HTML*/ `
      <div class="pokemonCard">
        <div>
          <h2 class="h2">${pokemonName}</h2>
        </div>
        <div class="pokemonCardUnderPart">
          <div id="pokemonCardUnderTyp">
          ${typesHtml}
          </div>
          <img id="pokemonSprite${i}" src="${pokemonSprite}" alt="Pokemon Sprite">
        </div>
        <div></div>
      </div>
    `;
  }
}

// Aufruf der loadData Funktion

function onloadFunc() {
  loadData();
}
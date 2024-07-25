function templeatRenderPokemonCart(pokemon, i) {
  return `<div class="pokemonCard ${pokemon["type"][0]}" onclick="toggleOverlay('${pokemon.name}', '${pokemon.sprite}', '${pokemon.type.join(' ,')}')">
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

function overlayPokemonContent(pokedexNumber, name, sprite, typesHtml, type, attack, defense, hp, specialAttack, specialDefense, speed) {
  return `
    <div onclick="logDownWBubblingProtection(event)" class="overlayContent ${type}">
      <div class="overlayCardUpPart">
        <h2 class="pokedexNumberFont"># ${pokedexNumber}</h2>
        <h2 class="h2">${name}</h2>
      </div>
      <div class="overlayCardMidPart">
        <div class="overlayCardTyp">
          ${typesHtml}
        </div>
        <img src="${sprite}" alt="Pokemon Sprite">
      </div>
      <div class="overlayCardBottunTyp">
      <div>
        <p>HP: ${hp}</p>
        <p>Attack: ${attack}</p>
        <p>Defense: ${defense}</p>
        <p>Special Attack: ${specialAttack}</p>
        <p>Special Defense: ${specialDefense}</p>
        <p>Speed: ${speed}</p>
      </div>
      </div>
    </div>`;
}
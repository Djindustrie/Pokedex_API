function pokemonCardTemplate(pokemon, index) {
  return `
    <div class="pokemonCard ${pokemon.type[0]}" onclick="toggleOverlay(${index}, '${pokemon.type[0]}')">
      <div class="pokemonCardUpPart">
        <h2 class="pokedexNumberFont"># ${pokemon.pokedexNumber}</h2>
        <h2 class="h2">${pokemon.name}</h2>
      </div>
      <div class="pokemonCardUnderPart">
        <div>${pokemon.typesHtml}</div>
        <img id="pokemonSprite${index}" src="${pokemon.sprite}" alt="Pokemon Sprite">
      </div>
    </div>
  `;
}

function overlayPokemonContent(index, pokedexNumber, name, sprite, typesHtmlContent, primaryType, stats) {
  return `
   <div class="overlayContent ${primaryType} onclick="bubblingProtection(event)">
      <div class="overlayCardUpPart">
        <h2 class="pokedexNumberFont"># ${pokedexNumber}</h2>
        <h2 class="h2">${name}</h2>
      </div>
      <div class="overlayCardMidPart">
        <div class="overlayCardTyp">
          ${typesHtmlContent}
        </div>
        <img src="${sprite}" alt="Pokemon Sprite">
      </div>
      <div class="overlayCardStats typFont">
        <p>HP: ${stats.hp}</p>
        <p>Attack: ${stats.attack}</p>
        <p>Defense: ${stats.defense}</p>
        <p>Sp Attack: ${stats.specialAttack}</p>
        <p>Sp Defense: ${stats.specialDefense}</p>
        <p>Speed: ${stats.speed}</p>
      </div>
    </div>
    <div class="overlayNavigation">
      <button onclick="toggleOverlay(${index - 1},'${primaryType}')">Previous</button>
      <button onclick="toggleOverlay(${index + 1}, '${primaryType}')">Next</button>
    </div>`;
}
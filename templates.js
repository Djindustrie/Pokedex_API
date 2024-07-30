function pokemonCardTemplate(pokemon, index) {
  return `
    <div class="pokemonCard ${pokemon.type[0]}" onclick="openOverlay(${index})">
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

function overlayPokemonContent(
  index,
  pokedexNumber,
  name,
  sprite,
  typesHtmlContent,
  primaryType,
  stats
) {
  return `
   <div id="overlayContent" class="overlayContent ${primaryType}" onclick="bubblingProtection(event)">
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
        <div>
            <p>HP: ${stats.hp}</p>
            <p>Attack: ${stats.attack}</p>
            <p>Defense: ${stats.defense}</p>
            <p>Sp Attack: ${stats.specialAttack}</p>
            <p>Sp Defense: ${stats.specialDefense}</p>
            <p>Speed: ${stats.speed}</p>
        </div>
        <div class="overlayNavigation">
          <button id="previous" class="buttonOverlayCart typFont" onclick="otherCard(${
            index - 1
          })">Previous</button>
          <button id="next" class="buttonOverlayCart typFont" onclick="otherCard(${
            index + 1
          })">Next</button>
        </div>
      </div>
    </div>
  `;
}

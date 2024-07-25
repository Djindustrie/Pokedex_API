function templeatRenderPokemonCart(pokemon, i) {
  return `<div class="pokemonCard ${pokemon["type"][0]}">
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

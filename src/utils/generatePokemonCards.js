import axios from "axios";

export async function generatePokemonCards() {
  try {
    // Fetch the list of Pokemons
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=6"
    );
    const pokemonList = response.data.results;

    // Map each Pokemon to a card
    const cards = await Promise.all(
      pokemonList.map(async (pokemon) => {
        // Fetch the Pokemon image detail
        const pokemonResponse = await axios.get(pokemon.url);
        const pokemonDetails = pokemonResponse.data;
        const imageUrl = pokemonDetails.sprites.front_default;
        return {
          src: imageUrl,
          matched: false,
        };
      })
    );
    const shuffledCards = [...cards, ...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const randomnize = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[randomnize]] = [
        shuffledCards[randomnize],
        shuffledCards[i],
      ];
    }
    const finalCards = shuffledCards.map((card) => ({
      ...card,
      id: Math.random(),
    }));
    return finalCards;
  } catch (error) {
    console.error(`Failed to fetch Pokemon data: ${error}`);
    return [];
  }
}

import axios from "axios";

export async function generatePokemonCards() {
  try {
    // Fetch the list of Pokemon
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=6"
    );
    const pokemonList = response.data.results;

    // Map each Pokemon to a card
    const cards = await Promise.all(
      pokemonList.map(async (pokemon) => {
        // Fetch the Pokemon details
        const pokemonResponse = await axios.get(pokemon.url);
        const pokemonDetails = pokemonResponse.data;

        // Get the image URL
        const imageUrl = pokemonDetails.sprites.front_default;

        return {
          src: imageUrl,
          matched: false,
        };
      })
    );

    // Duplicate the deck of cards
    const shuffledCards = [...cards, ...cards];

    // Shuffle the deck
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }

    // Assign unique IDs to each card
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

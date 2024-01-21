import { useEffect, useState } from "react";
import Card from "./components/Cards/Card";
import { pokemonCards } from "./components/pokemonData";

const GAME_DELAY = 1000;
function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [startFlip, setStartFlip] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStartFlip(false);
    }, GAME_DELAY);
    reArrangeCards();
  }, []);

  function reArrangeCards() {
    const shuffledCards = [...pokemonCards, ...pokemonCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(0);
    setDisabled(false);
    setStartFlip(true);
    setTimeout(() => {
      setStartFlip(false);
    }, GAME_DELAY);
  }

  const handleChoice = (card) => {
    choiceOne
      ? choiceOne.id !== card.id && setChoiceTwo(card)
      : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, GAME_DELAY);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="flex flex-col items-center justify-center pt-5 gap-10 ">
      <button
        className="hover:cursor-pointer hover:brightness-75 py-3 px-3 border-2 border-white bg-blue-700 text-white"
        onClick={reArrangeCards}
      >
        New Game
      </button>
      <div className="grid grid-cols-4 gap-8 w-[500px] mt-12 max-md:grid-cols-2 max-sm:grid-cols-1">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched ||
              startFlip
            }
            disabled={disabled}
            handleChoice={handleChoice}
          />
        ))}
      </div>
      <div className="hover:cursor-pointer hover:brightness-75 py-3 px-3 border-2 border-white bg-blue-700 text-white">
        <p>Turns: {turn}</p>
      </div>
    </div>
  );
}

export default App;

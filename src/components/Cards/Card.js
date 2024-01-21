import React from "react";
import cardBack from "../../assets/images/card_back.png";
import "./Card.css";

function Card({ flipped, disabled, handleChoice, card }) {
  function submitPokeCard() {
    if (!disabled) {
      handleChoice(card);
    }
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          className={`front ${card.matched ? "matched" : ""}`}
          src={card.src}
          alt="card front"
        />
        <img
          className="back"
          src={cardBack}
          alt="card back"
          onClick={() => submitPokeCard()}
        />
      </div>
    </div>
  );
}

export default Card;

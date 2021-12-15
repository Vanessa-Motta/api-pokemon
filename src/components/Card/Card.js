
import typeColors from '../../helpers/typeColors'
import './style.css';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import React, { useState } from "react";



function Card({ pokemon, favorites, setFavorites }) {

  
  function adicionar() {
    
    if (!favorites.includes(pokemon.name)) setFavorites([...favorites, pokemon.name]);
    localStorage.setItem('favorites', favorites);
      console.log(favorites);
  }

 
  return (
    <div className="flip-container">
      
      <button className="btn-favorite" type='button' onClick={() => adicionar(pokemon.name)}><FcLikePlaceholder style={{ fontSize: '20pt' }} /></button>
      <div className="flipper">
        <div className="front">
          <div className="Card__img">
            <img src={pokemon.sprites.front_default} alt="" />
          </div>
          <div className="Card__name">
            {pokemon.name}
          </div>
        </div>
        <div className="back">

          <div className="Card__types">
            {
             (type => {
                return (
                  <div className="Card__type" style={{ backgroundColor: typeColors[type.type.name] }}>
                    {type.type.name}
                  </div>
                )
              })
            }
          </div>
          <div className="Card__info">
            <div className="Card__data Card__data--weight">
              <p className="title">Weight</p>
              <p>{pokemon.weight}</p>
            </div>
            <div className="Card__data Card__data--weight">
              <p className="title">Height</p>
              <p>{pokemon.height}</p>
            </div>
            <div className="Card__data Card__data--ability">
              <p className="title">Ability</p>
              <p>{pokemon.abilities[0].ability.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
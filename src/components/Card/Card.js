import React, { useState, useEffect } from "react";
import typeColors from '../../helpers/typeColors'
import Lottie from 'react-lottie';
import './style.css';
import animationData from '../Card/animation.json'

export default function Card({ pokemon }) {
  const [isLiked, setLikeState] = useState(false);
  const [favourites, setFavorites] = useState([]);
  const [animationState, setAnimationState] = useState({
    isStopped: true, isPaused: false,
    direction: -1,
  });

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  function handleButtonClick() {
    const reverseAnimation = -1;
    const normalAnimation = 1;

    setAnimationState({
      ...setAnimationState,
      direction: animationState.direction === normalAnimation
        ? reverseAnimation
        : normalAnimation,
    })
    setLikeState(!isLiked)

    LikeButton(pokemon)
    
  }

   useEffect(() => {
    const pokemonFavorites = JSON.parse(
      localStorage.getItem('api-pokemon-favourites')
    );

    if (pokemonFavorites) {
      setFavorites(pokemonFavorites);
    }
  }, []);
 
  const saveToLocalStorage = (item) => {
    localStorage.setItem('api-pokemon-favourites', JSON.stringify(item));
  };

 const LikeButton = (pokemon) => {
    const newFavoriteList = [...favourites, pokemon];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);

    

    // if (!favourites.includes(pokemon)) setFavorites([...favourites, pokemon]);
    // localStorage.setItem ('favorite', JSON.stringify(pokemon));
    
  }
  

  console.log(pokemon)

  return (
    <div className="flip-container">
      <button className="btn-favorite" type='button' onClick={handleButtonClick}>
        <div className="animation">
          <Lottie options={defaultOptions} width={50} height={50} direction={animationState.direction} isStopped={animationState.isStopped} isPaused={animationState.isPaused} />
        </div>
      </button>
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

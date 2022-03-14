import React from 'react';
import './style.css';
import Lottie from 'react-lottie';
import animationData from './pokemon.json'

export default function Dashboard(){
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return(
    <div>
       <h1 className='h1'>Bem-vindo a minha Pokedex!</h1>
       <Lottie options={defaultOptions} width={500} height={500} />
    </div>
  )
}
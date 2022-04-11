import React, { useState, useEffect } from 'react';
import { getPokemon, getAllPokemon } from './services/pokemon';
import PokemonList from './components/PokemonList/PokemonList';
import Favorite from './components/Favorite/Favorite';
import Dashboard from './components/Dashboard/Dashboard'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

export default function App({favourites, setFavourites}) {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=8'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }

  return (
    <>
      <header className='header'>
        <Link className='link' to='/'>Home</Link>
        <Link className='link' to='/PokemonList'>Pokémon's</Link>
        <Link className='link' to='/Favorite'>Favoritos</Link>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='Favorite' element={<Favorite pokemon={favourites} />} />
          <Route path='PokemonList' element={<PokemonList next={next} prev={prev} pokemonData={pokemonData} loading={loading} />} />
        </Routes>
      </main>
    </>
  );
}


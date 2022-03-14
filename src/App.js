import React, { useState, useEffect } from 'react';
import { getPokemon, getAllPokemon } from './services/pokemon';
import Home from './components/Home/Home';
import Favorite from './components/Favorite/Favorite';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

export default function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=6'

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

    console.log(_pokemonData)
  }

  return (
    <>
      <header className='header'>
        <Link className='link' to='/Home'>Lista de Pokémon</Link>
        <Link className='link' to='/Favorite'>Meus Favoritos</Link>
      </header>
      <main>
        <Routes>
          <Route path='Favorite' element={<Favorite />} />
          <Route path='Home' element={<Home next={next} prev={prev} pokemonData={pokemonData} loading={loading} />} />
        </Routes>
        <Dashboard />
        <Footer />
      </main>
    </>
  );
}


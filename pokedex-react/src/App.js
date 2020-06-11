import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/getAllPokemon'
import Card from './components/Card/'
import Navbar from './components/Navbar/'

import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  // console.log(`pokemonData= ${pokemonData}`)
  // console.log(`setPokemonData= ${setPokemonData}`)
  const [nextUrl, setNextUrl] = useState('');
  // console.log(`nextUrl= ${nextUrl}`)
  // console.log(`setNextUrl= ${setNextUrl}`)
  const [prevUrl, setPrevUrl] = useState('');
  // console.log(`prevURL= ${prevUrl}`)
  // console.log(`setPrevURL= ${setPrevUrl}`)
  const [loading, setLoading] = useState(true);
  // console.log(`loading= ${loading}`)
  // console.log(`setLoading= ${setLoading}`)
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData(){
      let response = await getAllPokemon(initialUrl);
      // console.log(`response = ${response}`)
      setNextUrl(response.next);
      // console.log(`response.next = ${response.next}`)
      setPrevUrl(response.previous);
      // console.log(`response.previous = ${response.previous}`)
      await loadingPokemon(response.results);
      // console.log(`response.results = ${response.results}`)

      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    // console.log(`Next.data= ${data}`)
    await loadingPokemon(data.results)
    // console.log(`Next.data.results= ${data.results}`)
    setNextUrl(data.next);
    // console.log(`Next.data.next= ${data.next}`)
    setPrevUrl(data.previous);
    // console.log(`Next.data.previous= ${data.previous}`)
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl){
      setLoading(true);
    }
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    }))

    setPokemonData(_pokemonData)
  }

  // console.log(pokemonData);

  return (
    <div>
    {
      loading ? <h1>Loading...</h1> : (
      <>
      <Navbar />
      <div className='btn'>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
        <div className="grid-container">
          {pokemonData.map((pokemon) => {
            return (
              <Card key={pokemon.id} pokemon={pokemon}/>
            )
          })}
        </div>
        <div className='btn'>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
      </>
      )
    }
    </div>
  );
}

export default App;

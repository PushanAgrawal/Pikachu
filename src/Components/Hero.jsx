import React, { useState, useEffect } from 'react';
import {Pokedex} from "pokeapi-js-wrapper"
import {Link} from "react-router-dom"
import splash from "../assets/splash.gif"

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [splashScreen, setsplashScreen] = useState(false);
  
  const P = new Pokedex();
  useEffect(() => {
    //Idle timer

    let timerId;

    const resetTimer = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        setsplashScreen(true)
      },2 * 1000); //30 sec idle time
    };

   resetTimer()
    
  }, []);

  useEffect(() => {
    // Fetch Pokémon data
    P.getPokemonsList({ limit: 20 }) // Fetch more Pokémon if needed
      .then((response) => {
        return Promise.all(
          response.results.map((pokemon) => P.getPokemonByName(pokemon.name))
        );
      })
      .then((data) => setPokemons(data));
  }, []);

  // Filter function based on category (types)
  const filterPokemonsByType = (type) => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.types.some((t) => t.type.name === type)
    );
    setFilteredPokemons(filtered);
  };

  return (
    <>
     {!splashScreen && (
    <div className='flex '>
      <img src={splash} alt="" />

    </div>)}
    {splashScreen && (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Pokémon World</h1>
        <p className="text-lg">Catch them all and explore categories!</p>
        <Link to={"/PokemonBattle"}>
        <button
        
   
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition duration-200"
      >
        CHALO BATTLE KARE
      </button>
        </Link>
      </section>

      {/* Carousel for Pokémon Cards */}
      <section className="my-12">
        <h2 className="text-center text-3xl font-bold mb-8">Featured Pokémon</h2>
        <div className="flex overflow-x-scroll space-x-6 px-6">
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="flex-none w-48 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={pokemon.sprites.
                    other
                    .dream_world.front_default}
                alt={pokemon.name}
                className="w-full h-40 "
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{pokemon.name}</h3>
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="mt-4 block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category-Based Filter Section */}
      <section className="my-12">
        <h2 className="text-center text-3xl font-bold mb-8">Explore by Type</h2>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => filterPokemonsByType('fire')}
          >
            Fire
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => filterPokemonsByType('water')}
          >
            Water
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => filterPokemonsByType('grass')}
          >
            Grass
          </button>
        </div>

        {/* Display Pokémon Cards by Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {filteredPokemons.length > 0
            ? filteredPokemons.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    // src={pokemon.sprites.front_default}
                    src={pokemon.sprites.
                      other
                      .dream_world.front_default}
                    alt={pokemon.name}
                    className="w-full h-40 "
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{pokemon.name}</h3>
                  </div>
                </div>
              ))
            : pokemons.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                   src={pokemon.sprites.
                    other
                    .dream_world.front_default}
                    // src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-40 "
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{pokemon.name}</h3>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </div>)}
    </>
  );
};

export default App;

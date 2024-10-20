// import React, { useEffect, useState } from 'react'
// import { Pokedex } from 'pokeapi-js-wrapper'

// const Hero = () => {
//     const [pokemonData, setpokemonData] =useState([])
//     const P = new Pokedex();
//     useEffect(()=>{
//         setpokemonData(getAllPokemons())


//     },[])
//     const getAllPokemons = async () => {
//         const limit = 100; // Set the limit for how many Pokémon to retrieve at once
//         const totalPokemons = 898; // Total number of Pokémon available
//         const allPokemons = [];
    
//         for (let offset = 0; offset < totalPokemons; offset += limit) {
//             try {
//                 const data = await P.getPokemonsList({ limit, offset });
//                 allPokemons.push(...data.results);
//             } catch (error) {
//                 console.error('Error` fetching Pokémon:', error);
//             }
//         }
//     console.log(allPokemons)
//     P.getMachineById(1).then(function(response) {
//         console.log(response)
//       })
//       P.getPokemonByName("bulbasaur").then(function(response) {
//         console.log(response)
//       })
//         return allPokemons;
//     };
//     getAllPokemons()
//   return (
//     <div className='flex p-10 justify-center '>
//         <div className='flex-row'>
//             <div>
//            className
//             </div>
//             image
//             <div>

//             </div>
//         </div>
        
//     </div>
//   )
// }

// export default Hero

// App.js
import React, { useState, useEffect } from 'react';
import {Pokedex} from "pokeapi-js-wrapper"
import {Link} from "react-router-dom"

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [splashScreen, setsplashScreen] = useState(0);
  
  const P = new Pokedex();
  useEffect(() => {
    //Idle timer

    let timerId;

    const resetTimer = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        setsplashScreen(1)
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
    <div className='flex items-center'>
      <img src="/src/assets/splash.gif" alt="" />

    </div>)}
    {splashScreen && (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 py-20 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Pokémon World</h1>
        <p className="text-lg">Catch them all and explore categories!</p>
        <button
   
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition duration-200"
      >
        CHALO BATTLE KARE
      </button>
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
                className="w-full h-40 object-cover"
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
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-40 object-cover"
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
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-40 object-cover"
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

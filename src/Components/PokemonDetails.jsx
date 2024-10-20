import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Pokedex } from 'pokeapi-js-wrapper';
const PokemonDetails = () => {
  const { name } = useParams(); // Get Pokémon name from URL
  const [pokemon, setPokemon] = useState(null);
  const P = new Pokedex();

  useEffect(() => {
    // Fetch details of individual Pokémon
    P.getPokemonByName(name)
      .then((data) => setPokemon(data))
      .catch((error) => console.log(error));
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* Back link */}
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to list
      </Link>

      <div className="text-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-48 h-48 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-4">{pokemon.name}</h1>

        {/* Pokémon Stats */}
        <h2 className="text-2xl font-bold mb-2">Stats</h2>
        <ul className="mb-6">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name} className="text-lg">
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>

        {/* Pokémon Abilities */}
        <h2 className="text-2xl font-bold mb-2">Abilities</h2>
        <ul className="mb-6">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name} className="text-lg">
              {ability.ability.name}
            </li>
          ))}
        </ul>

        {/* Pokémon Types */}
        <h2 className="text-2xl font-bold mb-2">Types</h2>
        <ul className="mb-6">
          {pokemon.types.map((type) => (
            <li key={type.type.name} className="inline-block bg-blue-200 text-blue-800 py-1 px-3 rounded-full text-sm mr-2">
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};

export default PokemonDetails;

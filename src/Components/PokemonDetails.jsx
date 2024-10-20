import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Pokedex } from 'pokeapi-js-wrapper';
import fire from "../assets/fire.jpg"
import grass from "../assets/grass.jpg"
import water from "../assets/water.jpg"
const images = {
  "fire":fire,
  "grass":grass,
  "water":water,
}

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
    <div className="min-h-screen bg-yellow-100 p-6 flex items-center justify-center">
      {/* Card Layout */}
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl relative">
        {/* Back to List */}
        <Link to="/" className="absolute top-4 left-4 text-blue-500 hover:underline">
          &larr; Back to list
        </Link>

        {/* Pokémon Card Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold uppercase">{pokemon.name}</h1>
            <p className="text-gray-500">Stage: {pokemon.order}</p>
          </div>
          <div className="flex items-center">
            <span className="text-red-500 text-2xl font-bold">{pokemon.stats[0].base_stat} HP</span>
            <img
              // src={`/src/assets/${pokemon.types[0].type.name}.jpg`}
              src={images[`${pokemon.types[0].type.name}`]}
              alt={pokemon.types[0].type.name}
              className="w-8 h-8 ml-2 bg-white"
            />
          </div>
        </div>

        {/* Pokémon Image */}
        <div className="text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-40 h-40 mx-auto mb-4 animate-pulse"
          />
        </div>

        {/* Pokémon Stats */}
        <div className="bg-yellow-200 p-4 rounded-lg shadow-lg mb-4">
          <h2 className="text-xl font-bold text-center mb-4">Stats</h2>
          <ul className="grid grid-cols-2 gap-4">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className="text-lg bg-white rounded-lg p-2 shadow">
                <span className="font-semibold">{stat.stat.name}</span>: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        {/* Pokémon Abilities */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold mb-2">Abilities</h2>
          <ul className="flex justify-center flex-wrap gap-4">
            {pokemon.abilities.map((ability) => (
              <li
                key={ability.ability.name}
                className="bg-blue-100 text-blue-600 py-1 px-4 rounded-full shadow-lg"
              >
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Pokémon Types */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold mb-2">Types</h2>
          <ul className="flex justify-center gap-4">
            {pokemon.types.map((type) => (
              <li
                key={type.type.name}
                className={`py-1 px-4 rounded-full shadow-lg text-sm ${
                  type.type.name === 'fire'
                    ? 'bg-red-200 text-red-800'
                    : type.type.name === 'water'
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-green-200 text-green-800'
                }`}
              >
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Pokémon Flavor Text */}
        <p className="text-center italic text-gray-500">
          {pokemon.name} is known for its {pokemon.types[0].type.name} abilities.
        </p>
      </div>
    </div>
  );
};

export default PokemonDetails;

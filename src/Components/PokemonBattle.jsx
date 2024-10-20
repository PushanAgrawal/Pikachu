import React, { useState, useEffect } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';

const PokemonBattle = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [winner, setWinner] = useState(null);
  const [disabled, setDisabled] = useState(1)
  const P = new Pokedex();

  // Fetch list of all Pokémon names
  const fetchAllPokemon = () => {
    P.getPokemonsList({ limit: 150 }) // Adjust limit to the number of Pokémon you want
      .then((response) => {
        const names = response.results.map((pokemon) => pokemon.name);
        setPokemonList(names);
      })
      .catch((error) => console.log(error));
  };

  // Fetch a random Pokémon's details using its name
  const fetchRandomPokemon = () => {
    if (pokemonList.length === 0) return;

    const randomName1 = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    const randomName2 = pokemonList[Math.floor(Math.random() * pokemonList.length)];

    P.getPokemonByName(randomName1).then((data) => setPlayer1(data));
    P.getPokemonByName(randomName2).then((data) => setPlayer2(data));
    setWinner(null); // Reset winner on new round
    setDisabled(0) // enable battle button
  };

  // Determine the winner based on HP
  const determineWinner = () => {
    if (player1 && player2) {
      if (player1.stats[0].base_stat > player2.stats[0].base_stat) {
        setWinner('Player 1 Wins!');
      } else if (player1.stats[0].base_stat < player2.stats[0].base_stat) {
        setWinner('Player 2 Wins!');
      } else {
        setWinner('It’s a Draw!');
      }
    }
    setDisabled(1)
  };

  // Fetch Pokémon list when the component mounts
  useEffect(() => {
    fetchAllPokemon();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">Pokémon Battle</h1>

      {/* Pokémon Battle Cards */}
      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
        {player1 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Player 1</h2>
            <img
              src={player1.sprites.front_default}
              alt={player1.name}
              className="w-40 h-40 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-center capitalize">{player1.name}</h3>
            <p className="text-lg text-center">HP: {player1.stats[0].base_stat}</p>
          </div>
        )}

        {player2 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Player 2</h2>
            <img
              src={player2.sprites.front_default}
              alt={player2.name}
              className="w-40 h-40 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-center capitalize">{player2.name}</h3>
            <p className="text-lg text-center">HP: {player2.stats[0].base_stat}</p>
          </div>
        )}
      </div>

      {/* Winner Announcement */}
      {winner && (
        <div className="mt-8 bg-yellow-200 p-4 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center">{winner}</h2>
        </div>
      )}

      {/* Battle Button */}
      <button
      disabled={disabled}
        onClick={determineWinner}
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition duration-200"
      >
        Battle!
      </button>

      {/* Replay Button */}
      <button
        onClick={fetchRandomPokemon}
        className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition duration-200"
      >
        Play Again
      </button>
    </div>
  );
};

export default PokemonBattle;

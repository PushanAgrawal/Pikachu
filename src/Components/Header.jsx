import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Pokedex} from 'pokeapi-js-wrapper';
import logo from '../assets/logo.png';
import {Link} from "react-router-dom"

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const P = new Pokedex();

  // Fetch all Pokémon with sprites when the component mounts
  useEffect(() => {
    P.getPokemonsList({ limit: 100 }) // Fetch 100 Pokémon, adjust limit as needed
      .then((response) => {
        return Promise.all(
          response.results.map(pokemon => 
            P.getPokemonByName(pokemon.name) // Fetch Pokémon details including sprites
          )
        );
      })
      .then((pokemonData) => {
        const pokemonList = pokemonData.map(pokemon => ({
          name: pokemon.name,
          sprite: pokemon.sprites.front_default, // Use front_default sprite
        }));
        setPokemons(pokemonList);
      })
      .catch((error) => console.error('Error fetching Pokémon data:', error));
  }, []);

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const filteredSuggestions = pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pokemons]);

  // Handle click on Pokémon suggestion
  const handleSuggestionClick = (name) => {
    setSearchTerm(''); // Clear search input
    setSuggestions([]); // Clear suggestions dropdown
    navigate(`/pokemon/${name}`); // Navigate to Pokémon details page
  };

  return (
    <header className="py-4 bg-gray-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <div className='w-2/5 pl-10'>
        <Link
                  to={`/`}>
          <img 
            src={logo} 
            className="h-12 hover:scale-125 ease-in-out font-bold cursor-pointer transition duration-200" 
            alt="Logo" 
          />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative w-3/5">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pokémon..." 
            className="bg-white custom-cursor text-gray-800 w-full rounded-full py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          />
          
          {/* Dropdown with Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {suggestions.map((pokemon) => (
                <li 
                  key={pokemon.name} 
                  onClick={() => handleSuggestionClick(pokemon.name)} 
                  className="flex items-center cursor-pointer py-2 px-4 hover:bg-yellow-200 transition duration-200"
                >
                  {/* Pokémon Sprite */}
                  <img 
                    src={pokemon.sprite} 
                    alt={pokemon.name} 
                    className="h-8 w-8 mr-3"
                  />
                  {/* Pokémon Name */}
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

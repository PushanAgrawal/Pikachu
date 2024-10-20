import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Components/Header'
import './App.css'
import Hero from './Components/Hero'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import PokemonDetails from './Components/PokemonDetails'
import PokemonBattle from './Components/PokemonBattle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <div className='flex flex-col'> */}
      <Router>
      <Header></Header>
      <Routes>
        {/* Home page listing all Pokémon */}
        <Route path="/" element={<Hero />} />
        
        {/* Dynamic route for individual Pokémon details */}
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/PokemonBattle" element={<PokemonBattle />} />
      </Routes>
    </Router>

     {/* </div>  */}
    </>
  )
}

export default App

import React from 'react';
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className=" custom-cursor bg-blue-700 text-white px-4 py-2 shadow-md">
      <div className="  flex justify-between items-center">
        {/* <h1 className="text-4xl font-bold cursor-pointer hover:text-yellow-300 transition duration-200">
          Pokémon List
        </h1> */}
        <div className='w-2/5 pl-10'>

        <img src={logo} className="h-12 hover:scale-125 ease-in-out font-bold cursor-pointer hover:text-yellow-300 transition duration-200" alt="" />
        </div>
        <div className=" w-3/5">
          <input 
            type="text" 
            placeholder="Search Pokémon..." 
            className="bg-white custom-cursor text-gray-800 w-full rounded-full py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          />
        
        </div>
        {/* <nav className="space-x-6"> */}
          {/* <a href="/" className="hover:text-yellow-300 transition duration-200">Home</a> */}
          {/* <a href="/about" className="hover:text-yellow-300 transition duration-200">About</a>
          <a href="/contact" className="hover:text-yellow-300 transition duration-200">Contact</a> */}
        {/* </nav> */}
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Menu = () => {

  const [adjisOpen, setadjIsOpen] = useState(false);
  const [dbtisOpen, setdbtIsOpen] = useState(false);
  const [champisOpen, setchampIsOpen] = useState(false);
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex">
        <li className="mr-4">
          <Link to="/" className="text-white hover:text-blue-300">Home</Link>
        </li>
        <li className="mr-4">
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
        </li>
        <li className="relative mr-4">
          <button onClick={() => setchampIsOpen(!champisOpen)} className="text-white hover:text-gray-300">Manage Championships</button>
          {champisOpen && (
            <ul className="absolute left-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
              <li>
                <Link to="/championships" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Championship List</Link>
              </li>
              <li>
                <Link to="/createchampionship" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Create Championship</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="relative mr-4">
          <button onClick={() => setadjIsOpen(!adjisOpen)} className="text-white hover:text-gray-300">Manage Adjudicators</button>
          {adjisOpen && (
            <ul className="absolute left-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
              <li>
                <Link to="/debaterlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Adjudicator List</Link>
              </li>
              <li>
                <Link to="/adjudicatorimport" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Add Adjudicators</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="relative mr-4">
          <button onClick={() => setdbtIsOpen(!dbtisOpen)} className="text-white hover:text-gray-300">Manage Debaters</button>
          {dbtisOpen && (
            <ul className="absolute left-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
              <li>
                <Link to="/debaterlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Debater List</Link>
              </li>
              <li>
                <Link to="/debaterimport" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Add Debaters</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
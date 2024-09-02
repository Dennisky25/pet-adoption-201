import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { searchPetBySpecies } from '../../utils/petAdoption';
import PropTypes from "prop-types";


const Nav = ({ species, setSpecies }) => {
  const handleSearch = (e) => {
    setSpecies(e.target.value);
  };

  return (
    <div className="">
      <nav
        className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm shadow-blue-700 font-mono"
        role="navigation"
      >
        <div className="pl-8">Pet Adoption</div>

        <div className="pr-8">
          <input
            type="text"
            placeholder="Search by species"
            onChange={(e) => setSpecies(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="pr-8">
          <Link
            to="/users?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
            className="p-4"
          >
            Home
          </Link>
          <Link
            to="/records?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
            className="p-4"
          >
            Records
          </Link>
        </div>
      </nav>
    </div>
  );
}



export default Nav
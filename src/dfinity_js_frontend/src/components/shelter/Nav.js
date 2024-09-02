import React from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav
        className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm shadow-blue-700 font-mono "
        role="navigation"
      >
        <div className="pl-8">Pet Adoption</div>
        <div className="pr-8 flex space-x-3">
          <Link
            to="/shelter?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
            className=" "
          >
            <span className="">Home</span>
          </Link>
          <Link to="/adoptions?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
            
            <span
            >
              Adoption Records
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Nav
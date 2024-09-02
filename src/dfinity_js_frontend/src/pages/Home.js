import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

 
const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className=" flex flex-col relative">
      <nav
        className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm shadow-blue-700 font-mono"
        role="navigation"
      >
        <p className="pl-4">Pet Adoption</p>
        <Button className="pr-8" onClick={handleShow}>
          Login
        </Button>
        <Modal show={show}>
          <h1 className=" text-center text-blue-500 pt-2">Sing Up</h1>
          <div className="flex  justify-center flex-col border-1 text-center ">
            <p className="">Sign up as User</p>
            <Link
              to="/users?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
              className=""
            >
              <span>User</span>
            </Link>
            <p>Sign up For shelter</p>
            <Link
              to="/shelter?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
              className=" "
            >
              <span>Shelter</span>
            </Link>
          </div>
          <button onClick={handleClose}>Close</button>
        </Modal>
      </nav>
      <div className=" text-center pt-8">
        <h1>Welcome to the Pet Adoption Shelter</h1>
        <p>Adopt a pet today!</p>
      </div>
      <footer className="absolute bottom-1">
        <p>&copy; 2024 Pet Adoption Shelter</p>
      </footer>
    </div>
  );
};

export default Home;

import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import ShelterLogin from "./pages/shelter/Login";
import UsersLogin from "./pages/user/LoginPage";
import PetInfo from "./pages/user/PetInfo";
import Adoptions from "./components/shelter/Adoptions";
import Application from "./pages/user/Application";

const App = function AppWrapper() {

  return (
    <Router>
      <Routes>
        <Route exaxt path="/" element={<Home />} />
          <Route  path="/shelter" element={<ShelterLogin />} />
          <Route  path="/users" element={<UsersLogin />} />
          <Route path="/petInfo" element={<PetInfo />} />
          <Route path="/adoptions" element={<Adoptions />} />
          <Route path="/records" element={<Application />} />
        
      </Routes>
    </Router>
  );
};

export default App;

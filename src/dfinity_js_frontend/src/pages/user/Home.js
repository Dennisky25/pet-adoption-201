import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fileForAdoption,
  getPets as getPetList,
  getUserOwner,
  getUsers,
  getPetsNotAdopted,
  searchPetBySpecies,
} from "../../utils/petAdoption";

import Pet from "../../components/shelter/Pet";
import Nav from "../../components/users/Nav";

 
const Home = ({ user }) => {
  const { id, name, phoneNumber, email, address } = user;
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [species, setSpecies] = useState("");

  const navigate = useNavigate();

   
  const getPets = useCallback(async () => {
    try {
      setLoading(true);
      setPets(await getPetsNotAdopted());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    getPets();
  }, []);

 
  const adopt = async (pet) => {
    try {
      setLoading(true);
      fileForAdoption(pet).then((resp) => {
        getPets();
      });
      toast(<NotificationSuccess text="Filled for adoption succesfilly." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to file for adoption." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (species.trim() === "") {
      setFilteredPets(pets);  
      setNotFound("");
    } else {
      const filtered = pets.filter((pet) =>
        pet.species.toLowerCase().includes(species.toLowerCase())
      );

      setFilteredPets(filtered);

      if (filtered.length === 0) {
        setNotFound(`No pets found for species: ${species}`);
      } else {
        setNotFound("");
      }
    }
  }, [species, pets]);

  

  return (
    <div className=" relative">
      <Nav species={species} setSpecies={setSpecies} />
      <div className="text-center pt-3 pb-3">
        <h1>Find Your New Friend</h1>
        {loading && <p>Loading...</p>}
        {notFound && <p>No pets found</p>}
        <div className="flex space-x-3 pl-4 ">
          {filteredPets.map((_pet, index) => (
            <Pet
              key={index}
              pet={{
                ..._pet,
              }}
              adopt={adopt}
            />
          ))}
        </div>
      </div>
      <footer>
        <p>&copy; 2021 Pet Adoption Shelter</p>
      </footer>
    </div>
  );
};

export default Home;

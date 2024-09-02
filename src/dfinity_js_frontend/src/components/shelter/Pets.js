import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  addPet,
  getPets as getPetList,
  getShelters,
  updatePet,

} from "../../utils/petAdoption";

import Pet from "./Pet";
import AddPet from "./AddPet";
import PetInfo from "./PetInformation";
import { Link } from "react-router-dom";
import PetInputForm from "./PetInfo";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState(false);
  const [shelter, setShelter] = useState({});
   

   

  const fetchShelters = async () => {
    try {
      const shelters = await getShelters();
      const shelter = shelters.find((shelter) => shelter.id === shelter.id);
      setShelter(shelter);
    } catch (error) {
      console.error(error);
    }
  };

 
  const fetchPets = async () => {
    try {
      const pets = await getPetList();
      const pet = pets.find((pet) => pet.id === pet.id);
      setPet(pet);
    } catch (error) {
      console.error(error);
    }
  };

 
   const getAllPets = async () => {
     try {
       setLoading(true);
       setPets(await getPetList());
     } catch (error) {
       console.log({ error });
     } finally {
       setLoading(false);
     }
   };
 
  const createPet = async (pet) => {
    try {
      setLoading(true);
      addPet(pet).then((resp) => {
        getAllPets();
      });
      toast(<NotificationSuccess text="Pet added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to add a pet." />);
    } finally {
      setLoading(false);
    }
  };

  const triggerAdd = ({
    name,
    species,
    breed,
    gender,
    description,
    age,
    petImage,
    healthStatus,
  }) => {
    createPet({
      shelterId: shelter.id,
      name,
      species,
      breed,
      gender,
      description,
      age,
      petImage,
      healthStatus,
    });
    console.log("Data being sent:", {
      age,
      name,
      description,
      healthStatus,
      gender,
      shelterId: shelter.id,
      breed,
      //petImage,
      species,
    });
  };

  const update = async (pet) => {
    try {
      setLoading(true);
      updatePet(pet).then((resp) => {
        getAllPets();
      });
      toast(<NotificationSuccess text="Pet updated successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update a pet." />);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchShelters();
    getAllPets();
    fetchPets();
  }, []);

  
  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Pets</h1>
          <AddPet createPet={triggerAdd} />

          <Link to="/adoptions?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
            {" "}
            <h1>Adoptions</h1>
          </Link>
        </div>
       

        <div className=" flex">
          <Row xs={1} sm={2} lg={3} className="">
            {pets.map((_petInfo, index) => (
              <PetInfo
                key={index}
                pet={{
                  ..._petInfo,
                }}
              
                update={update}
              />
            ))}
          </Row>
        </div>
      </>
    </>
  );
};

export default Pets;

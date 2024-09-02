import React, { useEffect, useState } from 'react'
import HUSKY1 from '../../assets/img/HUSKY1.png'
import { getPets, getPet, fileForAdoption, getUsers } from '../../utils/petAdoption';
import { useLocation } from 'react-router-dom';
import Adopt from '../../components/shelter/FileForAdoption';
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "../../components/utils/Notifications";
import Loader from '../../components/utils/Loader';
import Nav from '../../components/users/Nav';
import { Card } from 'react-bootstrap';


const PetInfo = () => {
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  const petName = params.get("petName");

  const [pet, setPet] = useState({});

  
  const [user, setUser] = useState({});

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      const user = users.find((user) => user.id === user.id);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



  const fetchPets = async () => {
    try {
      const pets = await getPets();
      const pet = pets.find((pet) => pet.name === petName);
      setPet(pet);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [petName]);

  
  const getAllPets = async () => {
    try {
      setLoading(true);
      setPets(await getPets());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  
  const adopt = async (pet) => {
    try {
      setLoading(true);
      fileForAdoption(pet).then((resp) => {
        getAllPets();
      });
      toast(<NotificationSuccess text="Filled for adoption succesfilly." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to file for adoption." />);
    } finally {
      setLoading(false);
    }
  };

  const triggerAdopt = (  reasonForAdoption, address, userPhoneNumber ) => {
    adopt({
      userId: user.id,
      reasonForAdoption,
      address,
      userPhoneNumber,
      petId: pet.id,
    });
  };

  return (
    <>
      {!loading ? (
        <>
          <Nav />
          <div className="flex justify-center bg-black">
            <img src={HUSKY1} alt={pet.name} className=" w-[450px] h-[300px]" />
          </div>

          <div className="pl-4 pt-3">
            <h1 className="text-blue-700">Pet Information</h1>
            <div className=" flex space-x-[200px]">
              <Card className="  w-[450px] pt-3 pb-3 pl-2 border border-blue-500">
                <div className="">
                  <div>
                    <h3>Name: {pet.name}</h3>
                    <h3>Age: {pet.age}</h3>
                    <h3>Breed: {pet.breed}</h3>
                    <h3>Health Status: {pet.healthStatus}</h3>
                    <h3>Description: {pet.description}</h3>
                    <h3>Adoption Status: {pet.status}</h3>
                  </div>
                </div>
              </Card>
              <Card className="  w-[350px] h-[100px] pt-3 pb-2 pl-2 relative ">
                <span className="text-center">
                  <h2>Consider Adopting</h2>
                  <h2 className="text-blue-500 text-[1.9rem]">{pet.name}</h2>
                </span>
                <div className=" absolute bottom-[5%] left-[10%] w-[100%]">
                  <Adopt adopt={triggerAdopt} />
                </div>
              </Card>
            </div>
            <footer>
              <p>&copy; 2021 Pet Adoption Shelter</p>
            </footer>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}




export default PetInfo
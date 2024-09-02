import React, { useEffect, useState, useCallback } from "react";

import {
  getPets as getPetList,
  getPetsNotAdopted,
} from "../../utils/petAdoption";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState(false);

  const { id, name } = pet;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  const fetchPets = async () => {
    try {
      const pets = await getPetList();
      const pet = pets.find((pet) => pet.id === pet.id);
      setPet(pet);
    } catch (error) {
      console.error(error);
    }
  };

  const getPetsNotAdopted = useCallback(async () => {
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
    fetchPets();
    getPetsNotAdopted();
  }, []);

  return (
    <div
      className=" relative w-[350px] h-[200px] text-center justify-center  pointer transition hover:border-2  hover:border-blue-500 group/item "
      onClick={() => {
        navigate(
          `/petInfo?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai&petName=${name}`
        );
      }}
    >
      <img src={HUSKY1} alt={pet.name} className=" w-full h-[100%] relative" />

      <div className=" absolute top-[35%] left-[35%] text-white hidden group-hover/item:block group-hover:transition ease-in-out duration-300 group-hover:scale-110 pointer">
        <h1>{pet.name}</h1>
      </div>
    </div>
  );
};

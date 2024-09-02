import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import HUSKY1 from "../../assets/img/HUSKY1.png";
import { useNavigate } from "react-router-dom";

const Pet = ({ pet }) => {
  const { id, name } = pet;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

  

  return (
    <div
      className=" relative w-[350px] text-center justify-center  pointer transition hover:border-2  hover:border-blue-500 group/item "
      onClick={() => {
        navigate(
          `/petInfo?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai&petName=${name}`
        );
      }}
    >
      <img src={HUSKY1} alt={name} className=" w-full relative" />

      <div className="  pointer">
        <h1>{name}</h1>
      </div>
    </div>
  );
};

Pet.propTypes = {
  pet: PropTypes.object.isRequired,
};

export default Pet;

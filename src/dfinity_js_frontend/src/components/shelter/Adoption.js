import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

import CompleteAdoption from "./buttons/CompleteAdoption";
import RejectAdoption from "./buttons/faiDoption";

const AdoptionInfo = ({ adoption, complete, fail }) => {
  const {
    adoptionId,
    petId,
    petName,
    userName,
    userPhoneNumber,
    address,
    reasonForAdoption,
    status,
  } = adoption;

  const triggerComplete = () => {
    complete(adoptionId);
  };

  const triggerFail = () => {
    fail(adoptionId);
  };

  return (
    <Card>
      <div>
        <h1>Adoption Information</h1>
        <span>
          <p>Adoption ID: {adoptionId}</p>
          <p>Pet ID: {petId}</p>
          <p>Pet Name: {petName}</p>
          <p>User Name: {userName}</p>
          <p>User Phone Number: {userPhoneNumber}</p>
          <p>Address: {address}</p>
          <p>Reason for Adoption: {reasonForAdoption}</p>
          <p>Status: {status}</p>
        </span>
      </div>
      <div className=" flex space-x-3">
        <CompleteAdoption complete={triggerComplete} />
        <RejectAdoption fail={triggerFail} />
      </div>
    </Card>
  );
};

AdoptionInfo.propTypes = {
  adoption: PropTypes.object.isRequired,
};

export default AdoptionInfo;

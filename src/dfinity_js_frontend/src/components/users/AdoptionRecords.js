import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

import { NotificationError, NotificationSuccess } from "../utils/Notifications";

import UpdateApplication from "./UpdateAdoptionApplication";

const AdoptionApplication = ({ adoption, update }) => {
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

  const triggerUpdate = (
    userName,
    userPhoneNumber,
    address,
    reasonForAdoption
  ) => {
    update({
      id: adoptionId,
      userName,
      userPhoneNumber,
      address,
      reasonForAdoption,
    });
  };

  return (
    <div>
      <div>
        <h1>Adoption Information</h1>
        <Card>
          <p>Adoption ID: {adoptionId}</p>
          <p>Pet ID: {petId}</p>
          <p>Pet Name: {petName}</p>
          <p>User Name: {userName}</p>
          <p>User Phone Number: {userPhoneNumber}</p>
          <p>Address: {address}</p>
          <p>Reason for Adoption: {reasonForAdoption}</p>
          <p>Status: {status}</p>
          <UpdateApplication update={triggerUpdate} />
        </Card>
      </div>
      <div></div>
    </div>
  );
};

export default AdoptionApplication;

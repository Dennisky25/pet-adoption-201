import React from "react";
import PropTypes from "prop-types";
import { Card, Col  } from "react-bootstrap";
import UpdateAppointment from "../shelter/Update";

const Appointment = ({ appointmentInfo, update }) => {
  const { appointmentId, serviceId, serviceName, professionalName, time } = appointmentInfo;

  const triggerUpdate = (serviceName, time) => {
    update({
      serviceName,
      time,
      id: appointmentId,
    });
  };

  return (
    <Col className="">
      <Card className=" position-relative">
        <Card.Body>
          <>
            <span className="text-blue-700">
              Service ID:
              <p className="text-black">{serviceId}</p>
            </span>
            <span className="text-blue-700 flex space-x-3">
              Service Name:
              <p className="text-black">{time}</p>
            </span>
            <span className="text-blue-700 flex space-x-3">
              Professional Name:
              <p className="text-black">{professionalName}</p>
            </span>
            <span className="text-blue-700 flex space-x-3">
              Time:
              <p className="text-black">{serviceName}</p>
            </span>
          </>
          <UpdateAppointment update={triggerUpdate} />
        </Card.Body>
      </Card>
    </Col>
  );
};

Appointment.propTypes = {
  appointmentInfo: PropTypes.object.isRequired,
};

export default Appointment;

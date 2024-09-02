import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateApplication = ({ update }) => {
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [reasonForAdoption, setReasonForAdoption] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => userName && userPhoneNumber && address;

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="">
        UpdateApplication
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>UpdateApplication</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputUserName"
              label="User Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="Enter user name"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputUserPhoneNumber"
              label="User Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setUserPhoneNumber(e.target.value);
                }}
                placeholder="Enter user phone number"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputAddress"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Enter address"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputReasonForAdoption"
              label="Reason For Adoption"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setReasonForAdoption(e.target.value);
                }}
                placeholder="Enter reason for adoption"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="dark"
              disabled={!isFormFilled()}
              onClick={() => {
                update({
                  userName,
                  userPhoneNumber,
                  address,
                  reasonForAdoption,
                });
                handleClose();
              }}
            >
              UpdateApplication
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

UpdateApplication.propTypes = {
    update: PropTypes.func.isRequired,
};
export default UpdateApplication;

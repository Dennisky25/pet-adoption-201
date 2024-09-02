import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const Adopt = ({ adopt }) => {
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [reasonForAdoption, setReasonForAdoption] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => userPhoneNumber && address && reasonForAdoption;

  return (
    <>
      <Button
        onClick={handleShow}
        className=" w-[80%] transition duration-150 ease-in-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 hover:scale-110 rounded"
      >
        Adopt
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adopt</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
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
              label="Reason for Adoption"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
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
                adopt(userPhoneNumber, address, reasonForAdoption);
                handleClose();
                console.log("Data sent to adopt function", {
                  userPhoneNumber,
                  address,
                  reasonForAdoption,
                });
              }}
            >
              Adopt
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

Adopt.propTypes = {
  adopt: PropTypes.func.isRequired,
};
export default Adopt;

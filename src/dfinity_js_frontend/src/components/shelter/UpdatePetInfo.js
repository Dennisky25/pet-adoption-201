import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdatePetInfo = ({ update }) => {
  const [healthStatus, setHealthStatus] = useState("");
  const [age, setAge] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => healthStatus && age;

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="">
        Update PetInfo
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>UpdatePetInfo</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputHealthStatus"
              label="Health Status"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setHealthStatus(e.target.value);
                }}
                placeholder="Enter health status"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputAge"
              label="Age"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                placeholder="Enter age"
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
                    healthStatus,
                    age,
                });
                handleClose();
              }}
            >
              UpdatePetInfo
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};


export default UpdatePetInfo;

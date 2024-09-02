import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const shelter = ({ save }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const isFormFilled = () => name && description && price;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        className=" bg-black text-white "
       
      >
        <i className="bi bi-plus"></i>
        <span className=" fs-6"> Add Service</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="Service name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name of service"
              />
            </FloatingLabel>
            <FloatingLabel
            controlId="inputDescription"
            label="Description"
            className="mb-3"
          >
            <Form.Control
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter description of service"
          />
          </FloatingLabel>
            <FloatingLabel controlId="inputPrice" label="Price" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (isFormFilled()) {
                  save({ name, description, price });
                  handleClose();
                }
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

shelter.propTypes = {
  save: PropTypes.func.isRequired,
};

export default shelter;

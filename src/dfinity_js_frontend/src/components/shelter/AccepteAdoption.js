import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const Accept = ({ complete }) => {
  const [petId, setPetId] = useState("");
  const isFormFilled = () => petId;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className=" bg-black text-white ">
        <i className="bi bi-plus"></i>
        <span className=" fs-6"> Accept</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Body>
            <h4>Accept Adoption</h4>
            <FloatingLabel
              controlId="inputPetId"
              label="Pet ID"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setPetId(e.target.value);
                }}
                placeholder="Enter Pet ID"
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
                 complete({
                    petId,
                  });
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

Accept.propTypes = {
  complete: PropTypes.func.isRequired,
};

export default Accept;

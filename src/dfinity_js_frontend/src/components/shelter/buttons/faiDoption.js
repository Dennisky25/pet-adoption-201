import React from "react";
import { Button } from "react-bootstrap";

const RejectAdoption = ({ fail }) => {
  return (
    <Button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 "
      onClick={fail}
    >
    Reject
    </Button>
  );
};

export default RejectAdoption;

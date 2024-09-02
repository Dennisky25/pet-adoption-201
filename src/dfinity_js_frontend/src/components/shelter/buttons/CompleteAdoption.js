import React from "react";
import { Button } from "react-bootstrap";

const CompleteAdoption = ({complete}) => {

  return (
    <Button
     
     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 "
      onClick={
       complete
        
      }
    >
     Complete
    </Button>
  );
};

export default CompleteAdoption;

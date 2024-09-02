import React, { useState } from "react";
import { addUser } from "../../utils/petAdoption";

const UserProfile = ({ fetchUser }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        name,
        phoneNumber,
        email,
        address,
      };
      await addUser(user).then(() => {
        console.log("User added successfully");
        fetchUser();
      });
    } catch (error) {
     // console.log(error);
    }
  };
  return (
    <div className=" bg-slate-200 fixed flex justify-center items-center w-full h-[100%]">
      <div className=" w-[50%] border-4 border-black p-2 pl-2">
        <h1 className="text-center">Sign up as User</h1>
        <form>
          <div className=" flex flex-col text-[1.2rem] pb-2 space-y-2 relative">
            <label>Name</label>
            <input
              type="text"
              value={name}
              className=" w-[90%]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" flex flex-col text-[1.2rem] pb-2 space-y-2">
            <label>Phone Number</label>
            <input
              type="number"
              value={phoneNumber}
              className=" w-[90%]"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className=" flex flex-col text-[1.2rem] pb-2 space-y-2">
            <label>Email</label>
            <input
              type="email"
              value={email}
              className=" w-[90%]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" flex flex-col text-[1.2rem] pb-2 space-y-2">
            <label>Address</label>
            <input
              type="text"
              value={address}
              className=" w-[90%]"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
         
            
            onClick={handleSubmit}
            className="bg-blue-700 text-white  pt-2 pb-2 pl-3 pr-3"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;

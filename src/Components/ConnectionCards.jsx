import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAConnection } from "../Utils/Connectionslice";

const ConnectionCards = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, skills, photoUrl } =
    user;
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);
  const removeUSer = async (_id) => {
    try {
      const res = await axios.post(
        "http://localhost:7777/user/remove/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeAConnection(_id));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {}
  };
  return (
    <div className=" p-2.5 ">
      <div className="card card-side bg-base-200 shadow-md">
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p className="text-[15px]">{age + " , " + gender}</p>
          <p className=" text-[15px]">{about}</p>
          <p className=" font-medium text-[15px]">
            Skills :{" "}
            {skills?.map((skill) => skill).join(",") || "No skills listed"}
          </p>
          <button
            className=" btn bg-red-500 mt-1 text-[16px] w-24"
            onClick={() => removeUSer(_id)}
          >
            Remove
          </button>
        </div>
        <img
          className=" w-44 h-44 p-2 rounded-2xl"
          src={photoUrl}
          alt={firstName + " " + "photo"}
        />
        {toast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span className=" font-bold">
                Profile updated succefully.Explore feed page
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionCards;

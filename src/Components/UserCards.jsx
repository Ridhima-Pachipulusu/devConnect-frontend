import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeExploredFeed } from "../Utils/FeedSlice";

const UserCards = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();
  const loadFeed = async (status, _id) => {
    try {
      const res = await axios.post(
        "http://localhost:7777/request/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeExploredFeed(_id));
    } catch (err) {}
  };
  return (
    <div className="card bg-base-200 w-96 shadow-sm mx-auto my-20">
      <figure>
        <img className="w-52 mt-10" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <h3 className=" text-lg">{age + " " + gender}</h3>
        <p className="break-words overflow-hidden w-full text-[15px]">
          {about}
        </p>
        <h2 className=" font-medium ">
          Skills :
          {skills?.map((skill) => skill).join(",") || "No skills listed"}
        </h2>
        <div className="card-actions justify-center">
          <button
            className="btn bg-blue-500 "
            onClick={() => loadFeed("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn bg-pink-400"
            onClick={() => loadFeed("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCards;

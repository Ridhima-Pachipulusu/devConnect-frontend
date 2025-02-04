import React from "react";

const UserCards = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  return (
    <div className="card bg-base-200 w-96 shadow-sm mx-auto my-20">
      <figure>
        <img className="w-52 mt-10" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <h3 className=" text-lg">{age + " " + gender}</h3>
        <p className="break-words overflow-hidden w-full">{about}</p>
        <h2>
          <span className=" font-bold">Skills :</span>
          {skills?.map((skill) => skill).join(",") || "No skills listed"}
        </h2>
        <div className="card-actions justify-center">
          <button className="btn bg-blue-500 ">Ignore</button>
          <button className="btn bg-pink-400">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCards;

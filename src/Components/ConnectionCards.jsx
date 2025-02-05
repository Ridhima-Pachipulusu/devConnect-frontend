import React from 'react'

const ConnectionCards = ({user}) => {
    const {firstName,lastName,age,gender,about,skills,photoUrl}=user;
  return (
    <div className=" p-2.5 ">
      <div className="card card-side bg-base-200 shadow-md">
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p className="text-[15px]">{age + " , " + gender}</p>
          <p className=" text-[15px]">{about}</p>
          <p className=' font-medium text-[15px]'>
            Skills :{" "}
            {skills?.map((skill) => skill).join(",") || "No skills listed"}
          </p>
        </div>
        <img
          className=" w-44 h-44 p-2 rounded-2xl"
          src={photoUrl}
          alt={firstName + " " + "photo"}
        />
      </div>
    </div>
  );
}

export default ConnectionCards
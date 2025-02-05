import React from "react";

const RequestCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, skills, about } = user;
  return (
    <div className=" flex justify-center mt-5">
      <div className="list bg-base-200 rounded-box shadow-md w-[700px]">
        <div className="list-row">
          <div className=" flex">
            <img className="size-24 rounded-box" src={photoUrl} />
            <div className="ml-10">
              <div className=" text-xl">{firstName + " " + lastName}</div>
              <div className="text-xs uppercase font-semibold opacity-60 text-[14px]">
                {age + " " + gender}
              </div>
              <p className="list-col-wrap text-[14px] mt-2">{about}</p>
              <p className=" font-medium mt-2">Skills : {skills.map((skill)=>skill).join(" , ")}</p>
            </div>
          </div>
          <div className="mt-3 ml-20">
            <div>
              <button
                className="btn btn-square btn-ghost bg-green-500 w-20
           "
              >
                Accept
              </button>
            </div>
            <div>
              <button
                className="btn btn-square btn-ghost bg-red-500 w-20 mt-2
           "
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;

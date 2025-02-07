import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCards from "./UserCards";
import axios from "axios";
import { addUser } from "../Utils/UserSlice";
import { addFeed } from "../Utils/FeedSlice";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateHandler = async () => {
    try {
      const updateData = {
        firstName,
        lastName,
        photoUrl,
        gender,
        about,
        skills: skills.length ? skills : [],
      };
      if (age !== "" && !isNaN(age)) {
        updateData.age = Number(age);
      }
      const res = axios.patch(
        "http://localhost:7777/profile/edit",
        updateData,
        { withCredentials: true }
      );
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
      dispatch(addUser(res?.data));
    } catch (err) {}
  };
  const notNowHandler = async () => {
    try {
      const res = await axios.get("http://localhost:7777/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {}
  };
  return (
    <>
      <div className="flex justify-center items-center gap-10">
        <div className=" w-xl  ml-70">
          <div className="card card-border bg-base-300  shadow-md">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl">
                Update Profile
              </h2>
              <div className="flex gap-x-4">
                <div>
                  <label className=" text-md font-bold ">FirstName</label>
                  <input
                    className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label className=" text-md font-bold ">LastName</label>
                  <input
                    className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex gap-x-4 mt-1">
                <div>
                  <label className=" text-md font-bold">Age</label>
                  <input
                    className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label className=" text-md font-bold w-full">Gender</label>
                  <input
                    className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <label className=" text-md font-bold w-full">About</label>
                <textarea
                  className="w-full h-20 p-2.5 mt-1 border-black border shadow-md rounded-md resize-none overflow-hidden break-words"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className=" text-md font-bold w-full">PhotoUrl</label>
                <input
                  className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                ></input>
              </div>
              <div>
                <label className=" text-md font-bold w-full">Skills</label>
                <input
                  className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value.split(","))}
                ></input>
              </div>
              <div className="card-actions justify-center mt-2.5">
                <button className="btn btn-primary" onClick={updateHandler}>
                  Update
                </button>
                <button className="btn btn-primary" onClick={notNowHandler}>
                  Not Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCards
          user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span className=" font-bold">
              Profile updated succefully.Explore feed page
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;

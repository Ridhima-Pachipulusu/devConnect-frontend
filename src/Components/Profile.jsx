import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import axios from "axios";
import { addUser } from "../Utils/UserSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const user = useSelector((store) => store.User);
  const updateUser = async () => {
    try {
      const res = await axios.get(BASE_URL+"/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      setUserData(res.data);
    } catch (err) {
      if (err) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    updateUser();
  }, []);
  return (
    userData && (
      <div>
        <UpdateProfile user={userData} />
      </div>
    )
  );
};

export default Profile;

import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Nabar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/UserSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:7777/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      if(err.status===401)
      {
        navigate("/login");
        console.log(err);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;

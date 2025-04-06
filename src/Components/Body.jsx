import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Nabar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/UserSlice";
import { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      if (location.pathname === "/login") {
        navigate("/");
      }
    } catch (err) {
      if (err.response.status === 401) {
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

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/UserSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [emailId, setEmailId] = useState("ridhimapachipulusu27@gmail.com");
  const [password, setPassword] = useState("Ridhi@123");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const clickHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/")
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className=" flex items-center justify-center mt-36">
      <div className="card card-border bg-base-300 w-96 shadow-md">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <div className="mb-2.5 mt-2">
            <label className=" text-md font-bold w-full">Email ID</label>
            <input
              className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            ></input>
          </div>
          <div>
            <label className=" text-md font-bold w-full">Password</label>
            <input
              className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="card-actions justify-center mt-2.5">
            <button className="btn btn-primary" onClick={clickHandler}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

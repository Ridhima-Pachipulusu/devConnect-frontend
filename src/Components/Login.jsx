import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/UserSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [islogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.error || "Something went erong");
    }
  };

  const signUpHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/signup",
        { firstName, lastName, email: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setTimeout(() => {
        if (document.cookie.includes("token")) {
          navigate("/profile");
        }
      }, 300);
      setError(res.response.data || "Something went erong");
    } catch (err) {
      setError(err?.response?.data?.error || "Something went erong");
    }
  };
  return (
    <div className=" flex items-center justify-center mt-20">
      <div className="card card-border bg-base-300 w-96 shadow-md">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">
            {islogin ? "Log In" : "Sign Up"}
          </h2>
          {!islogin && (
            <>
              <div className="mb-2.5 mt-2">
                <label className=" text-md font-bold w-full">First Name</label>
                <input
                  className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div>
                <label className=" text-md font-bold w-full">Last Name</label>
                <input
                  className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </>
          )}
          <div>
            <label className=" text-md font-bold w-full">Email Id:</label>
            <input
              className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            ></input>
          </div>
          <div>
            <label className=" text-md font-bold w-full">Password</label>
            <input
              type="password"
              className=" w-full p-2.5 mt-1 border-black border shadow-md rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {error && <p className=" text-red-600">{error}</p>}
          <div className="card-actions justify-center mt-2.5">
            <button
              className="btn btn-primary"
              onClick={islogin ? clickHandler : signUpHandler}
            >
              {islogin ? "Login" : "signUp"}
            </button>
          </div>
          <p>
            {islogin ? "New to DevConnect?" : "Already a user?"}
            <span
              className="cursor-pointer text-blue-500"
              onClick={() => {
                setIsLogin((prev) => !prev);
                setError("");
              }}
            >
              {islogin ? "SignUp" : "Login"}
            </span>
            {islogin ? "" : "Now"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

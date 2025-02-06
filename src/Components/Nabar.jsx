import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Utils/UserSlice";
import { removeFeed } from "../Utils/FeedSlice";
import { removeConnections } from "../Utils/Connectionslice";
import { removeRequests } from "../Utils/RequestSlice";
import { useState } from "react";

const Navbar = () => {
  const selector = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const logoutHandler = async () => {
    try {
      axios.post("http://localhost:7777/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeRequests());
      navigate("/login");
    } catch (err) {}
  };
  const clickHandler = () => {
    if (!selector) {
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  };
  if (!document.cookie.includes("token")) {
    navigate("/login");
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl" onClick={clickHandler}>
          DC🔗
        </Link>
      </div>

      {selector && (
        <div className=" flex">
          <div className=" mt-1.5 mr-2">
            <Link
              to="/"
              className=" mt-1.5 mr-2.5 text-[18px] text-fuchsia-700"
            >
              Feed
            </Link>
            <Link
              to="/requests "
              className=" mt-1.5 mr-2.5 text-[18px] text-violet-800"
            >
              Requests
            </Link>
            <Link
              to="/connections "
              className=" mt-1.5 mr-2.5 text-[18px] text-violet-800"
            >
              Connections
            </Link>
          </div>
          <div className="dropdown dropdown-end flex">
            <p className=" mt-2 mr-1">Welcome back! {selector.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn w-10 btn-circle btn-ghost avatar mr-3"
            >
              <div className=" rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span className=" font-bold">Please Login/Signup</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;

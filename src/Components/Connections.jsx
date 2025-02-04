import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addConnections } from "../Utils/Connectionslice";

const Connections = () => {
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7777/user/acceptedConnections",
        { withCredentials: true }
      );
      dispatch(addConnections(res?.data.data));
    } catch (err) {}
    useEffect(() => {
      fetchConnections();
    }, []);
  };
  return <div>Connections</div>;
};

export default Connections;

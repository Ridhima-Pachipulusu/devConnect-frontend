import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/Connectionslice";
import ConnectionCards from "./ConnectionCards";

const Connections = () => {
  const dispatch = useDispatch();
  const connections=useSelector((store)=>store.connections)
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7777/user/acceptedConnections",
        { withCredentials: true }
      );
      console.log(res?.data.data)
      dispatch(addConnections(res?.data.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if(!connections) return;
  if(connections.length===0) return <h1>No connections found explore Feed page to make new connections :)</h1>
  return (
    connections && (
      <div>
        <h2 className="text-center font-bold mt-10 text-2xl">
          Your Connections
        </h2>
        <div className="grid grid-cols-2 gap-4 p-4">
          {connections.map((connect) => (
            <ConnectionCards user={connect} />
          ))}
        </div>
      </div>
    )
  );
};

export default Connections;

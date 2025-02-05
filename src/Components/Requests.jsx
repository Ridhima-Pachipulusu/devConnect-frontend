import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../Utils/RequestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7777/user/connections/received",
        { withCredentials: true }
      );
      console.log(res?.data?.data);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="flex justify-center mt-7 text-xl font-bold">
        No pending requests!!!!!!!
      </h1>
    );
  return (
    <div>
      <h1 className=" flex justify-center font-bold text-2xl mt-7">
        Received Requests
      </h1>
      <div>
        {requests.map((request) => (
          <RequestCard user={request.fromUserId} />
        ))}
      </div>
    </div>
  );
};

export default Requests;

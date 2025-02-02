import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/FeedSlice";
import axios from "axios";
import UserCards from "./UserCards";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.Feed);
  console.log(feed)
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get("http://localhost:7777/user/feed", {
        withCredentials:true
      });
      dispatch(addFeed(res?.data));
    } catch (err) {}
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div>
      {feed && (<div>
        <UserCards user={feed[0]}/>
      </div>)}
    </div>
  );
};

export default Feed;

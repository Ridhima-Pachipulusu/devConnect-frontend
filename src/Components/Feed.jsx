import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "../Utils/FeedSlice";
const Feed = () => {
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const res = await axios.get("http://localhost:7777/user/feed", {
        withcredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {}
  };
  useEffect(() => {
    getFeed();
  }, []);
  return <div>Feed</div>;
};

export default Feed;

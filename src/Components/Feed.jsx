import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/FeedSlice";
import axios from "axios";
import UserCards from "./UserCards";
import { BASE_URL } from "../Utils/constants";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.Feed);
  console.log(feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL+"/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {}
  };
  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);
  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className=" flex justify-center font-bold text-2xl mt-5">
        No new users found
      </h1>
    );
  return (
    <>
      <div>
        {feed && (
          <div>
            <UserCards user={feed[0]} />
          </div>
        )}
      </div>

    </>
  );
};

export default Feed;

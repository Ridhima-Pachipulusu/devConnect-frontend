import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import connection from "../Utils/Socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Utils/constants";

const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [online, setOnline] = useState(false);
  const user = useSelector((store) => store.User);
  const userId = user?._id;
  const fetchChatData = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + toUserId, {
      withCredentials: true,
    });
    console.log(chat?.data?.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      const getTimeAgo = (createdAt) => {
        return new Date(createdAt).toLocaleDateString();
      };
      console.log(msg?.message);
      return {
        firstName: msg?.senderId?.firstName,
        newMessage: msg?.message,
        time: getTimeAgo(msg.createdAt),
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatData();
  }, []);
  console.log(online);
  useEffect(() => {
    if (!user) return;
    const socket = connection();
    socket.emit("user-online", userId);
    socket.emit("watch-user-status", toUserId);
    socket.on("user-status", (data) => {
      if (data.userId == toUserId) {
        setOnline(data.online);
      }
      socket.emit("joinChat", { firstName: user?.firstName, userId, toUserId });
      socket.on("messageReceived", ({ firstName, newMessage }) => {
        setMessages((messages) => [...messages, { firstName, newMessage }]);
      });
    });
    return () => {
      socket.disconnect();
      socket.off("user-status");
    };
  }, [userId, toUserId]);
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = connection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      toUserId,
      newMessage,
    });
    setNewMessage("");
  };
  return (
    <div className="w-1/2 mx-auto border-2 border-solid border-gray-400 h-[80vh] m-5  rounded-xl flex flex-col shadow-md">
      <div className="border-b-2 border-gray-400 p-3 text-[18px] flex">
        <h1>chat</h1>
        <div className="inline-grid *:[grid-area:1/1] mt-[10px] ml-2">
          <div
            className={
              "status " +
              (online
                ? "status-success animate-ping"
                : "status-error animate-ping")
            }
          ></div>
          <div
            className={"status " + (online ? "status-success" : "status-error")}
          ></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll p-5">
        {messages &&
          messages.map((msg) => {
            return (
              <>
                <div
                  className={
                    "chat " +
                    (user.firstName === msg.firstName
                      ? "chat-end"
                      : "chat-start")
                  }
                >
                  <div className="chat-header">
                    {msg.firstName}
                    <time className="text-xs opacity-50">{msg.time}</time>
                  </div>
                  <div className="chat-bubble">{msg.newMessage}</div>
                  <div className="chat-footer opacity-50"></div>
                </div>
              </>
            );
          })}
      </div>
      <div className=" p-4 border-t border-gray-700 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border-2 rounded-xl border-gray-400"
        ></input>
        <button className=" btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

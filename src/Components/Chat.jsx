import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import connection from "../Utils/Socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { toUserId } = useParams();
  const [messages, setMessages] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.User);
  const userId = user?._id;
  useEffect(() => {
    if(!user) return;
    const socket = connection();
    socket.emit("joinChat", { firstName: user?.firstName, userId, toUserId });
    socket.emit("messageReceived", ({ newMessage }) => {
      setMessages(newMessage);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId,toUserId]);
  const sendMessage = () => {
    const socket=connection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      toUserId,
      newMessage,
    });
  };
  return (
    <div className="w-1/2 mx-auto border-2 border-solid border-gray-400 h-[80vh] m-5 rounded-xl flex flex-col shadow-md">
      <h1 className="border-b-2 border-gray-400 p-3 text-[18px] ">Chat</h1>
      <div className="flex-1 overflow-y-scroll p-5">
        {
          messages.map((msg) => {
            return (
              <>
                <div className="chat chat-start">
                  <div className="chat-header">
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">2 hours ago</time>
                  </div>
                  <div className="chat-bubble">{msg}</div>
                  <div className="chat-footer opacity-50">Seen</div>
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
        <button className=" btn btn-primary" onClick={sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

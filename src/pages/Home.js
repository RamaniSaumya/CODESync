import React, { useState } from "react";
import { motion } from "framer-motion";
// import { CiRoute } from "react-icons/ci";
import { v4 as uuidV4 } from "uuid";
// import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Changed from Navigate to useNavigate
// import "./Homestyle.css";

const Home = () => {
  const navigate = useNavigate(); // Changed from Navigate to useNavigate
  const [roomId, setRoomId] = useState(""); // Initialize with an empty string
  const [userName, setuserName] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    console.log("new room id created is " + id);
    toast.success("Room created successfully");
    console.log("success");
  };

  const joinRoom = () => {

    console.log(userName)
    if (!roomId && !userName) {
      toast.error("Room Id and userName can't be empty");
      return;
    } else if (!userName) {
      toast.error("userName can't be empty");
      return;
    } else if (!roomId) {
      toast.error("RoomId can't be empty");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };

  const enterkeypressed = (e) => {
    console.log(e.code);
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        {/* <CiRoute  className="logo"/> */}
        <motion.div
          animate={{ x: [170, 180, 180, 170] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          // style={{ fontSize: '24px', padding: '20px', backgroundColor: '#0073e6', color: 'white', borderRadius: '10px' }}
        >
          <img className="logo" src="/logo192.png" alt="image" />
        </motion.div>
        <h4 className="mainLabel">Paste Invite room id</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            onChange={(e) => setRoomId(e.target.value)}
            placeholder={"Please enter the valid Room Id"}
            value={roomId}
            onKeyUp={enterkeypressed}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="userName"
            onChange={(e) => setuserName(e.target.value)}
            value={userName}
            onKeyUp={enterkeypressed}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If not, please create&nbsp;
            <a onClick={createNewRoom} className="newroom" href="#">
              new Room
            </a>
          </span>
        </div>
      </div>

      <footer>
        <h5>
          Built by <a href="https://github.com/RamaniSaumya">Saumya Ramani</a>
        </h5>
      </footer>
    </div>
  );
};

export default Home;

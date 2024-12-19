import React, { useState, useRef, useEffect } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import initSocket from "../socket";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import ACTIONS from "../Action";
import toast from "react-hot-toast";
import Header from "../Header";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(" Room Id copied successfully");
    } catch (err) {
      toast.error("could not copy the Room ID");
    }
  }

  function leaveRoom() {
    reactNavigator("/");
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", handleErrors);
      socketRef.current.on("connect_failed", handleErrors);

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.userName,
      });

      // listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.userName) {
          toast.success(`${username} joined`);
          console.log(`${username} joined`);
        }
        setClients(clients);

        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });
      });

      // after disconnecting
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);

        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [location.state, reactNavigator, roomId]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <Header/>
      <div className="aside">
        <div className="asideInner">
          <div>
            <div className="logo">
              <img
                className="logoImage"
                src="/logo192.png"
                alt="logo of the website"
              />
            </div>
            <h3>Connected <span style={{ color: 'orange' }}>CODERS</span></h3>
            <div className="clientsList">
              {clients.filter((_, index) => index % 2 !== 0).map((client) => (
                <Client username={client.username} key={client.socketId} />
              ))}
            </div>
          </div>
          <div className="btnGroup">
            <button className="btn copyBtn" onClick={copyRoomId}>
              Copy ROOM ID
            </button>
            <button className="btn leaveBtn" onClick={leaveRoom}>
              Leave
            </button>
          </div>
        </div>
      </div>
      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;

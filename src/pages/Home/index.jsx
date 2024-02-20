import React, { useRef } from "react";
import UploadFile from "../../components/UploadFile";
import Player from "../../components/Player";
import Playlist from "../../components/Playlist";
import "./index.css";
import AudioContextProvider from "../../context/AudioContextProvider";

const Home = () => {
const audioRef = useRef();
const progressbarRef = useRef();
  return (
    <main className="main-home">
      <AudioContextProvider>
        <UploadFile />
        <Player audioRef={audioRef} progressbarRef={progressbarRef}/>
        <Playlist audioRef={audioRef}/>
      </AudioContextProvider>
    </main>
  );
};

export default Home;

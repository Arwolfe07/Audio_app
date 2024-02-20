import React, { useContext } from "react";
import "./index.css";
import AudioContext from "../../context/AudioContext";

const UploadFile = () => {
  const { audioFiles, setAudioFiles, setCurrentTrack } = useContext(AudioContext);
  const audioChangeHandler = (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    const newAudioFiles = [...audioFiles, { name: file.name, url: fileURL }];
    setAudioFiles(newAudioFiles);
    if(!localStorage.getItem("lastAudio")){
        localStorage.setItem('lastAudio', 0);
        localStorage.setItem('lastPos', 0);
        setCurrentTrack(0);
    }
    localStorage.setItem("audioFiles", JSON.stringify(newAudioFiles));
  };
  return (
    <section className="upload-section">
      <h1 className="upload-heading">
        Create your own <span>Playlist</span>
      </h1>
      <input
        type="file"
        className="upload-btn"
        onChange={audioChangeHandler}
        accept="audio/*"
      />
    </section>
  );
};

export default UploadFile;

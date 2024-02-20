import React, { useContext, useEffect } from "react";
import "./index.css";
import AudioContext from "../../context/AudioContext";
import { IoPlay, IoPause } from "react-icons/io5";
import { FaTrashArrowUp } from "react-icons/fa6";

const Playlist = ({ audioRef }) => {
  const {
    audioFiles,
    setCurrentTrack,
    setIsPlaying,
    currentTrack,
    isPlaying,
    setAudioFiles,
    setDuration,
    setTimeProgress,
  } = useContext(AudioContext);
  useEffect(() => {
    const lastAudio = localStorage.getItem("lastAudio");
    const lastPos = localStorage.getItem("lastPos");
    if (lastAudio) {
      setCurrentTrack(lastAudio);
      audioRef.current.currentTime = lastPos;
      setTimeProgress(lastPos);
    }
  }, []);

  const playTrackHandler = (ind) => {
    // const player = document.getElementById("audioPlay");

    localStorage.setItem("lastAudio", ind);
    setCurrentTrack(ind);
    localStorage.setItem("lastPos", 0);
    audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const clearPlaylistHandler = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
    setAudioFiles([]);
    setDuration(0);
    audioRef.current.pause();
    localStorage.clear();
  };

  return (
    <section className="playlist-section">
      <h1 className="playlist-heading">
        Your <span>Playlist</span>
      </h1>
      <div className="playlist-audioFiles">
        {audioFiles.length > 0 ? (
          audioFiles.map((item, index) => (
            <div key={index} className="playlist-audios">
              {currentTrack === index && isPlaying ? (
                <IoPause
                  className="playlist-play"
                  onClick={() => {
                    audioRef.current.pause();
                    setIsPlaying(!isPlaying);
                  }}
                />
              ) : (
                <IoPlay
                  className="playlist-play"
                  onClick={() => playTrackHandler(index)}
                />
              )}
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p className="playlist-nofile">No audio files detected</p>
        )}
      </div>
      {audioFiles.length > 0 && (
        <FaTrashArrowUp className="del" onClick={clearPlaylistHandler} />
      )}
    </section>
  );
};

export default Playlist;

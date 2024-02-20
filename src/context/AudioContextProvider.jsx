import { useState } from "react";
import AudioContext from "./AudioContext";
const AudioContextProvider = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState(() => {
    const storedAudioFiles = localStorage.getItem("audioFiles");
    return storedAudioFiles ? JSON.parse(storedAudioFiles) : [];
  });
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  return (
    <AudioContext.Provider
      value={{
        audioFiles,
        setAudioFiles,
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        timeProgress,
        setTimeProgress,
        duration,
        setDuration,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContextProvider;

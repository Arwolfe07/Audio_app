import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";
import AudioContext from "../../context/AudioContext";
import "./index.css";
import formatTime from "../../hooks/useFormatTime";

const Player = ({ audioRef, progressbarRef }) => {
  const {
    audioFiles,
    currentTrack,
    isPlaying,
    setIsPlaying,
    duration,
    timeProgress,
    setDuration,
    setTimeProgress,
    setCurrentTrack,
  } = useContext(AudioContext);
  const playAnimationRef = useRef();
  const repeat = useCallback(() => {
    playAnimationRef.current = requestAnimationFrame(repeat);
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressbarRef.current.value = currentTime;
    progressbarRef.current.style.setProperty(
      "--range-progress",
      `${(progressbarRef.current.value / duration) * 100}%`
    );
    localStorage.setItem("lastPos", currentTime);
  }, [audioRef, duration, progressbarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current.pause();
      //   cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, repeat]);
  const playPauseHandler = () => {
    if (audioFiles.length == 0) {
      alert("No Audio files");
      return;
    }
    setIsPlaying((prevState) => {
      if (!prevState) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      return !prevState;
    });
  };

  useEffect(() => {
    if (currentTrack) {
      // Check if the player is already playing
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  const progressChangeHandler = () => {
    audioRef.current.currentTime = progressbarRef.current.value;
  };
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressbarRef.current.max = seconds;
    progressbarRef.current.value = audioRef.current.currentTime;
  };
  const nextAudioHandler = () => {
    if (currentTrack >= audioFiles.length - 1) {
      // setTrackIndex(0);
      setCurrentTrack(0);
    } else {
      // setTrackIndex((prev) => prev + 1);
      setCurrentTrack((prevTrack) => prevTrack + 1);
    }
  };
  const prevAudioHandler = () => {
    if (currentTrack === 0) {
      // setTrackIndex(0);
      setCurrentTrack(audioFiles.length - 1);
    } else {
      // setTrackIndex((prev) => prev + 1);
      setCurrentTrack((prevTrack) => prevTrack - 1);
    }
  };
  const forwardHandler = () => {
    audioRef.current.currentTime += 15;
  };
  const backwardHandler = () => {
    audioRef.current.currentTime -= 15;
  };

  const endHandler = () => {
    nextAudioHandler();
  };

  return (
    <section className="player-section">
      <div className="player-img" />
      <div className="player-controls">
        <IoPlayBackSharp onClick={prevAudioHandler} />
        <IoPlaySkipBackSharp onClick={backwardHandler} />
        <div onClick={playPauseHandler}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </div>
        <IoPlaySkipForwardSharp onClick={forwardHandler} />
        <IoPlayForwardSharp onClick={nextAudioHandler} />
      </div>
      <audio
        id="audioPlay"
        src={audioFiles[currentTrack]?.url}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={endHandler}
      ></audio>
      <div className="player-progress">
        <span className="time current">{formatTime(timeProgress)}</span>
        <input
          type="range"
          ref={progressbarRef}
          defaultValue="0"
          onChange={progressChangeHandler}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>
    </section>
  );
};

export default Player;

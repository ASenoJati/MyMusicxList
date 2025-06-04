import React from "react";
import { formatTime } from "../../utils/formatTime";
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";

const MusicControlBar = ({
  onToggleShuffle,
  onPrev,
  isShuffle,
  onPlayPause,
  isPlaying,
  currentTime,
  duration,
  onSeekChange,
  onNext,
  onToggleRepeat,
  isRepeat,
}) => {
  return (
    <div className="flex flex-col items-center w-1/2">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleShuffle}
          className={`p-2 rounded ${
            isShuffle ? "bg-green-600" : "bg-gray-700"
          } hover:bg-gray-600 cursor-pointer`}
          title="Shuffle"
        >
          <Shuffle className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={onPrev}
          className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
          title="Previous"
        >
          <SkipBack className="w-5 h-5 text-white" />
        </button>

        <button onClick={onPlayPause} className="cursor-pointer">
          {isPlaying ? (
            <Pause className="w-10 h-10" />
          ) : (
            <Play className="w-10 h-10" />
          )}
        </button>

        <button
          onClick={onNext}
          className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
          title="Next"
        >
          <SkipForward className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={onToggleRepeat}
          className={`p-2 rounded ${
            isRepeat ? "bg-green-600" : "bg-gray-700 "
          } hover:bg-gray-600 cursor-pointer`}
          title="Repeat"
        >
          <Repeat className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="flex items-center gap-2 w-full mt-2">
        <span className="text-sm w-12 text-right cursor-default">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={onSeekChange}
          className="flex-1 cursor-pointer"
        />
        <span className="text-sm w-12 cursor-default">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default MusicControlBar;

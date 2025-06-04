import { Pause, Play, Trash } from "lucide-react";
import React from "react";

const MusicAction = ({ musicId, onPlay, isCurrent, isPlaying, onDelete }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg bg-white/30 dark:bg-gray-800/30 opacity-0 group-hover:opacity-100 transition">
      <button
        className="bg-green-500 p-4 rounded-full shadow-lg cursor-pointer"
        onClick={() => onPlay(musicId)}
      >
        {isCurrent && isPlaying ? (
          <Pause className="text-white w-6 h-6" />
        ) : (
          <Play className="text-white w-6 h-6" />
        )}
      </button>

      <button
        className="bg-red-700 p-4 rounded-full shadow-lg ml-3 cursor-pointer"
        onClick={() => onDelete(musicId)}
      >
        <Trash className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

export default MusicAction;

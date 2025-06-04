import { Volume2 } from "lucide-react";
import React from "react";

const MusicControlVolume = ({ volume, onVolumeChange }) => {
  return (
    <div className="flex items-center gap-4">
      <Volume2 className="w-5 h-5" />
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        className="cursor-pointer"
      />
    </div>
  );
};

export default MusicControlVolume;

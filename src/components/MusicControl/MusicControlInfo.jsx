import React from "react";

const MusicControlInfo = ({ musicCover, musicTitle, musicalGroup }) => {
  return (
    <div className="flex items-center gap-4">
      <img src={musicCover} alt="Cover" className="w-14 h-14 rounded" />
      <div>
        <div className="font-semibold">{musicTitle}</div>
        <div className="text-sm text-gray-400">{musicalGroup}</div>
      </div>
    </div>
  );
};

export default MusicControlInfo;

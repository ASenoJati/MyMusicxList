import React from "react";

const MusicTitle = ({ musicId, musicTitle, musicalGroup, isCurrent }) => {
  return (
    <>
      {musicId && isCurrent ? (
        <div className="p-2 text-md font-semibold text-[#1ed760]">
          {musicTitle}{" "}
          <span className="font-light text-sm">{musicalGroup}</span>
        </div>
      ) : (
        <div className="p-2 text-md font-semibold">
          {musicTitle}{" "}
          <span className="font-light text-sm">{musicalGroup}</span>
        </div>
      )}
    </>
  );
};

export default MusicTitle;

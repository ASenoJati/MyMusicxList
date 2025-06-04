import React from "react";

const PlayingView = ({ music }) => {
  return (
    <div className="w-[25%] px-1 pt-2">
      <div
        className={`w-full h-[74vh] bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-y-auto scroll-custom scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700`}
      >
        {music ? (
          <>
            <div className="relative rounded-lg overflow-hidden group">
              <img
                src={music.musicCover}
                alt="cover"
                className="w-full h-full object-cover"
              />
              <div className="relative z-20 p-2">
                <div className="text-2xl font-semibold text-[#1ed760] drop-shadow-lg">
                  {music.title}
                </div>
                <div className="text-sm font-light text-[#1ed760] drop-shadow-sm">
                  {music.musicalGroup}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-10">
            <p className="text-center">No Music Play</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayingView;

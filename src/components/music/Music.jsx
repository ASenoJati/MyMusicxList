import { Pause, Play, Trash } from "lucide-react";
import React from "react";
import MusicTitle from "./MusicTitle";
import MusicAction from "./MusicAction";

const Music = ({ musics, onDelete, onPlay, playingId, isPlaying }) => {
  return (
    <div className="w-full px-1 pt-2">
      <div className="w-full h-[74vh] bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-y-auto p-4 scroll-custom scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
        <div className="grid grid-cols-6 gap-4">
          {musics.map((m) => {
            const isCurrent = m.id === playingId;

            return (
              <div
                key={m.id}
                className="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow group"
              >
                <img src={m.musicCover} alt="cover" className="w-full h-auto" />

                <MusicTitle
                  musicId={m.id}
                  musicTitle={m.title}
                  musicalGroup={m.musicalGroup}
                  isCurrent={isCurrent}
                />

                <MusicAction
                  musicId={m.id}
                  onPlay={onPlay}
                  isCurrent={isCurrent}
                  isPlaying={isPlaying}
                  onDelete={onDelete}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Music;

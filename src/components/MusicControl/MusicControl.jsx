import React from "react";
import MusicControlInfo from "./MusicControlInfo";
import MusicControlBar from "./MusicControlBar";
import MusicControlVolume from "./MusicControlVolume";

const MusicControl = ({
  music,
  isPlaying,
  onPlayPause,
  volume,
  onVolumeChange,
  currentTime,
  duration,
  onSeekChange,
  onPrev,
  onNext,
  onToggleShuffle,
  isShuffle,
  onToggleRepeat,
  isRepeat,
}) => {
  return (
    <div className="px-6 py-4 bg-black text-white">
      {music ? (
        <div className="flex justify-between items-center">
          <MusicControlInfo
            musicCover={music.musicCover}
            musicTitle={music.title}
            musicalGroup={music.musicalGroup}
          />

          <MusicControlBar
            onToggleShuffle={onToggleShuffle}
            onPrev={onPrev}
            isShuffle={isShuffle}
            onPlayPause={onPlayPause}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onSeekChange={onSeekChange}
            onNext={onNext}
            onToggleRepeat={onToggleRepeat}
            isRepeat={isRepeat}
          />

          <MusicControlVolume volume={volume} onVolumeChange={onVolumeChange} />
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>No Music Play</p>
        </div>
      )}
    </div>
  );
};

export default MusicControl;

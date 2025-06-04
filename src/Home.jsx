import React from "react";
import Music from "./components/music/Music";
import PlayingView from "./components/playingView/PlayingView";
import AddMusic from "./components/addMusic/AddMusic";
import MusicControl from "./components/MusicControl/MusicControl";
import { dataList } from "./utils/data";
import { Plus } from "lucide-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      musics: dataList(),
      music: "",
      isPlaying: false,
      volume: 1,
      currentTime: 0,
      duration: 0,
      playingId: null,
      isRepeat: false,
      isShuffle: false,
    };

    this.audioRef = React.createRef();

    this.onPlayHandler = this.onPlayHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddMusicHandler = this.onAddMusicHandler.bind(this);
  }

  onDeleteHandler(id) {
    const musics = this.state.musics.filter((music) => music.id !== id);
    this.setState({ musics });
    this.setState({ music: "" });
    this.audioRef.current.pause();

    console.log(this.state.musics);
  }

  componentDidMount() {
    const audio = this.audioRef.current;

    audio.addEventListener("timeupdate", this.updateTime);
    audio.addEventListener("loadedmetadata", this.updateDuration);
    this.audioRef.current.addEventListener("ended", this.handleAudioEnd);
  }

  componentWillUnmount() {
    const audio = this.audioRef.current;

    audio.removeEventListener("timeupdate", this.updateTime);
    audio.removeEventListener("loadedmetadata", this.updateDuration);
    audio.removeEventListener("ended", this.handleAudioEnd);
  }

  updateTime = () => {
    this.setState({ currentTime: this.audioRef.current.currentTime });
  };

  updateDuration = () => {
    this.setState({ duration: this.audioRef.current.duration });
  };

  onSeekChangeHandler = (e) => {
    const time = parseFloat(e.target.value);
    this.audioRef.current.currentTime = time;
    this.setState({ currentTime: time });
  };

  onPlayPauseHandler = () => {
    const audio = this.audioRef.current;
    const { isPlaying } = this.state;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Play error:", err));
    }

    this.setState({ isPlaying: !isPlaying });
  };

  onVolumeChangeHandler = (e) => {
    const volume = parseFloat(e.target.value);
    this.audioRef.current.volume = volume;
    this.setState({ volume });
  };

  onPlayHandler(id) {
    const { playingId, isPlaying } = this.state;

    if (playingId === id && isPlaying) {
      this.audioRef.current.pause();
      this.setState({ isPlaying: false });
    } else {
      const music = this.state.musics.find((m) => m.id === id);

      this.setState({ music, playingId: id, isPlaying: false }, () => {
        const audio = this.audioRef.current;
        audio.load();
        setTimeout(() => {
          audio
            .play()
            .then(() => this.setState({ isPlaying: true }))
            .catch(console.error);
        }, 300);
      });
    }
  }

  onNextHandler = () => {
    const { musics, playingId, isShuffle, isRepeat } = this.state;
    if (!playingId) return;

    const currentIndex = musics.findIndex((m) => m.id === playingId);

    if (isRepeat) {
      this.onPlayHandler(playingId);
      return;
    }

    if (isShuffle) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * musics.length);
      } while (nextIndex === currentIndex && musics.length > 1);

      const nextMusic = musics[nextIndex];
      this.onPlayHandler(nextMusic.id);
      return;
    }

    const nextIndex = (currentIndex + 1) % musics.length;
    const nextMusic = musics[nextIndex];
    this.onPlayHandler(nextMusic.id);
  };

  onPrevHandler = () => {
    const { musics, playingId } = this.state;
    if (!playingId) return;

    const currentIndex = musics.findIndex((m) => m.id === playingId);
    const prevIndex = (currentIndex - 1 + musics.length) % musics.length;
    const prevMusic = musics[prevIndex];

    this.onPlayHandler(prevMusic.id);
  };

  handleAudioEnd = () => {
    const { isRepeat, music } = this.state;

    if (isRepeat) {
      this.audioRef.current.currentTime = 0;
      this.audioRef.current.play();
    } else {
      this.onNextHandler();
    }
  };

  toggleRepeat = () => {
    this.setState((prev) => ({ isRepeat: !prev.isRepeat }));
  };

  toggleShuffle = () => {
    this.setState((prev) => ({ isShuffle: !prev.isShuffle }));
  };

  onAddMusicHandler({ title, musicalGroup, musicAudio, musicCover }) {
    this.setState((prevState) => {
      return {
        musics: [
          ...prevState.musics,
          {
            id: +new Date(),
            title,
            musicalGroup,
            musicAudio,
            musicCover,
          },
        ],
      };
    });

    this.toggleModal();
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { musicAudio } = this.state.music;

    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors overflow-hidden">
        <nav className="flex justify-between items-center px-6 py-4 dark:shadow-gray-800">
          <div className="font-bold text-lg"></div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={this.toggleModal}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition inline-flex gap-1"
            >
              <Plus /> Add Music
            </button>
          </div>
        </nav>

        <audio ref={this.audioRef} src={musicAudio} />

        <div className="flex flex-1">
          <Music
            musics={this.state.musics}
            onDelete={this.onDeleteHandler}
            onPlay={this.onPlayHandler}
            playingId={this.state.playingId}
            isPlaying={this.state.isPlaying}
          />

          <PlayingView music={this.state.music} />
        </div>

        {this.state.music && (
          <MusicControl
            isPlaying={this.state.isPlaying}
            isRepeat={this.state.isRepeat}
            isShuffle={this.state.isShuffle}
            music={this.state.music}
            volume={this.state.volume}
            currentTime={this.state.currentTime}
            duration={this.state.duration}
            onPlayPause={this.onPlayPauseHandler}
            onVolumeChange={this.onVolumeChangeHandler}
            onSeekChange={this.onSeekChangeHandler}
            onNext={this.onNextHandler}
            onPrev={this.onPrevHandler}
            onToggleRepeat={this.toggleRepeat}
            onToggleShuffle={this.toggleShuffle}
          />
        )}

        {this.state.showModal && (
          <AddMusic
            onClose={this.toggleModal}
            addMusic={this.onAddMusicHandler}
          />
        )}
      </div>
    );
  }
}

export default Home;

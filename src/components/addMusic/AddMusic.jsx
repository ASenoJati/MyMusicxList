import React, { Component } from "react";
import Errors from "./Errors";
import InputMusic from "./InputMusic";
import { CircleX, Save } from "lucide-react";

class AddMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      musicalGroup: "",
      musicAudio: "",
      musicCover: "",
      errors: {},
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onMusicalGroupChangeEventHandler =
      this.onMusicalGroupChangeEventHandler.bind(this);
    this.onMusicAudioChangeEventHandler =
      this.onMusicAudioChangeEventHandler.bind(this);
    this.onMusicCoverChangeEventHandler =
      this.onMusicCoverChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState({ title: event.target.value });
  }

  onMusicalGroupChangeEventHandler(event) {
    this.setState({ musicalGroup: event.target.value });
  }

  onMusicAudioChangeEventHandler(event) {
    this.setState({ musicAudio: event.target.value });
  }

  onMusicCoverChangeEventHandler(event) {
    this.setState({ musicCover: event.target.value });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const errors = {};
    if (!this.state.title) errors.title = "Title wajib diisi.";
    if (!this.state.musicalGroup)
      errors.musicalGroup = "Musical group wajib diisi.";
    if (!this.state.musicAudio)
      errors.musicAudio = "Music audio link wajib diisi.";
    if (!this.state.musicCover)
      errors.musicCover = "Music cover link wajib diisi.";

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.props.addMusic(this.state);

    this.setState({
      title: "",
      musicalGroup: "",
      musicAudio: "",
      musicCover: "",
      errors: {},
    });
  }

  render() {
    const { onClose } = this.props;
    const { title, musicalGroup, musicAudio, musicCover, errors } = this.state;

    return (
      <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Add New Music</h2>
          <form onSubmit={this.onSubmitEventHandler}>
            <InputMusic
              value={title}
              onChange={this.onTitleChangeEventHandler}
              errors={errors.title}
              placeholder="Enter Music Title"
            />

            <InputMusic
              value={musicalGroup}
              onChange={this.onMusicalGroupChangeEventHandler}
              errors={errors.musicalGroup}
              placeholder="Enter Musical Group Name"
            />

            <InputMusic
              value={musicAudio}
              onChange={this.onMusicAudioChangeEventHandler}
              errors={errors.musicAudio}
              placeholder="Enter Music Audio"
            />

            <InputMusic
              value={musicCover}
              onChange={this.onMusicCoverChangeEventHandler}
              errors={errors.musicCover}
              placeholder="Enter Music Cover"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 rounded bg-gray-600 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer inline-flex gap-1"
              >
                <CircleX /> Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer inline-flex gap-1"
              >
                <Save /> Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddMusic;

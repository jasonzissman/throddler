import { Challenge } from "./challenge";
import { PlaybackConfig } from "./playback-config";

export class Channel {
    id: string;
    name: string;
    videos: string[];
    challenges: Challenge[];
    playbackConfig: PlaybackConfig;

    constructor(id: string, name: string, videos: string[], challenges: Challenge[], playbackConfig: PlaybackConfig) {
      this.id = id;
      this.name = name;
      this.videos = videos;
      this.challenges = challenges;
      this.playbackConfig = playbackConfig;
    }
  }
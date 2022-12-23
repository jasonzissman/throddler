export class PlaybackConfig {
    id: string;
    name: string;
    playbackTimeBetweenChallenges: number;

    constructor(id: string, name: string, playbackTimeBetweenChallenges: number) {
      this.id = id;
      this.name = name;
      this.playbackTimeBetweenChallenges = playbackTimeBetweenChallenges
    }

  }
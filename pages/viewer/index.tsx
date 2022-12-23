import Head from 'next/head'
import { useState, useEffect } from 'react';
import { Channel } from '../../lib/channel'
import { VideoSelectorModal } from './video_selector/video_selector_modal'
import { VideoPlayer } from './video_player/video_player'
import { VideoApi } from './video_player/video_api';
import { PlaybackTimeElapsedMonitor } from './PlaybackTimeElapsedMonitor';
import { ChallengeModal } from './challenge/challenge_modal';

enum Prompts {
  NONE,
  SELECT_VIDEO,
  ANSWER_CHALLENGE
}

let monitor: PlaybackTimeElapsedMonitor;

export default function Viewer(data: { channel: Channel }) {
  let [activeVideoId, setActiveVideoId] = useState('');
  let [activePrompt, setActivePrompt] = useState(Prompts.SELECT_VIDEO);

  useEffect(() => {
    if (!monitor) {
      monitor = new PlaybackTimeElapsedMonitor(data.channel.playbackConfig.playbackTimeBetweenChallenges, () => {
        monitor.pauseTimer();
        VideoApi.pauseVideo();
        setActivePrompt(Prompts.ANSWER_CHALLENGE);
      });
    }
  }, []);

  const loadSelectVideoPrompt = () => {
    VideoApi.pauseVideo();
    monitor.pauseTimer();
    setActivePrompt(Prompts.SELECT_VIDEO);
  }

  const videoSelectHandler: Function = (videoId?: string) => {
    if (!videoId || videoId === activeVideoId) {
      VideoApi.playVideo();
      monitor.resumeTimer();
    } else {
      VideoApi.loadVideo(videoId);
      monitor.startTimer();
      setActiveVideoId(videoId)
    }
    setActivePrompt(Prompts.NONE);
    
  };

  return (
    <div>
      <Head>
        <title>Throddler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VideoPlayer
        onVideoClicked={loadSelectVideoPrompt}
      />

      <VideoSelectorModal
        visible={activePrompt === Prompts.SELECT_VIDEO}
        onVideoSelect={videoSelectHandler}
        videos={data.channel.videos}
      />

      <ChallengeModal
        visible={activePrompt === Prompts.ANSWER_CHALLENGE}
        onChallengePassed={videoSelectHandler}
      />

    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/simple-channel.json`)
  const channel = await res.json()
  return { props: { channel } }
}
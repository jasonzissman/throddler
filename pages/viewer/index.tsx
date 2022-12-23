import Head from 'next/head'
import styles from './viewer.module.css'
import { useState, useEffect } from 'react';
import { Channel } from '../../lib/channel'
import VideoSelectorModal from '../../lib/video_selector/video_selector_modal'
import VideoPlayer from '../../lib/video_player/video_player'
import { VideoApi } from '../../lib/video_api';
import { PlaybackTimeElapsedMonitor } from '../../lib/PlaybackTimeElapsedMonitor';
import ChallengeModal from '../../lib/challenge/challenge_modal';
import { Challenge } from '../../lib/challenge';
import Confetti from 'react-confetti';

enum Prompts {
  NONE,
  SELECT_VIDEO,
  ANSWER_CHALLENGE
}

// TODO should VideoApi also be a component var like this?
let monitor: PlaybackTimeElapsedMonitor;

export default function Viewer(data: { channel: Channel }) {
  let [activeVideoId, setActiveVideoId] = useState('');
  let [activePrompt, setActivePrompt] = useState(Prompts.SELECT_VIDEO);
  let [activeChallengeId, setActiveChallengeId] = useState('');
  let [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  let [showConfetti, setShowConfetti] = useState(false);

  const loadChallenge = () => {
    let nextChallenge = data.channel.challenges.find(c => !completedChallenges.includes(c.id)) || data.channel.challenges[0];
    setActiveChallengeId(nextChallenge.id)
    setActivePrompt(Prompts.ANSWER_CHALLENGE);
  }

  useEffect(() => {
    if (!monitor) {
      monitor = new PlaybackTimeElapsedMonitor(data.channel.playbackConfig.playbackTimeBetweenChallenges, () => {
        monitor.pauseTimer();
        VideoApi.pauseVideo();
        loadChallenge();
      });
    }
  }, []);

  const loadSelectVideoPrompt = () => {
    VideoApi.pauseVideo();
    monitor.pauseTimer();
    setActivePrompt(Prompts.SELECT_VIDEO);
  }

  const challengePassedHandler: Function = () => {
    completedChallenges.push(activeChallengeId)
    if (data.channel.challenges.every(c => completedChallenges.includes(c.id))) {
      // All challenges completed, cycle through them again
      completedChallenges = [];
    }
    setCompletedChallenges(completedChallenges);
    setShowConfetti(true);
    VideoApi.playVideo();
    monitor.startTimer();
    setActivePrompt(Prompts.NONE);
  };

  const videoSelectHandler: Function = (videoId: string) => {
    if (videoId === activeVideoId) {
      monitor.resumeTimer();
      VideoApi.playVideo();
      setActivePrompt(Prompts.NONE);
    } else {
      VideoApi.loadVideo(videoId);
      setActiveVideoId(videoId)
      loadChallenge();
    }
  };

  let activeChallenge: Challenge | undefined = data.channel.challenges.find(c => activeChallengeId === c.id);

  return (
    <div>
      <Head>
        <title>Throddler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showConfetti &&
        <Confetti
          className={styles.confetti}
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          initialVelocityY={20}
          onConfettiComplete={() => {
            setShowConfetti(false);
          }}
          recycle={false} />
      }

      <VideoPlayer
        onVideoClicked={loadSelectVideoPrompt}
      />

      <VideoSelectorModal
        visible={activePrompt === Prompts.SELECT_VIDEO}
        onVideoSelect={videoSelectHandler}
        videos={data.channel.videos}
      />

      {activeChallenge && <ChallengeModal
        visible={activePrompt === Prompts.ANSWER_CHALLENGE}
        onChallengePassed={challengePassedHandler}
        activeChallenge={activeChallenge}
      />
      }

    </div>
  )
}

const randomizeArray = (array:any[]) => {
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
}

const randomizeChallengeData = (channel:Channel) => {
  channel.challenges.forEach(c => randomizeArray(c.answers));
  randomizeArray(channel.challenges);
}

export async function getServerSideProps() {
  console.log(`${process.env.NODE_ENV}`)
  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000': 'https://https://throddler.vercel.app';
  const res = await fetch(`${host}/simple-channel.json`)
  const channel:Channel = await res.json()
  randomizeChallengeData(channel)
  return { props: { channel } }
}
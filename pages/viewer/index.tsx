import Head from 'next/head'
import { useState } from 'react';
import { Channel } from '../../lib/channel'
import { VideoSelector } from './video_selector/video_selector'
import { VideoPlayer } from './video_player/video_player'
import { VideoApi } from './video_player/video_api';

enum Prompts {
  NONE,
  SELECT_VIDEO,
  ANSWER_CHALLENGE
}

export default function Viewer(data: { channel: Channel }) {
  let [activeVideoId, setActiveVideoId] = useState('');
  let [activePrompt, setActivePrompt] = useState(Prompts.SELECT_VIDEO);

  const loadSelectVideoPrompt = () => {
    setActivePrompt(Prompts.SELECT_VIDEO);
  }

  const videoSelectHandler: Function = (videoId: string) => {
    // TODO logic goes here to show challenges if applicable.
    if (videoId === activeVideoId) {
      VideoApi.playVideo();
    } else {
      VideoApi.loadVideo(videoId);
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

      <VideoSelector
        visible={activePrompt === Prompts.SELECT_VIDEO}
        onVideoSelect={videoSelectHandler}
        videos={data.channel.videos}
      />

    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/simple-channel.json`)
  const channel = await res.json()
  return { props: { channel } }
}
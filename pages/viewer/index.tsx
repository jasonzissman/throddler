import Head from 'next/head'
import { useState } from 'react';
import { Channel } from '../../lib/channel'
import { VideoSelector } from './video_selector/video_selector'
import { VideoPlayer } from './video_player/video_player'
import { VideoApi } from './video_player/video_api';

export default function Viewer(data: { channel: Channel }) {
  let [activeVideoId, setActiveVideoId] = useState('');

  // TODO make enums: none, select_video, answer_challenge
  let [activePrompt, setActivePrompt] = useState("select_video");

  const loadSelectVideoPrompt = () => {
    setActivePrompt("select_video");
  }

  const videoSelectHandler: Function = (videoId: string) => {
    // TODO logic goes here to show challenges if applicable.
    if (videoId === activeVideoId) {
      VideoApi.playVideo();
    } else {
      VideoApi.loadVideo(videoId);
      setActiveVideoId(videoId)
    }
    setActivePrompt("none");
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
        visible={activePrompt === "select_video"}
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
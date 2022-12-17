import Head from 'next/head'
import { useState } from 'react';
import { Channel } from '../../lib/channel'
import { VideoSelector } from './video_selector/video_selector'
import VideoPlayer from './video_player/video_player'

export default function Viewer(data: { channel: Channel }) {
  let [activeVideoUrl, setActiveVideoUrl] = useState('');
  let [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // TODO make enums: none, select_video, answer_challenge
  let [activePrompt, setActivePrompt] = useState("select_video");

  const loadSelectVideoPrompt = () => {
    setIsVideoPlaying(false);
    setActivePrompt("select_video");
  }

  const videoSelectHandler: Function = (videoUrl: string) => {
    // TODO logic goes here to show challenges if applicable.
    setActiveVideoUrl(videoUrl);
    setActivePrompt("none");
    setIsVideoPlaying(true);
  };

  return (
    <div>
      <Head>
        <title>Throddler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VideoPlayer
        onVideoClicked={loadSelectVideoPrompt}
        videoUrl={activeVideoUrl}
        isPlaying={isVideoPlaying}
      />

      <VideoSelector
        visible={activePrompt==="select_video"}
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
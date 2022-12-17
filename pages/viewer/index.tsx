import Head from 'next/head'
import { Channel } from '../../lib/channel'
import styles from './viewer.module.css'
import { useState, MouseEventHandler } from 'react';
import { Loading } from './loading/loading'
import { SelectVideo } from './select_video/select_video'


export default function Viewer(data: { channel: Channel }) {
  let [activeVideoUrl, setActiveVideoUrl] = useState('');
  let [isAppBootstrapping, setAppBootstrapping] = useState(false);
  let [isVideoLoading, setVideoLoading] = useState(false);
  let [activePrompt, setActivePrompt] = useState("select_video"); // select_video, answer_challenge, watch_video

  const iFrameLoaded = () => {
    setAppBootstrapping(false)
    setVideoLoading(false);
  }

  const videoSelectHandler: MouseEventHandler = (event) => {
    // TODO find way to pass video URL here
    setVideoLoading(true);
    setActiveVideoUrl(videoUrl);
  };

  return (
    <div>
      <Head>
        <title>Throddler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO this iframe and logic should be its own component */}
      {/* <iframe onLoad={iFrameLoaded} className={styles.iframe} id="the-iframe" src={activeVideoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> */}

      <div className={[styles.baseOverlay, isAppBootstrapping ? '' : styles.fullyTransparent].join(" ")}>
        { activePrompt==="select_video" && (<SelectVideo onVideoSelect={videoSelectHandler} videos={data.channel.videos} />)}
      </div>

      {/* TODO Is isAppBootstrapping necessary? */}
      { isAppBootstrapping && (<Loading />) }

    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/simple-channel.json`)
  const channel = await res.json()
  return { props: { channel } }
}
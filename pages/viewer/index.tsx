import Head from 'next/head'
import { Channel } from '../../lib/channel'
import styles from './viewer.module.css'
import { useState } from 'react';
import { Loading } from './loading/loading'

export default function Viewer(data: { channel: Channel }) {
  let [activeVideoIndex] = useState(0);
  let [isAppBootstrapping, setAppBootstrapping] = useState(true);
  let [isVideoLoading, setVideoLoading] = useState(true);
  

  const iFrameLoaded = () => {
    setAppBootstrapping(false)
    setVideoLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Throddler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <iframe onLoad={iFrameLoaded} className={styles.iframe} id="the-iframe" src={data.channel.videos[activeVideoIndex]} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </main>

      <div className={[styles.baseOverlay, isAppBootstrapping ? '' : styles.fullyTransparent].join(" ")}>

      </div>

      { isAppBootstrapping && (<Loading />) }

    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/simple-channel.json`)
  const channel = await res.json()
  return { props: { channel } }
}
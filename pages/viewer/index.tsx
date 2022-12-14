import Head from 'next/head'
import Image from 'next/image'
import { Channel } from '../../lib/channel'
import styles from  './viewer.module.css'

export default function Viewer(data: {channel: Channel}) {
  return (
    <div>
      <Head>
        <title>Throddler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <iframe className={styles.iframe} id="the-iframe" src={data.channel.videos[0]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="false"></iframe>
      </main>

      <div className={styles.baseOverlay}>
        {data.channel.name}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/simple-channel.json`)
  const channel = await res.json()
  return { props: { channel } }
}
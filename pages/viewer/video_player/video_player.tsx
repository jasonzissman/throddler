import styles from './video_player.module.css'
import { useState } from 'react';

export default function VideoPlayer(data: {
  onVideoClicked: Function,
  videoUrl: string
}) {

  let [isPlaying, setIsPlaying] = useState(true);

  const onClickOverlay = () => {
    setIsPlaying(false);
    data.onVideoClicked();
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        onClick={onClickOverlay}>
      </div>
      {data.videoUrl && <iframe
        className={styles.iframe}
        id="the-iframe"
        src={`${data.videoUrl}${isPlaying && '?autoplay=1'}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
      </iframe>
      }
    </div>
  )


}


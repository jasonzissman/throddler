import styles from './video_player.module.css'
import { VideoApi } from './video_api'

type VideoPlayerProps = {
  onVideoClicked: Function,
};

export const VideoPlayer = (data: VideoPlayerProps) => {

  const onClickOverlay = () => {
    VideoApi.pauseVideo();
    data.onVideoClicked();
  }

  return (
    <div className={styles.container}>

      <div
        className={styles.overlay}
        onClick={onClickOverlay}>
      </div>

      <div  className={styles.videoContainer}  id="the-video-container"></div>
    </div>
  )
}
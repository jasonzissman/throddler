import styles from './video_player.module.css'

type VideoPlayerProps = {
  onVideoClicked: Function,
};

export default function VideoPlayer(data: VideoPlayerProps) {

  const onClickOverlay = () => {
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
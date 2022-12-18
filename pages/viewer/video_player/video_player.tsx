import styles from './video_player.module.css'
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';

export default function VideoPlayer(data: {
  onVideoClicked: Function,
  videoId: string
}) {

  let ytPlayer: YouTubePlayer;
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    ytPlayer = event.target;
  }

  const onYtVideoReady = () => {
    console.log(`onYtVideoReady`)
  }

  const onYtStateChange = () => {
    console.log(`onYtStateChange`)
  }

  const onClickOverlay = () => {
    ytPlayer.pauseVideo();
    data.onVideoClicked();
  }

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className={styles.container}>

      <div
        className={styles.overlay}
        onClick={onClickOverlay}>
      </div>

      {data.videoId && <YouTube
        videoId={data.videoId}
        iframeClassName={styles.iframe}
        opts={opts}
        onReady={onPlayerReady} />
      }
    </div>
  )


}


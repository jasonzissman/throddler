import styles from './video_player.module.css'
import { memo } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';

// TODO is memo preventing excessive renders as desired? We only want it
// to rerender when videoId changes.

// The underlying YoutubePlayer component should
// only rerender when the videoID changes since
// it's an expensive operation. Other interactions
// (pause video, etc.) should not cause a rerender.

type VideoPlayerProps = {
  onVideoClicked: Function,
  videoId: string
};


// TODO this is not being invoked. Why?
const isEqual = (prevProps: VideoPlayerProps, nextProps: VideoPlayerProps) => {
  return prevProps.videoId === nextProps.videoId
};

export const VideoPlayer = memo((data: VideoPlayerProps) => {

  if (!data.videoId) {
    return <div>Select a video...</div>
  }

  let ytPlayer: YouTubePlayer;
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    ytPlayer = event.target;
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


}, isEqual)
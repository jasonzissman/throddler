import { MouseEventHandler } from 'react';
import styles from './select_video.module.css'
import { VideoItem } from './video_item/video_item';

export function SelectVideo(data: { videos: String[], onVideoSelect: MouseEventHandler }) {
  return (
    <div className={styles.selectVideo}>
      {
        data.videos.map(function (videoUrl) {
          return <VideoItem onVideoSelect={data.onVideoSelect} videoUrl={videoUrl} />
        })
      }
    </div>
  )
}

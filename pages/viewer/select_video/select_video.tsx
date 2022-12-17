import styles from './select_video.module.css'
import { VideoItem } from './video_item/video_item';

export function SelectVideo(data: { videos: String[] }) {
  return (
    <div className={styles.selectVideo}>
      {
        data.videos.map(function (videoUrl) {
          return <VideoItem videoUrl={videoUrl} />
        })
      }
    </div>
  )
}

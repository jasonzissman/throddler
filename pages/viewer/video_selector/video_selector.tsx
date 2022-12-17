import styles from './video_selector.module.css'
import { VideoSelectorItem } from './video_selector_item';

export function VideoSelector(data: { 
  videos: string[], 
  onVideoSelect: Function,
  visible: boolean
 }) {
  return (
    <div className={[styles.videoSelector, data.visible ? styles.visibleFadeIn : styles.invisibleFadeOut].join(" ")}>
      {
        data.videos.map(function (videoUrl) {
          return <VideoSelectorItem
            key={videoUrl}
            onVideoSelect={data.onVideoSelect}
            videoUrl={videoUrl} />
        })
      }
    </div>
  )
}
import styles from './video_selector_modal.module.css'
import { VideoSelectorItem } from './video_selector_item';

export function VideoSelectorModal(data: { 
  videos: string[], 
  onVideoSelect: Function,
  visible: boolean
 }) {
  return (
    <div className={[styles.videoSelectorModal, data.visible ? styles.visibleFadeIn : styles.invisibleFadeOut].join(" ")}>
      {
        data.videos.map(function (videoId) {
          return <VideoSelectorItem
            key={videoId}
            onVideoSelect={data.onVideoSelect}
            videoId={videoId} />
        })
      }
    </div>
  )
}

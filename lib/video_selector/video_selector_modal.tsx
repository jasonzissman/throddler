import styles from './video_selector_modal.module.css'
import VideoSelectorItem from './video_selector_item';

export default function VideoSelectorModal(data: { 
  videos: string[], 
  onVideoSelect: Function,
  visible: boolean
 }) {
  return (
    <div className={[styles.videoSelectorModal, data.visible ? styles.visibleFadeIn : styles.invisibleFadeOut].join(" ")}>
      {
        data.videos.map(function (videoId, index) {
          return <VideoSelectorItem
            key={videoId}
            index={index}
            onVideoSelect={data.onVideoSelect}
            videoId={videoId} />
        })
      }
    </div>
  )
}

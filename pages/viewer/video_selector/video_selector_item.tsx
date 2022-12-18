import styles from './video_selector_item.module.css'

export function VideoSelectorItem(data: { videoId: string, onVideoSelect: Function }) {
  const imageUrl = `https://img.youtube.com/vi/${data.videoId}/0.jpg`;
  return (
    <div
      onClick={e => { data.onVideoSelect(data.videoId) }}
      className={styles.videoItem}>
      <img src={imageUrl} />
    </div>
  )
}

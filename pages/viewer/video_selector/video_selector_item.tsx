import styles from './video_selector_item.module.css'

export function VideoSelectorItem(data: { videoUrl: string, onVideoSelect: Function }) {
  const id = data.videoUrl.split("embed/")[1];
  const imageUrl = `https://img.youtube.com/vi/${id}/0.jpg`;
  return (
    <div
      onClick={e => { data.onVideoSelect(data.videoUrl) }}
      className={styles.videoItem}>
      <img src={imageUrl} />
    </div>
  )
}

import styles from './video_selector_item.module.css'

export default function VideoSelectorItem(data: { 
  videoId: string, 
  index: number,
  onVideoSelect: Function }) {
  const imageUrl = `https://img.youtube.com/vi/${data.videoId}/0.jpg`;
  const divStyle = {
    backgroundImage: 'url(' + imageUrl + ')',
  };

  return (
    <div
      onClick={e => { data.onVideoSelect(data.videoId) }}
      className={styles.videoItem}
      style={divStyle}
      >
        <div className={styles.divWithNumber}>
          {data.index + 1}
        </div>
    </div>
  )
}

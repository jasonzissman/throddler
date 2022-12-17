import { MouseEventHandler } from 'react';
import styles from  './video_item.module.css'

export function VideoItem(data: { videoUrl: String, onVideoSelect: MouseEventHandler }) {
  const id = data.videoUrl.split("embed/")[1];
  const imageUrl = `https://img.youtube.com/vi/${id}/0.jpg`;
  return (<div onClick={data.onVideoSelect} className={styles.videoItem}><img src={imageUrl} /></div>)
}

import styles from  './loading.module.css'

export function Loading() {
  return (
      <div className={styles.loading}>
        <img src="http://localhost:3000/loading.svg" />
        <div className={styles.loadingSpan}>Loading...</div>
      </div>
  )
}

import styles from './index.module.css'

export default function LoadingFallback() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.circle}></div>
        <div className={`${styles.circle} ${styles.inner}`}></div>
      </div>
      <p className={styles.text}>Loading...</p>
    </div>
  )
}
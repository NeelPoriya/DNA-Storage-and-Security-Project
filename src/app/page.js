import Header from '@/components/Header'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles['home-page']}>
      <div className={styles['filter-component']}>
        <h2 className={styles['filter-heading']}>
          Filters
        </h2>
        <div className={styles['filter-main']}>
          <h3 className={styles['filter-item-heading']}>University</h3>
          <h3 className={styles['filter-item-heading']}>Author</h3>
          <h3 className={styles['filter-item-heading']}>Published Date</h3>
          <h3 className={styles['filter-item-heading']}>Title</h3>
        </div>
      </div>
      <div className={styles['articles-component']}>
        <Header />
      </div>
    </div >
  )
}

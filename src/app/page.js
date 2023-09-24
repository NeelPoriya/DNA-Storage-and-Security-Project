import Header from '@/components/Header'
import styles from './page.module.css'
import { AiOutlineSearch } from 'react-icons/ai';

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
        <div className={styles['search-component']}>
          <div className={styles['search-icon-wrapper']}>
            <AiOutlineSearch className={styles['search-icon']} />
          </div>
          <div className={styles['search-input-wrapper']}>
            <input
              type='text'
              placeholder='New Codec Algorithms'
              className={styles['search-input']}
            ></input>
          </div>
        </div>
      </div>
    </div >
  )
}

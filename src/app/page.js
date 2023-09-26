'use client'
import Header from '@/components/Header'
import styles from './page.module.css'
import { AiOutlineSearch } from 'react-icons/ai';
import Card from '@/components/Card';
import { useEffect, useMemo, useState } from 'react';
import Pagination from '@/components/Pagination';

const PageSize = 8;

export default function Home() {

  const data = [
    <Card key="1" />,
    <Card key="2" />,
    <Card key="3" />,
    <Card key="4" />,
    <Card key="5" />,
    <Card key="6" />,
    <Card key="7" />,
    <Card key="8" />,
    <Card key="9" />,
    <Card key="10" />,
    <Card key="11" />,
    <Card key="12" />,
    <Card key="13" />,
    <Card key="14" />,
    <Card key="15" />,
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);


  useEffect(() => {

  });

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
        <div className={styles['articles-wrapper']}>
          <div className={styles['articles-main']}>
            {currentTableData.map(card => card)}
          </div>
          <div className={styles['articles-pagination']}>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div >
  )
}

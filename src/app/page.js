'use client'
import Header from '@/components/Header'
import styles from './page.module.css'
import { AiOutlineSearch } from 'react-icons/ai';
import Card from '@/components/Card';
import { useEffect, useMemo, useState } from 'react';
import Pagination from '@/components/Pagination';
import Model from '@/components/Model';

const PageSize = 12;

export default function Home() {

  let details = {
    title: 'DNA Storage and Security Security Security Security Security',
    description: 'A very few paper have achieved the level of professionalism this paper has achieved.',
    author: ['Arthur Morgan', 'Sadie Adler', 'John Marston', 'Abigel Marston'],
    publishedDate: new Date()
  }

  let newDetails = {
    // heading
    title: "Fractal construction of constrained code words for DNA storage systems",

    // high priority
    source: "Oxford Academics",
    type: "Articles And Papers",
    topics: "Codeword, Storage",

    // low priority
    authors: "Hannah F L\u00f6chel, Marius Welzel, Georges Hattab, Anne-Christin, Hauschild, Dominik Heider",
    publishedDate: "15 December 2021",

    // link
    link: "https://doi.org/10.1093/nar/gkab1209"
  }

  const data = [];

  for (let i = 0; i < 100; ++i) {
    data.push(<Card key={i} details={newDetails} />);
  }

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

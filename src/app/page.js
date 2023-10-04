'use client'
import Header from '@/components/Header'
import styles from './page.module.css'
import { AiOutlineSearch } from 'react-icons/ai';
import Card from '@/components/Card';
import { useEffect, useMemo, useState } from 'react';
import Pagination from '@/components/Pagination';
import Model from '@/components/Model';
import Filters from '@/components/Filters';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';

const PageSize = 12;

export default function Home() {
  const [data, setData] = useState([]);
  // create a new data from the original data with extracted sources
  let [newData, setNewData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  // fetch data from api
  useEffect(() => {
    fetch('/api/articles-papers')
      .then(res => res.json())
      .then(data => {
        setData(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  // apply filters on data
  useEffect(() => {
    const nData = data.filter(
      (item) => {
        let firstTest = selectedSources.length === 0;
        if (selectedSources.length !== 0)
          firstTest = selectedSources.includes(item.Source);

        let secondTest = selectedAuthors.length === 0;
        item.Authors.split(',').forEach((author) => {
          if (selectedAuthors.includes(author)) secondTest = true;
        });

        return firstTest && secondTest;
      }
    );

    setNewData(nData);
  }, [selectedSources, selectedAuthors, data]);

  // using another state to store the current page data (filtered/unfiltered) 
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    // check if no filters are applied
    if (!isAnyFilterApplied(selectedSources, selectedAuthors))
      return data.slice(firstPageIndex, lastPageIndex);
    return newData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, newData, data, selectedSources, selectedAuthors]);


  return (
    <div className={styles['home-page']}>
      <div className={styles['filter-component']}>
        <Filters
          data={data}
          selectedSources={selectedSources}
          selectedAuthors={selectedAuthors}
          setSelectedSources={setSelectedSources}
          setSelectedAuthors={setSelectedAuthors}
        />
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
          {
            data.length === 0 ?
              <div className={styles['loading']}>
                <CircularProgress color='inherit' />
              </div>
              :
              (
                currentTableData.length === 0 ?
                  <div className={styles['no-results']}>
                    <Image className={styles['not-found-image']} src={'/not-found.svg'} width={1000} height={1000} alt={'404'}></Image>
                    <h1>No Results Found</h1>
                    <p>Try different keywords or remove filters</p>
                  </div>
                  :
                  <div className={styles['articles-main']}>
                    {currentTableData.map((cardDetails, idx) => <Card key={idx} details={cardDetails} />)}
                  </div>
              )
          }
          <div className={styles['articles-pagination']}>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={
                !isAnyFilterApplied(selectedSources, selectedAuthors) ?
                  data.length : newData.length
              }
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div >
  )
}
function isAnyFilterApplied(selectedSources, selectedAuthors) {
  return !(selectedSources.length === 0 && selectedAuthors.length === 0);
}


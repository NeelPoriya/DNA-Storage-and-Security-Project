'use client'
import Header from '@/components/Header'
import styles from './page.module.css'
import { AiOutlineSearch } from 'react-icons/ai';
import Card from '@/components/Card';
import { useEffect, useMemo, useState } from 'react';
import Pagination from '@/components/Pagination';
import Model from '@/components/Model';
import Filters from '@/components/Filters';

const PageSize = 12;

let detailsSample = {
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
};

const details = [
  {
    title: "Fractal construction of constrained code words for DNA storage systems",
    source: "Oxford Academics",
    type: "Articles And Papers",
    topics: "Codeword, Storage",
    authors: "Hannah F L\u00f6chel, Marius Welzel, Georges Hattab, Anne-Christin, Hauschild, Dominik Heider",
    publishedDate: "15 December 2021",
    link: "https://doi.org/10.1093/nar/gkab1209"
  },
  {
    title: "Sometimes, I feel like I'm talking to a wall",
    source: "DA-IICT",
    type: "Conference Paper",
    topics: "WordCode, DNA storage",
    authors: "Mikkel Khandval, Marhta Nielson, Regina Tiedmann",
    publishedDate: "24 January 2023",
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    title: "Small Title",
    source: "Large Source - Very large source",
    type: "Not so good paper",
    topics: "WordCode, DNA storage, large topic, very large topic, super-duper large topic",
    authors: "Mikkel Khandval, Marhta Nielson, Regina Tiedmann, a very long name, a very-very long name indeed",
    publishedDate: "01 October 2023",
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },

  {
    title: "Medium Title - Medium Title - Medium Title",
    source: "Small institute",
    type: "Youtube Channel",
    topics: "WordCode, Influencer",
    authors: "Mikkel Khandval, Marhta Nielson, Regina Tiedmann",
    publishedDate: "10 March 2023",
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
]

export default function Home() {
  const [data, setData] = useState([]);
  // create a new data from the original data with extracted sources
  let [newData, setNewData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSources, setSelectedSources] = useState([]);

  useEffect(() => {
    for (let i = 0; i < 111; ++i) {
      setData(prev =>
        [
          ...prev,
          details[Math.floor(Math.random() * details.length)]
        ]
      );
    }
  }, []);

  useEffect(() => {
    setNewData(prev => data.filter((item) => {
      if (selectedSources.includes(item.source)) return true;
      return false;
    }))
  }, [selectedSources, data]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    if (newData.length !== 0)
      return newData.slice(firstPageIndex, lastPageIndex);
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, newData, data]);


  return (
    <div className={styles['home-page']}>
      <div className={styles['filter-component']}>
        <Filters
          data={details}
          selectedSources={selectedSources}
          setSelectedSources={setSelectedSources}
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
          <div className={styles['articles-main']}>
            {currentTableData.map((cardDetails, idx) => <Card key={idx} details={cardDetails} />)}
          </div>
          <div className={styles['articles-pagination']}>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={
                newData.length === 0 ?
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

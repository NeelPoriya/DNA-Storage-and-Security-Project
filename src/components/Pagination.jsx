import { DOTS, usePagination } from '@/hooks/usePagination';
import styles from './../styles/Pagination.module.css';

const Pagination = (props) => {
    const { onPageChange, totalCount, siblingCount, currentPage, pageSize } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={styles['pagination-container']}>
            <li
                className={styles['pagination-item']}
                onClick={onPrevious}
            >
                <div className={`${styles["arrow"]} ${styles['left']}"]`} />
            </li>

            {paginationRange.map(pageNumber => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li key={pageNumber} className={`${styles["pagination-item"]} ${styles['dots']}"]`}>&#8230;</li>;
                }

                // Render our Page Pills
                return (
                    <li
                        key={pageNumber}
                        className={styles['pagination-item']}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}

            <li
                className={styles['pagination-item']}
                onClick={onNext}
            >
                <div className={`${styles["arrow"]} ${styles['right']}"]`} />
            </li>
        </ul>
    )
}

export default Pagination
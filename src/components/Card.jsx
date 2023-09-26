import Link from 'next/link';
import styles from './../styles/Card.module.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const Card = () => {

    let details = {
        title: 'DNA Storage and SecuritySecuritySecuritySecuritySecurity',
        description: 'A very few paper have achieved the level of professionalism this paper has achieved.',
        author: 'Nick Jonas',
        publishedDate: new Date()
    }

    return (
        <div className={styles['card-component']}>
            <Link className={styles['card-link']} href="/">
                <div className={styles['card-image-wrapper']}>
                    <Image src={'/paper.jpg'} width={1954} height={3006} className={styles['card-image']} alt='random image' />
                </div>
                <div className={styles['card-details']}>
                    <div className={styles['card-title']}>
                        {details.title.slice(0, 20)}{details.title.length > 20 ? '...' : ''}
                    </div>
                    <div className={styles['card-author']}>
                        {details.author}
                    </div>
                    <div className={styles['card-date']}>
                        {
                            typeof (details.publishedDate.toISOString) == 'function' ?
                                details.publishedDate.toDateString().split(' ').slice(1).join(' ') :
                                details.publishedDate.toString()
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card
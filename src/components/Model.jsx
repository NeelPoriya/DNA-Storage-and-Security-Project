import { useEffect } from 'react';
import styles from './../styles/Model.module.css';
import Image from 'next/image';

const Model = ({ setShow, details }) => {

    const close = (e) => {
        if (e.target.id !== 'close') return;
        setShow(false);
    }

    return (
        <div id={'close'} onClick={(e) => close(e)} className={styles['model-component']}>
            <div id={'dialog'} className={styles['model-content']}>
                <div className={styles['model-left']}>
                    <Image src={'/paper.jpg'} width={1954} height={3006} className={styles['card-image']} alt='random image' />
                </div>
                <div className={styles['model-right']}>

                </div>
            </div>
        </div>
    )
}

export default Model
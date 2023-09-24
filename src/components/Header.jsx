import styles from './../styles/Header.module.css';
import { GoBell } from 'react-icons/go';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Header = () => {
    const currentDate = `${new Date().getDate()} ${months[new Date().getMonth()]}`;

    return (
        <div className={styles['header']}>
            <div className={styles['date-wrapper']}>
                <h3 className={styles['date-style']}>Today, {currentDate}</h3>
            </div>
            <div className={styles['profile-wrapper']}>
                <div className={styles['bell-wrapper']}>
                    <GoBell className={styles['bell-logo']} />
                </div>
            </div>
        </div>
    )
}

export default Header
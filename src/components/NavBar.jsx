'use client'
import Image from 'next/image';
import styles from './../styles/NavBar.module.css';
import { PiHouse } from 'react-icons/pi';
import { BsFolder } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { BiSolidBookBookmark } from 'react-icons/bi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {

    const pathname = usePathname();
    console.log(pathname);

    return (
        <div className={styles['navbar']}>
            <div className={styles['logo-wrapper']}>
                <BiSolidBookBookmark className={styles['logo']} />
            </div>
            <div className={styles['nav-items-wrapper']}>
                <div className={styles['nav-item']}>
                    <Link href="/">
                        <div className={`${styles['icon-wrapper']} ${pathname === '/' ? styles['active'] : ''}`}>
                            <PiHouse
                                className={`${styles['icon']}`}
                            />
                        </div>
                    </Link>
                </div>
                <div className={styles['nav-item']}>
                    <Link href="/folder">
                        <div className={`${styles['icon-wrapper']} ${pathname === '/folder' ? styles['active'] : ''}`}>
                            <BsFolder
                                className={`${styles['icon']}`}
                            />
                        </div>
                    </Link>
                </div>
                <div className={styles['nav-item']}>
                    <Link href="/calender">
                        <div className={`${styles['icon-wrapper']} ${pathname === '/calender' ? styles['active'] : ''}`}>
                            <SlCalender
                                className={`${styles['icon']}`}
                            />
                        </div>
                    </Link>
                </div>
                <div className={styles['nav-item']}>
                    <Link href="/time">
                        <div className={`${styles['icon-wrapper']} ${pathname === '/time' ? styles['active'] : ''}`}>
                            <AiOutlineClockCircle
                                className={`${styles['icon']}`}
                            />
                        </div>
                    </Link>
                </div>
                <div className={styles['nav-item']}>
                    <Link href="/users">
                        <div className={`${styles['icon-wrapper']} ${pathname === '/users' ? styles['active'] : ''}`}>
                            <FiUsers
                                className={`${styles['icon']}`}
                            />
                        </div>
                    </Link>
                </div>
                <div className={styles['nav-item']}>
                    <Link href="/chat">
                        <div className={`${styles['icon-wrapper']} ${pathname === '/chat' ? styles['active'] : ''}`}>
                            <IoChatbubbleOutline
                                className={`${styles['icon']}`}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar
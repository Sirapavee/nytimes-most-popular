import Image from 'next/image'
import { useState } from 'react'

import styles from '../../styles/NavigationBar.module.scss'

import SideBar from './sidebar'

export default function NavigationBar() {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const openSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    return (
        <section className={styles.container}>
            <span onClick={openSideBar} className={styles.sidebarbtn}>
                <Image 
                    src={'/menu.svg'}
                    alt={'side bar button'}
                    width={20}
                    height={15}
                />
            </span>
            <span className={styles.searchbtn}>
                <Image 
                    src={'/search.svg'}
                    alt={'search button'}
                    width={20}
                    height={20}
                />
            </span>
            <SideBar status={isSideBarOpen} signal={openSideBar} />
            <p className={styles.title}>The New York Times</p>
        </section>
    )
}
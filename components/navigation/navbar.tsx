import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import styles from '../../styles/NavigationBar.module.scss'

import SideBar from './sidebar'
import SearchBar from './searchbar'

interface props {
    sectionList?: any,
    queryUpdateSignal: any,
    query: string,
}

export default function NavigationBar({ sectionList, queryUpdateSignal, query }: props) {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

    const openSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    const openSearchBar = () => {
        setIsSearchBarOpen(!isSearchBarOpen)
        queryUpdateSignal('')
    }

    const closeSideBarAndClearQuery = () => {
        openSideBar()

        if (isSearchBarOpen) {
            openSearchBar()
        }
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
            <div className={styles.searchSpace}>
                <span 
                    onClick={openSearchBar} 
                    className={styles.searchbtn}
                    data-isclicked={isSearchBarOpen}
                >
                    <Image 
                        src={'/search.svg'}
                        alt={'search button'}
                        width={20}
                        height={20}
                    />
                </span>
                <SearchBar isOpen={isSearchBarOpen} queryUpdateSignal={queryUpdateSignal} query={query} />
            </div>
            <SideBar 
                isOpenStatus={isSideBarOpen} 
                openSignal={openSideBar} 
                sectionList={sectionList} 
                queryUpdateSignal={queryUpdateSignal} 
                query={query} 
                exit={closeSideBarAndClearQuery} 
            />
            <Link href={'/'}>
                <a>
                    <p className={styles.title}>The New York Times</p> 
                </a>
            </Link>
        </section>
    )
}
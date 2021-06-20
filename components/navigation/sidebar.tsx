import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/SideBar.module.scss'

import SearchBarResponsive from './searchbarResp'

interface props {
    isOpenStatus: boolean,
    openSignal: any,
    sectionList?: any,
    queryUpdateSignal?: any,
    query?: any,
    exit?: any
}

export default function SideBar({ isOpenStatus, openSignal, sectionList, queryUpdateSignal, query, exit }: props) {

    return (
        <div 
            className={styles.container} 
            data-isopen={isOpenStatus}
        >
            <div className={styles.closebtn} onClick={openSignal}>
                <Image
                    src={'/cross.svg'}
                    alt={'close button'}
                    width={15}
                    height={15}
                />
            </div>
            <div className={styles.searchContainer} data-isidpage={query}>
                <SearchBarResponsive queryUpdateSignal={queryUpdateSignal} jumpToResultSignal={openSignal} query={query} />
            </div>
            <Link href={'/'}>
                <a onClick={openSignal}>Homapage</a>
            </Link>
            <Link href={'/indexAlternate'}>
                <a onClick={openSignal}>Alternate Homapage</a>
            </Link>
            <div className={styles.hrLine} />
            {
                Object.keys(sectionList).map((key: string) => {
                    return (
                        <Link key={key} href={`/sections/${key}`}>
                            <a onClick={exit}>{key}</a>
                        </Link>
                    )
                })
            }
        </div>
    )
}
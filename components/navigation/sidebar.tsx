import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/SideBar.module.scss'

import SearchBarResponsive from './searchbarResp'

interface props {
    status: boolean,
    signal: any,
    sectionList?: any,
    searchSignal?: any,
    query?: any,
    exit?: any
}

export default function SideBar({ status, signal, sectionList, searchSignal, query, exit }: props) {

    return (
        <div 
            className={styles.container} 
            data-isopen={status}
        >
            <div className={styles.closebtn} onClick={signal}>
                <Image
                    src={'/cross.svg'}
                    alt={'close button'}
                    width={15}
                    height={15}
                />
            </div>
            <div className={styles.searchContainer} data-isidpage={query}>
                <SearchBarResponsive signal={searchSignal} jumpToResultSignal={signal} query={query} />
            </div>
            <Link href={'/'}>
                <a onClick={signal}>Homapage</a>
            </Link>
            <Link href={'/indexAlternate'}>
                <a onClick={signal}>Alternate Homapage</a>
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
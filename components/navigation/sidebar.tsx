import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

import styles from '../../styles/SideBar.module.scss'

import SearchBarResponsive from './searchbarResp'

interface props {
    status: boolean,
    signal: any,
    sectionList?: any
}

const OutsideHover = (ref: any, status: boolean) => {
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const handleHoverOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsHovered(true)
            }
            else {
                setIsHovered(false)
            }
        }

        if (status) {
            document.addEventListener('mouseover', handleHoverOutside)
        }

        return () => {
            document.removeEventListener('mouseover', handleHoverOutside)
        }
    }, [ref, status])

    return isHovered
}

export default function SideBar({ status, signal, sectionList }: props) {
    
    const sidebarRef = useRef(null)
    const hoverOutside = OutsideHover(sidebarRef, status)

    return (
        <div 
            ref={sidebarRef}
            className={styles.container} 
            data-isopen={status}
        >
            <div className={styles.closebtn} onClick={signal} onChange={signal}>
                <Image
                    src={'/cross.svg'}
                    alt={'close button'}
                    width={15}
                    height={15}
                />
            </div>
            <div className={styles.searchContainer}>
                <SearchBarResponsive />
            </div>
            <Link href={'/'}>
                <a>Homapage</a>
            </Link>
            <Link href={'/indexAlternate'}>
                <a>Alternate Homapage</a>
            </Link>
            <div className={styles.hrLine} />
            {
                Object.keys(sectionList).map((key: string) => {
                    return (
                        <Link key={key} href={`/sections/${key}`}>
                            <a>{key}</a>
                        </Link>
                    )
                })
            }
        </div>
    )
}
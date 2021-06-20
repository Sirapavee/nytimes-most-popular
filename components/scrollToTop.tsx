import Image from 'next/image'

import { useState, useEffect } from 'react'

import styles from '../styles/ScrollArrow.module.scss'

export default function ScrollArrow() {

    const [scrollVisible, setScrollVisible] = useState(false)
    const [width, setWidth] = useState(0)

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {

        const checkScrollTop = () => {
            if (!scrollVisible && window.pageYOffset > 600) {
                setScrollVisible(true)
            }
            else if (scrollVisible && window.pageYOffset <= 600) {
                setScrollVisible(false)
            }
        }

        window.addEventListener('scroll', checkScrollTop)

        setWidth(window.innerWidth)

        return function cleanup() {
            window.removeEventListener('scroll', checkScrollTop);
        }

    }, [scrollVisible, width])

    return (
        <div 
            className={styles.container}
        >
            <div
                onClick={scrollTop}
                className={styles.scrollTop}
                data-visible={scrollVisible}
            >
                <Image
                    src={'/arrow.svg'}
                    alt={'scroll to top button'}
                    width={50}
                    height={50}
                    quality={80}
                />
            </div>
        </div>
    )
}
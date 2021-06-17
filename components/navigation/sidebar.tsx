import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

import styles from '../../styles/SideBar.module.scss'

interface props {
    status: boolean,
    signal: any,
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

export default function SideBar({ status, signal }: props) {

    const sidebarRef = useRef(null)
    const hoverOutside = OutsideHover(sidebarRef, status)

    console.log(status, hoverOutside)
    
    const isOpen = () => {
        if (hoverOutside === false) {
            if (status === true) {
                return true
            }
            else {
                return false
            }
        }
        else {
            signal()
            return false
        }
    }

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
            <a href="#">Homapage</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    )
}
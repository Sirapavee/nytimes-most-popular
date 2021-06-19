import Image from 'next/image'
import Link from 'next/link'

import styles from '../../../styles/NewsBrief.module.scss'

interface props {
    newsData: any,
}

export default function NewsBrief({ newsData }: props) {

    const headlineImgMetaData = newsData['media'][0]['media-metadata'][2]
    const copyright = newsData['media'][0]['copyright']
    
    return (
        <section
            className={styles.container}
        >
            <div className={styles.imageContainer}>
                <Image 
                    src={headlineImgMetaData['url']}
                    alt={'headline image'}
                    width={headlineImgMetaData['width']}
                    height={headlineImgMetaData['height']}
                />
                <span className={styles.copyright}>
                    {copyright}
                </span>
            </div>
            <Link href={`/articles/${newsData['id']}`}>
                <a tabIndex={0}>
                    <header className={styles.title}>
                        {newsData['title']}
                    </header>
                </a>
            </Link>
        </section>
    )
}
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../../styles/NewsWithSummary.module.scss'

interface props {
    newsData: any,
}

export default function NewsWithSummary({ newsData }: props) {

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
            <div className={styles.detail}>
                <Link href={`/articles/${newsData['id']}`}>
                    <a tabIndex={0}>
                        <header className={styles.title}>
                            {newsData['title']}
                        </header>
                    </a>
                </Link>
                <p className={styles.summary}>
                    {newsData['abstract']}
                </p>
            </div>
        </section>
    )
}
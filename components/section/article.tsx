import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/ArticleBox.module.scss'

interface props {
    articleData: any,
}

export default function ArticleBox({ articleData }: props) {

    const headlineImgMetaData = articleData['media'][0]['media-metadata'][1]

    return (
        <div className={styles.container}>
            <div className={styles.allTheText}>
                <div className={styles.date}>
                    {articleData['published_date']}
                </div>

                <div className={styles.description}>
                    <Link href={`/articles/${articleData['id']}`}>
                        <a tabIndex={0}>
                            <div className={styles.title}>
                                {articleData['title']}
                            </div>
                        </a>
                    </Link>
                    <div className={styles.summary}>
                        {articleData['abstract']}
                    </div>
                    <div className={styles.author}>
                        {articleData['byline']}
                    </div>
                </div>
            </div>

            <div className={styles.imageContainer}>
                <Image 
                    src={headlineImgMetaData['url']}
                    alt={'thumbnail image'}
                    width={headlineImgMetaData['width']}
                    height={headlineImgMetaData['height']}
                />
            </div>
        </div>
    )
}
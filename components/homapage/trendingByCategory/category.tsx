import Image from 'next/image'

import styles from '../../../styles/Category.module.scss'

interface props {
    categoryData: any,
}

export default function Category({ categoryData }: props) {

    const newsWithMedia = categoryData.filter((news: any) => {
        if (news['media'].length !== 0) {
            return news
        }
    })

    const headlineImgMetaData = newsWithMedia[0]['media'][0]['media-metadata'][2]
    const copyright = newsWithMedia[0]['media'][0]['copyright']

    return (
        <div className={styles.container}>
            <div className={styles.headline}>
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
                <header className={styles.title}>
                    {newsWithMedia[0]['title']}
                </header>
            </div>

            {newsWithMedia.slice(1, 15).map((news: any) => {
                const miniImgMetaData = news['media'][0]['media-metadata'][0];
                return (
                    <div key={news['id']} className={styles.miniNews}>
                        <header className={styles.title}>
                            {news['title']}
                        </header>
                        <Image 
                            src={miniImgMetaData['url']}
                            alt={'article image'}
                            width={miniImgMetaData['width']}
                            height={miniImgMetaData['height']}
                        />
                    </div>
                )
            })}
        </div>
    )
}
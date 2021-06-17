import styles from '../../../styles/TrendingNow.module.scss'

import NewsWithSummary  from './newsCardWithDesc'
import NewsBrief from './newsLittleCard'

interface props {
    trendingNowData: any,
}

export default function TrendingNow({ trendingNowData }: props) {

    const newsWithMedia = trendingNowData.filter((news: any) => {
        if (news['media'].length !== 0) {
            return news
        }
    })

    return (
        <section
            className={styles.container}
        >
            <header className={styles.title}>Trending</header>
            <div className={styles.hrLine} />

            <div className={styles.newsContainer}>
                <div className={styles.highlight}>
                    <NewsWithSummary newsData={newsWithMedia[0]} />
                </div>
                
                {newsWithMedia.slice(1, 13).map((news: any) => {
                    return (
                        <div key={news['id']} className={styles.littleNews}>
                            <NewsBrief newsData={news} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
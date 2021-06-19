import styles from '../../../styles/TrendingNow.module.scss'

import NewsWithSummary  from './newsCardWithDesc'
import NewsBrief from './newsLittleCard'

interface props {
    trendingNowData: any,
    title: string,
    subtitle: string
}

export default function TrendingNow({ trendingNowData, title, subtitle }: props) {

    return (
        <section
            className={styles.container}
        >
            <div className={styles.header}>
                <header className={styles.title}>{title}</header>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className={styles.hrLine} />

            <div className={styles.newsContainer}>
                <div className={styles.highlight}>
                    <NewsWithSummary newsData={trendingNowData[0]} />
                </div>
                
                {trendingNowData.slice(1, 13).map((news: any) => {
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
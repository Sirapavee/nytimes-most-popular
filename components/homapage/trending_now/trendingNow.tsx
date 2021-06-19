import styles from '../../../styles/TrendingNow.module.scss'

import NewsWithSummary  from './newsCardWithDesc'
import NewsBrief from './newsLittleCard'

interface props {
    trendingNowData: any,
    title: string,
    subtitle: string,
    isBeingSearch: boolean
}

export default function TrendingNow({ trendingNowData, title, subtitle, isBeingSearch }: props) {

    return (
        <section
            className={styles.container}
            data-isbeingsearch={isBeingSearch}
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
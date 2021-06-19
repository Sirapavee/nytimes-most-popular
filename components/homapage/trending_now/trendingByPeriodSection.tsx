import styles from '../../../styles/TrendingByPeriodSection.module.scss'

import NewsWithSummary  from './newsCardWithDesc'
import NewsBrief from './newsLittleCard'

interface props {
    trendingPeriodData: any,
    title: string
}

export default function TrendingByPeriodSection({ trendingPeriodData, title }: props) {

    return (
        <section
            className={styles.container}
        >
            <div className={styles.header}>
                <header className={styles.title}>{title}</header>
            </div>
            <div className={styles.hrLine} />

            <div className={styles.newsContainer}>
                <div className={styles.highlight}>
                    <NewsWithSummary newsData={trendingPeriodData[0]} />
                </div>
                
                {
                    trendingPeriodData.length > 1 ?
                        trendingPeriodData.slice(1, ).map((news: any) => {
                            return (
                                <div key={news['id']} className={styles.littleNews}>
                                    <NewsBrief newsData={news} />
                                </div>
                            )
                        })
                    : <div />
                }
            </div>
        </section>
    )
}
import styles from '../../styles/SearchResults.module.scss'

import NewsWithSummary from '../../components/homapage/trending_now/newsCardWithDesc'
import ArticleBox from '../../components/section/article'

interface props {
    results: any,
    origin: string
}

export default function SearchResults({ results, origin }: props) {
    return (
        <section className={styles.container}>
            <div className={styles.holder} />
            {
                results.length > 0 ?
                    results.map((article: any) => {
                        return (
                            origin === 'index' ?
                                <div key={article['id']} className={styles.newsSummaryCard}>
                                    <NewsWithSummary newsData={article} />
                                    <div className={styles.hrLine} />
                                </div>
                            :
                                <ArticleBox key={article['id']} articleData={article} />
                        )
                    })
                :
                    <div className={styles.noResult}>
                        Sorry, there is no articles matched your search...
                    </div>
            }
        </section>
    )
}
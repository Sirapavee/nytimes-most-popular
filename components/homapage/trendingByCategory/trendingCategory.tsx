import styles from '../../../styles/TrendingByCategory.module.scss'

import Category from './category'

interface props {
    trendingCategoryData: any,
}

export default function TrendingByCategory({ trendingCategoryData }: props) {
    return (
        <section className={styles.container}>
            <div className={styles.categoryContainer}>
                <div className={styles.header}>
                    <header className={styles.title}>
                        Most Emailed
                    </header>
                    <p className={styles.subtitle}>
                        Most emailed articles today
                    </p>
                </div>
                <div className={styles.hrLine} />
                <Category categoryData={trendingCategoryData[0]} />
            </div>

            <div className={styles.vertLine} />

            <div className={styles.categoryContainer}>
                <div className={styles.header}>
                    <header className={styles.title}>
                        In Case You Missed It
                    </header>
                    <p className={styles.subtitle}>
                        A recap of last week&apos;s most popular articles
                    </p>
                </div>
                <div className={styles.hrLine} />
                <Category categoryData={trendingCategoryData[1]} />
            </div>

            <div className={styles.vertLine} />

            <div className={styles.categoryContainer}>
                <div className={styles.header}>
                    <header className={styles.title}>
                        Popular on Facebook
                    </header>
                    <p className={styles.subtitle}>
                        Most shared articles on Facebook today
                    </p>
                </div>
                <div className={styles.hrLine} />
                <Category categoryData={trendingCategoryData[2]} />
            </div>
        </section>
    )
}
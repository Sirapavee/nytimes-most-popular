import styles from '../../../styles/TrendingByPeriod.module.scss'

import TrendingByPeriodSection from './trendingByPeriodSection'

interface props {
    trendingPeriodData: any,
    title: string,
    subtitle: string
}

export default function TrendingByPeriod({ trendingPeriodData, title, subtitle }: props) {

    return (
        <section
            className={styles.container}
        >
            <div className={styles.header}>
                <header className={styles.title}>{title}</header>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className={styles.hrLine} />

            {
                Object.entries(trendingPeriodData).map((dataBySection: any) => {
                    return (
                        <TrendingByPeriodSection
                            key={dataBySection[0]}
                            trendingPeriodData={dataBySection[1]}
                            title={dataBySection[0]}
                        />
                    )
                })
            }
        </section>
    )
}
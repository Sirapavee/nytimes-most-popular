import styles from '../../../styles/TrendingByPeriod.module.scss'

import TrendingByPeriodSection from './trendingByPeriodSection'

interface props {
    trendingPeriodData: any,
    title: string,
    subtitle: string,
    isBeingSearch: boolean
}

export default function TrendingByPeriod({ trendingPeriodData, title, subtitle, isBeingSearch }: props) {

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
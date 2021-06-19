import Head from 'next/head'

import styles from '../styles/Home.module.scss'

import getArticles, { getSections, getPeriodSections } from '../articles/articles'

import NavigationBar from '../components/navigation/navbar'
import TrendingNow from '../components/homapage/trending_now/trendingNow'
import TrendingByPeriod from '../components/homapage/trending_now/trendingByPeriod'

interface props {
    bundledCategoryData: any,
    sectionList: any,
    periodSectionList: any
}

export default function Home({ bundledCategoryData, sectionList, periodSectionList }: props) {
    // console.log(periodSectionList['trendingNow'][Object.keys(periodSectionList['trendingNow'])[0]])
    return (
        <div className={styles.container}>
            <Head>
                <title>NY Times</title>
                <meta name="description" content="Homepage for most popular NY times articles" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <NavigationBar sectionList={sectionList} />

            <div className={styles.holder} />
            <TrendingByPeriod
                trendingPeriodData={periodSectionList['trendingNow']}
                title={'Trending Now'}
                subtitle={'Hello. These stories are most popular with our readers this minute.'}
            />
            <div className={styles.hrLine} />
            <TrendingByPeriod
                trendingPeriodData={periodSectionList['thisWeek']}
                title={'In Case You Missed It'}
                subtitle={"A recap of last week's most popular articles"}
            />
            <div className={styles.hrLine} />
            <TrendingByPeriod
                trendingPeriodData={periodSectionList['thisMonth']}
                title={'Monthly Top'}
                subtitle={'A catch up for last month popular stories'}
            />
            <div className={styles.hrLine} />
            <div className={styles.holder} />
        </div>
    )
}

export async function getServerSideProps() {
    const [trendingNow, thisWeek, thisMonth] = await getArticles()
    const sectionList = await getSections()
    const periodSectionList = await getPeriodSections()

    const bundledCategoryData = [trendingNow, thisWeek, thisMonth]

    if (!trendingNow && !thisWeek && !thisMonth && !sectionList && !periodSectionList) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            bundledCategoryData,
            sectionList,
            periodSectionList
        }
    }
}
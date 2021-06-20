import Head from 'next/head'
import { useState } from 'react'

import styles from '../styles/Home.module.scss'

import getArticles, { getSections, getPeriodSections } from '../articles/articles'

import ScrollArrow from '../components/scrollToTop'
import NavigationBar from '../components/navigation/navbar'
import TrendingByPeriod from '../components/homapage/trending_now/trendingByPeriod'
import SearchResults from '../components/navigation/searchResults'

import { removeDup, filterSearch } from '../utils/utilities'

interface props {
    allArticles: any,
    sectionList: any,
    periodSectionList: any
}

export default function Home({ allArticles, sectionList, periodSectionList }: props) {

    const [queryText, setQueryText] = useState('')

    const updateQueryText = (query: string) => {
        setQueryText(query)
    }

    const results = filterSearch(queryText, removeDup(allArticles))

    return (
        <div className={styles.container}>
            <Head>
                <title>Trending - NY Times</title>
                <meta name="description" content="Homepage for most popular NY times articles" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <NavigationBar 
                sectionList={sectionList} 
                queryUpdateSignal={updateQueryText} 
                query={queryText} 
            />

            <div className={styles.holder} />
            {
                queryText.length > 0 ?
                    <SearchResults results={results} origin={'index'} />
                : 
                    <div />
            }
            <TrendingByPeriod
                trendingPeriodData={periodSectionList['trendingNow']}
                title={'Trending Now'}
                subtitle={'Hello. These stories are most popular with our readers this minute.'}
                isBeingSearch={Boolean(queryText.length)}
            />
            <div className={styles.hrLine} data-isbeingsearch={Boolean(queryText.length)} />

            <TrendingByPeriod
                trendingPeriodData={periodSectionList['thisWeek']}
                title={'In Case You Missed It'}
                subtitle={"A recap of last week's most popular articles"}
                isBeingSearch={Boolean(queryText.length)}
            />
            <div className={styles.hrLine} data-isbeingsearch={Boolean(queryText.length)} />

            <TrendingByPeriod
                trendingPeriodData={periodSectionList['thisMonth']}
                title={'Monthly Top'}
                subtitle={'A catch up for last month popular stories'}
                isBeingSearch={Boolean(queryText.length)}
            />
            <div className={styles.hrLine} data-isbeingsearch={Boolean(queryText.length)} />
            <ScrollArrow />
            <div className={styles.holder} />
        </div>
    )
}

export async function getServerSideProps() {
    const [trendingNow, thisWeek, thisMonth] = await getArticles()
    const sectionList = await getSections()
    const periodSectionList = await getPeriodSections()

    const allArticles = [...trendingNow, ...thisWeek, ...thisMonth]

    if (!trendingNow && !thisWeek && !thisMonth && !allArticles && !sectionList && !periodSectionList) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            allArticles,
            sectionList,
            periodSectionList
        }
    }
}
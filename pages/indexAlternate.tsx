import Head from 'next/head'
import { useState } from 'react'

import styles from '../styles/Home.module.scss'

import getArticles, { getSections } from '../articles/articles'

import ScrollArrow from '../components/scrollToTop'
import NavigationBar from '../components/navigation/navbar'
import TrendingNow from '../components/homapage/trending_now/trendingNow'
import SearchResults from '../components/navigation/searchResults'

import { removeDup, filterSearch } from '../utils/utilities'

interface props {
  bundledCategoryData: any,
  sectionList: any
}

export default function HomeAlt({ bundledCategoryData, sectionList }: props) {

  const [queryText, setQueryText] = useState('')

    const updateQueryText = (query: string) => {
        setQueryText(query)
    }

    const allArticles = [
      ...bundledCategoryData[0], 
      ...bundledCategoryData[1], 
      ...bundledCategoryData[2]
    ]
    const results = filterSearch(queryText, removeDup(allArticles))
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Trending - NY Times</title>
        <meta name="description" content="Homepage for most popular NY times articles" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <NavigationBar sectionList={sectionList} queryUpdateSignal={updateQueryText} query={queryText} />
      <div className={styles.holder} />
      {
        queryText.length > 0 ?
            <SearchResults results={results} origin={'index'} />
        : 
            <div />
      }
      <TrendingNow 
          trendingNowData={bundledCategoryData[0]} 
          title={'Trending Now'}
          subtitle={'Good morning. These stories are most popular with our readers this minute.'}
          isBeingSearch={Boolean(queryText.length)}
      />
      <div className={styles.hrLine} data-isbeingsearch={Boolean(queryText.length)} />
      <TrendingNow 
          trendingNowData={bundledCategoryData[1]} 
          title={'In Case You Missed It'}
          subtitle={"A recap of last week's most popular articles"}
          isBeingSearch={Boolean(queryText.length)}
      />
      <div className={styles.hrLine} data-isbeingsearch={Boolean(queryText.length)} />
      <TrendingNow 
          trendingNowData={bundledCategoryData[2]} 
          title={'Monthly Top'}
          subtitle={'A catch up for last month popular stories'}
          isBeingSearch={Boolean(queryText.length)}
      />
      <ScrollArrow />
      <div className={styles.holder} />
    </div>
  )
}

export async function getServerSideProps() {
  const [trendingNow, thisWeek, thisMonth] = await getArticles()
  const sectionList = await getSections()

  const bundledCategoryData = [trendingNow, thisWeek, thisMonth]

  if (!trendingNow && !thisWeek && !thisMonth && !sectionList) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      bundledCategoryData,
      sectionList
    }
  }
}
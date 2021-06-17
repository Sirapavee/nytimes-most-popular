import Head from 'next/head'

import styles from '../styles/Home.module.scss'

import { fetchTrendingNow } from '../articles/trendingNow'
import { fetchMostEmailed, fetchLastWeek, fetchfacebook } from '../articles/categoryTrending'

import NavigationBar from '../components/navigation/navbar'
import TrendingNow from '../components/homapage/trending_now/trendingNow'
import TrendingByCategory from '../components/homapage/trendingByCategory/trendingCategory'

interface props {
  trendingNowData: any,
  bundledCategoryData: any[]
}

export default function Home({ trendingNowData, bundledCategoryData }: props) {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Trending - NY Times</title>
        <meta name="description" content="Homepage for most popular NY times articles" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <NavigationBar />
      <TrendingNow trendingNowData={trendingNowData} />
      <div className={styles.hrLine} />
      <TrendingByCategory trendingCategoryData={bundledCategoryData} />

    </div>
  )
}

export async function getServerSideProps() {
  const trendingNowData = await fetchTrendingNow()
  const mostEmailedData = await fetchMostEmailed()
  const lastWeekData = await fetchLastWeek()
  const facebookData = await fetchfacebook()

  const bundledCategoryData = [mostEmailedData, lastWeekData, facebookData]

  if (!trendingNowData && !mostEmailedData && !lastWeekData && !facebookData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      trendingNowData,
      bundledCategoryData
    }
  }
}
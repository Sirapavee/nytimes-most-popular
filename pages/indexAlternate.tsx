import Head from 'next/head'

import styles from '../styles/Home.module.scss'

import getArticles, { getSections } from '../articles/articles'

import NavigationBar from '../components/navigation/navbar'
import TrendingNow from '../components/homapage/trending_now/trendingNow'

interface props {
  bundledCategoryData: any,
  sectionList: any
}

export default function HomeAlt({ bundledCategoryData, sectionList }: props) {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Trending - NY Times</title>
        <meta name="description" content="Homepage for most popular NY times articles" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <NavigationBar sectionList={sectionList} />
      <div className={styles.holder} />
      <TrendingNow 
          trendingNowData={bundledCategoryData[0]} 
          title={'Trending Now'}
          subtitle={'Good morning. These stories are most popular with our readers this minute.'}
      />
      <div className={styles.hrLine} />
      <TrendingNow 
          trendingNowData={bundledCategoryData[1]} 
          title={'In Case You Missed It'}
          subtitle={"A recap of last week's most popular articles"}
      />
      <div className={styles.hrLine} />
      <TrendingNow 
          trendingNowData={bundledCategoryData[2]} 
          title={'Monthly Top'}
          subtitle={'A catch up for last month popular stories'}
      />
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
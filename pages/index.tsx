import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import NavigationBar from '../components/navbar'

interface props {
  data: any,
}

export default function Home({ data }: props) {

  async function fetchArticle() {
    const ret = await fetch(data.results[0].url, {
      method: 'GET',
    })
    const rets = await ret.text()

    var parser = new DOMParser()
    var doc = parser.parseFromString(rets, 'text/html')
    
    var p = doc.querySelector('p')
    console.log(p)
    return p

    // var oReq = new XMLHttpRequest();
    // oReq.open("GET", data.results[0].url);
    // oReq.send();
  }

  fetchArticle()
  // console.log(data.results[0].nytdsection)

  return (
    <div className={styles.container}>
      <Head>
        <title>Most Popular Articles</title>
        <meta name="description" content="Homepage for most popular NY times articles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />
      <h1>NY Times Most Popular</h1>

      <div dangerouslySetInnerHTML={{__html: `${fetchArticle()}`}} />

    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://api.nytimes.com/svc/mostpopular/v2/shared/7/facebook.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    }
  }
}
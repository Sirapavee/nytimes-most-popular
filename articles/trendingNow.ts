let trendingNowData = null

async function fetchTrendingNow() {
    const trendingNowRes = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
    trendingNowData = await trendingNowRes.json()

    if (!trendingNowData) {
        return {
          notFound: true,
        }
    }
    
    return trendingNowData['results']
}

export { fetchTrendingNow }
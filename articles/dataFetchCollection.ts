async function fetchTrendingNow() {
  const trendingNowRes = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
  const trendingNowData = await trendingNowRes.json()

  if (!trendingNowData) {
      return {
        notFound: true,
      }
  }
  
  return trendingNowData['results']
}

async function fetchThisWeek() {
  const lastWeekRes = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
  const lastWeekResData = await lastWeekRes.json()

  if (!lastWeekResData) {
      return {
        notFound: true,
      }
  }
  
  return lastWeekResData['results']
}

async function fetchThisMonth() {
  const lastMonthRes = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
  const lastMonthResData = await lastMonthRes.json()

  if (!lastMonthResData) {
      return {
        notFound: true,
      }
  }
  
  return lastMonthResData['results']
}

async function fetchMostEmailed() {
    const mostEmailedRes = await fetch('https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
    const mostEmailedResData = await mostEmailedRes.json()

    if (!mostEmailedResData) {
        return {
          notFound: true,
        }
    }
    
    return mostEmailedResData['results']
}

async function fetchfacebook() {
    const facebookRes = await fetch('https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
    const facebookResData = await facebookRes.json()

    if (!facebookResData) {
        return {
          notFound: true,
        }
    }
    
    return facebookResData['results']
}

export { fetchTrendingNow, fetchThisWeek, fetchThisMonth, fetchMostEmailed, fetchfacebook }
let mostEmailedResData = null
let lastWeekResData = null
let facebookResData = null

async function fetchMostEmailed() {
    const mostEmailedRes = await fetch('https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
    mostEmailedResData = await mostEmailedRes.json()

    if (!mostEmailedResData) {
        return {
          notFound: true,
        }
    }
    
    return mostEmailedResData['results']
}

async function fetchLastWeek() {
    const lastWeekRes = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
    lastWeekResData = await lastWeekRes.json()

    if (!lastWeekResData) {
        return {
          notFound: true,
        }
    }
    
    return lastWeekResData['results']
}

async function fetchfacebook() {
    const facebookRes = await fetch('https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=xxkRrp8zX6r9bwQY5reOfem1VJSphGZJ')
    facebookResData = await facebookRes.json()

    if (!facebookResData) {
        return {
          notFound: true,
        }
    }
    
    return facebookResData['results']
}

export { fetchMostEmailed, fetchLastWeek, fetchfacebook }
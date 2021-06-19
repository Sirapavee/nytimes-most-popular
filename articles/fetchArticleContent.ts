import getArticles from '../articles/articles'

async function getAllArticlesId() {

    const [trendingNow, thisWeek, thisMonth] = await getArticles()
    const bundledData = [...trendingNow, ...thisWeek, ...thisMonth]
    
    return (
        bundledData.map((article: any) => {
            return {
                params: {
                    id: article['id'].toString()
                }
            }
        })
    )
    
}

async function getArticleData(id: number) {

    const [trendingNow, thisWeek, thisMonth] = await getArticles()
    const bundledData = [...trendingNow, ...thisWeek, ...thisMonth]

    const articlesData = bundledData.map((article: any) => {
        return JSON.parse(JSON.stringify(article))
    })

    const articleData = articlesData.filter((item: any) => {
        return item['id'] == id
    })[0]

    let [htmlContent] = await Promise.all([
        fetchArticleHTMLData(articleData['url'])
    ])
    
    const html = JSON.parse(JSON.stringify(htmlContent))

    return {
        id,
        articleData,
        html
    }

}

async function fetchArticleHTMLData(url: string) {

    const fetchedArticle = await fetch(url, {
        method: 'GET',
    })
    const textedFetchedArticle = await fetchedArticle.text()

    const jsdom = require('jsdom')
    const { JSDOM } = jsdom

    const dom = new JSDOM(textedFetchedArticle)
    
    const articleContent = dom.window.document.querySelector('.NYTAppHideMasthead')
    articleContent.style.setProperty('display', 'none', "important")
    articleContent.style.setProperty('z-index', 0, "important")
    
    // console.log(articleContent.style)

    return textedFetchedArticle

}

export { getAllArticlesId, getArticleData }
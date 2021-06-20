import fs from 'fs'
import path from 'path'

import { fetchTrendingNow, fetchThisWeek, fetchThisMonth } from './dataFetchCollection'

const filterOnlyHasMedia = (list: any) => {
    const newsWithMedia = list.filter((news: any) => {
        if (news['media'].length != 0) {
            return news
        }
    })
    return newsWithMedia
}

const populateObject = (arr: any[], obj: any) => {

    arr.forEach((article: any) => {

        if (obj.hasOwnProperty(article['section'])) {
            if (article['media'].length != 0) {
                obj[article['section']].push(article)
            }
        }
        else {
            if (article['media'].length != 0) {
                obj[article['section']] = [article]
            }
        }
        
    })
    
}

const fetchArticlesData = async () => {
    
    try {
        const [trendingNow, thisWeek, thisMonth] = await Promise.all([
            fetchTrendingNow(),
            fetchThisWeek(),
            fetchThisMonth()
        ])

        const trendingWithMedia = filterOnlyHasMedia(trendingNow)
        const thisWeekWithMedia = filterOnlyHasMedia(thisWeek)
        const thisMonthWithMedia = filterOnlyHasMedia(thisMonth)

        return [trendingWithMedia, thisWeekWithMedia, thisMonthWithMedia]
    }
    catch (err) {
        console.log(err)
    }

}

const ARTICLES_CACHE_PATH = path.resolve('.articles')
const SECTIONS_CACHE_PATH = path.resolve('.sections')
const PERIOD_SECTIONS_CACHE_PATH = path.resolve('.periodSection')

export default async function getArticles() {

    let cachedArticleData

    try {
        cachedArticleData = JSON.parse(
            fs.readFileSync(ARTICLES_CACHE_PATH, 'utf8')
        )
    }
    catch (err) {
        console.log('Sections cache not initialized')
    }

    if (!cachedArticleData) {
        const data = await fetchArticlesData()

        try {
            fs.writeFileSync(
                ARTICLES_CACHE_PATH,
                JSON.stringify(data),
                'utf8'
            )
            console.log('wrote to articles cache')
        }
        catch (err) {
            console.log('ERROR WRITING ARTICLES CACHE TO FILE')
            console.log(err)
        }

        cachedArticleData = data
    }

    return cachedArticleData
}

async function getSections() {

    let cachedSectionData

    try {
        cachedSectionData = JSON.parse(
            fs.readFileSync(SECTIONS_CACHE_PATH, 'utf8')
        )
    }
    catch (err) {
        console.log('Sections cache not initialized')
    }

    if (!cachedSectionData) {
        const sectionList: any = {}
        const [trendingNow, thisWeek, thisMonth] = await getArticles()
        const bundledData = [...trendingNow, ...thisWeek, ...thisMonth]

        populateObject(bundledData, sectionList)

        try {
            fs.writeFileSync(
                SECTIONS_CACHE_PATH,
                JSON.stringify(sectionList),
                'utf8'
            )
            console.log('wrote to sections cache')
        }
        catch (err) {
            console.log('ERROR WRITING SECTIONS CACHE TO FILE')
            console.log(err)
        }

        cachedSectionData = sectionList
    }

    return cachedSectionData
}

async function getPeriodSections() {

    let cachedSectionData

    try {
        cachedSectionData = JSON.parse(
            fs.readFileSync(PERIOD_SECTIONS_CACHE_PATH, 'utf8')
        )
    }
    catch (err) {
        console.log('Period_Section cache not initialized')
    }

    if (!cachedSectionData) {
        const sectionList: any = {
            'trendingNow': {},
            'thisWeek': {},
            'thisMonth': {}
        }
        const [trendingNow, thisWeek, thisMonth] = await getArticles()

        populateObject(trendingNow, sectionList['trendingNow'])
        populateObject(thisWeek, sectionList['thisWeek'])
        populateObject(thisMonth, sectionList['thisMonth'])

        try {
            fs.writeFileSync(
                PERIOD_SECTIONS_CACHE_PATH,
                JSON.stringify(sectionList),
                'utf8'
            )
            console.log('wrote to periodSection cache')
        }
        catch (err) {
            console.log('ERROR WRITING PERIOD_SECTION CACHE TO FILE')
            console.log(err)
        }

        cachedSectionData = sectionList
    }

    return cachedSectionData
}

export { getSections, getPeriodSections }
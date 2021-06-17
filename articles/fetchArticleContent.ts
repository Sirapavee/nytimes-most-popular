async function fetchArticle(data: any) {
    const fetchedArticle = await fetch(data.results[0].url, {
        method: 'GET',
    })
    const textedFetchedArticle = await fetchedArticle.text()

    // var parser = new DOMParser()
    // var doc = parser.parseFromString(text, 'text/html')
    
    // var articleContent = doc.querySelectorAll('.StoryBodyCompanionColumn')
    // let mod =  articleContent[0].querySelectorAll('p')[0].querySelectorAll('a')[0]
    // mod['className'] = 'haha'
    // console.log(mod['className'])
    // console.log(mod['innerHTML'])

    return textedFetchedArticle
}

export { fetchArticle }
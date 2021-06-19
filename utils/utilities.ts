export const removeDup = (arr: any[]) => {
    const uniques = arr.reduce((unique: any, curArticle: any) => {
        if(!unique.some((otherArticle: any) => otherArticle['id'] === curArticle['id'])) {
          unique.push(curArticle);
        }
        return unique;
    },[]);

    return uniques
}

export const filterSearch = (queryText: string, arr: any[]) => {
    let results: any[] = []

    if (queryText.length > 0) {
        let pattern = new RegExp(queryText.replace(/(.{1})/g,"$1\\s*"), 'i'); 
        
        results = arr.filter((article: any) => {
            if (pattern.test(article['title'])) {
                return article
            }
        })
    }

    return results
}
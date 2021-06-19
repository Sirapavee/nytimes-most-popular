import { getSections } from '../articles/articles'

async function getAllSectionId() {

    const sectionList = await getSections()
    const sectionListKeys = Object.keys(sectionList)
    
    return (
        sectionListKeys.map((key: string) => {
            return {
                params: {
                    section: key.toString()
                }
            }
        })
    )
    
}

async function getSectionData(section: string) {

    const sectionList = await getSections()

    const sectionData = sectionList[section]

    return {
        section,
        sectionData
    }

}

export { getAllSectionId, getSectionData }
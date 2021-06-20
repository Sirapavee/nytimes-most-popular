import Head from 'next/head'
import { useState } from 'react'

import styles from '../../styles/Section.module.scss'

import { getSections } from '../../articles/articles'
import { getAllSectionId, getSectionData } from '../../articles/fetchSectionContent'

import ScrollArrow from '../../components/scrollToTop'
import NavigationBar from '../../components/navigation/navbar'
import ArticleBox from '../../components/section/article'
import SearchResults from '../../components/navigation/searchResults'

import { removeDup, filterSearch } from '../../utils/utilities'

interface props {
    sectionData: any,
    sectionList: any
}

export default function Article({ sectionData, sectionList }: props) {

    const [queryText, setQueryText] = useState('')

    const updateQueryText = (query: string) => {
        setQueryText(query)
    }

    const sectionDataUnique = removeDup(sectionData.sectionData)
    const results = filterSearch(queryText, sectionDataUnique)
    
    return(
        <div className={styles.container}>
            <Head>
                <title>{sectionData.section}</title>
                <meta name="description" content="Most popular NY times articles by section" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            
            <NavigationBar sectionList={sectionList} queryUpdateSignal={updateQueryText} query={queryText} />
            
            {
                queryText.length > 0 ?
                    <SearchResults results={results} origin={'section'} />
                :
                    <div>
                        <header className={styles.header}>
                            <h1>{sectionData.section}</h1>
                        </header>
                        {
                            sectionDataUnique.map((article: any) => {
                                return (
                                    <ArticleBox key={article['id']} articleData={article} />
                                )
                            })
                        }
                    </div>
            }
            {/* {
                sectionDataUnique.map((article: any) => {
                    return (
                        <ArticleBox key={article['id']} articleData={article} />
                    )
                })
            } */}
            <ScrollArrow />
        </div>
    );
}

export async function getStaticPaths() {
    const paths = await getAllSectionId();
    return {
        paths,
        fallback: false
    }
}

interface props {
    params: any
}

export async function getStaticProps({ params }: props) {
    const sectionData = await getSectionData(params.section);
    const sectionList = await getSections()
    
    return {
        props: {
            sectionData,
            sectionList
        }
    }
}
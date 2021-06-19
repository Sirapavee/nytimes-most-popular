import Head from 'next/head'

import styles from '../../styles/Section.module.scss'

import { getSections } from '../../articles/articles'
import { getAllSectionId, getSectionData } from '../../articles/fetchSectionContent'

import NavigationBar from '../../components/navigation/navbar'
import ArticleBox from '../../components/section/article'

interface props {
    sectionData: any,
    sectionList: any
}

export default function Article({ sectionData, sectionList }: props) {

    // log length of data
    // console.log(sectionData.sectionData.length)
    
    const sectionDataUnique = sectionData.sectionData.reduce((unique: any, curArticle: any) => {
        if(!unique.some((otherArticle: any) => otherArticle['id'] === curArticle['id'])) {
          unique.push(curArticle);
        }
        return unique;
    },[]);

    return(
        <div className={styles.container}>
            <Head>
                <title>{sectionData.section}</title>
                <meta name="description" content="Most popular NY times articles by section" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            
            <NavigationBar sectionList={sectionList} />
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
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import styles from '../../styles/AnArticle.module.scss'

import { getAllArticlesId, getArticleData } from '../../articles/fetchArticleContent'
import { getSections } from '../../articles/articles'

import SideBar from '../../components/navigation/sidebar'

interface props {
    articleData: any,
    sectionList: any
}

export default function AnArticle({ articleData, sectionList }: props) {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    const openSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }

    return(
        <section>
            <Head>
                <title>{articleData.articleData['title']}</title>
                <meta name="description" content="One of the most popular NY times articles" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <span onClick={openSideBar} className={styles.sidebarbtn}>
                <Image 
                    src={'/menu.svg'}
                    alt={'side bar button'}
                    width={20}
                    height={15}
                />
            </span>
            <div className={styles.sideBar}>
                <SideBar status={isSideBarOpen} signal={openSideBar} sectionList={sectionList} query={'from id'} />
            </div>
            
            <article>
                <div dangerouslySetInnerHTML={{ __html: articleData.html }} />
            </article>
        </section>
    );
}

export async function getStaticPaths() {
    const paths = await getAllArticlesId();
    return {
        paths,
        fallback: false
    }
}

interface props {
    params: any
}

export async function getStaticProps({ params }: props) {
    const articleData = await getArticleData(params.id)
    const sectionList = await getSections()
    
    return {
        props: {
            articleData,
            sectionList
        }
    }
}
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../../styles/AnArticle.module.scss'

import { getAllArticlesId, getArticleData } from '../../articles/fetchArticleContent'

interface props {
    articleData: any
}

export default function AnArticle({ articleData }: props) {
    return(
        <section>
            <Head>
                <title>{articleData.articleData['title']}</title>
                <meta name="description" content="One of the most popular NY times articles" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            
            <div className={styles.backBtn}>
                <Link href={'/'}>
                    <a>
                        <Image 
                            src={'/back_arrow.svg'}
                            alt={'back to menu'}
                            width={50}
                            height={50}
                        />
                    </a>
                </Link>
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
    
    return {
        props: {
            articleData
        }
    }
}
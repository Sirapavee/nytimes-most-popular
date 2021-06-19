import styles from '../../styles/SearchBarResponsive.module.scss'

interface props {
    signal: any,
    jumpToResultSignal: any,
    query: string
}

export default function SearchBarResponsive({ signal, jumpToResultSignal, query }: props) {
    return (
        <section
            className={styles.container}
        >
            <input 
                id={'searchFieldRes'} 
                name={'search'} 
                type={'text'} 
                placeholder={'SEARCH'} 
                required 
                className={styles.searchField}
                onChange={input => signal(input.target.value)}
                value={query}
            ></input>
            <button id={'submitBtnRes'} className={styles.submitBtn} onClick={jumpToResultSignal}>GO</button>
        </section>
    )
}
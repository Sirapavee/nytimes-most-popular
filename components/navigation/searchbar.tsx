import styles from '../../styles/SearchBar.module.scss'

interface props {
    isOpen: boolean,
    signal: any,
    query: string
}

export default function SearchBar({ isOpen, signal, query }: props) {

    return (
        <section
            className={styles.container}
            data-isopen={isOpen}
        >
            <input 
                id={'searchField'} 
                name={'search'} 
                type={'text'} 
                placeholder={'SEARCH'} 
                required 
                className={styles.searchField}
                onChange={input => signal(input.target.value)}
                value={query}
            ></input>
        </section>
    )
}
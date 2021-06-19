import styles from '../../styles/SearchBar.module.scss'

interface props {
    isOpen: boolean,
}

export default function SearchBar({ isOpen }: props) {
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
            ></input>
            <button id={'submitBtn'} className={styles.submitBtn} type={'submit'}>GO</button>
        </section>
    )
}
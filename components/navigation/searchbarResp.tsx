import styles from '../../styles/SearchBarResponsive.module.scss'

export default function SearchBarResponsive() {
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
            ></input>
            <button id={'submitBtnRes'} className={styles.submitBtn} type={'submit'}>GO</button>
        </section>
    )
}
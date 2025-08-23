import styles from './Heading.module.css'

const Heading = ({ subtitle, title, titleHighlight }: {
    subtitle: string, title: string, titleHighlight: string
}) => {

    return (
        <>
            <div className={styles.heading}>
                <span className={styles.subtitle}>{subtitle}</span>
                <h2 className={styles.title}>
                    {title} <span className={styles.highlight}> {titleHighlight}</span>
                </h2>
            </div>
        </>
    )
}

export default Heading
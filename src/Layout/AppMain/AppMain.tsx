import styles from './AppMain.module.scss'
export default function AppMain({
    children,
}: {
    children: React.ReactNode
}){
    return (
        <div className={styles.AppMain}>
            {children}
        </div>
    )
}
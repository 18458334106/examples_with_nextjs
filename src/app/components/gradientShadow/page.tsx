import styles from './gradientShadow.module.scss'

export default function GradientShadow(){
    return (
        <div className={`${styles.container} flexRowCenterAll`}>
            <div className={styles.box}></div>
        </div>
    )
}
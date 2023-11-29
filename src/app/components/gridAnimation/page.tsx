import style from './gridAnimation.module.scss'

export default function GridAnimation(){
    const containerClass = () =>{
        return `${style.container} flexColumnCenterAll`
    }
    return (
        <div className={containerClass()}>
            <div className={style.content}>
                <div className={style.item}></div>
                <div className={style.item}></div>
                <div className={style.item}></div>
                <div className={style.item}></div>
                <div className={style.item}></div>
                <div className={style.item}></div>
                <div className={style.item}></div>
                <div className={style.item}></div>
                <div className={style.item}></div>
            </div>
        </div>
    )
}
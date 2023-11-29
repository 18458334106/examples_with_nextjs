import style from './sassStarSky.module.scss'

export default function SassStarSky(){
    return (
        <div className={style.container}>
            <div className={style.layer1}></div>
            <div className={style.layer2}></div>
            <div className={style.layer3}></div>
        </div>
    )
}
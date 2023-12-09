import styles from './rotatoSwipper.module.scss';
import Image from 'next/image';
export default function RotatoSwipper(){
    let imgsArr = [
        `http://picsum.photos/640/640?t=${new Date().getTime() + 1}`,
        `http://picsum.photos/640/640?t=${new Date().getTime() + 2}`,
        `http://picsum.photos/640/640?t=${new Date().getTime() + 3}`,
        `http://picsum.photos/640/640?t=${new Date().getTime() + 4}`,
        `http://picsum.photos/640/640?t=${new Date().getTime() + 5}`,
        `http://picsum.photos/640/640?t=${new Date().getTime() + 6}`,
    ]
    return (
        <div className={styles.container}>
             <div className={styles.content}>
                <div className={styles.inner}>
                    {
                        imgsArr.map((item,index)=>{
                            return (
                                <Image className={styles.image}
                                    key={index} src={item} alt='' width={200} height={200} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
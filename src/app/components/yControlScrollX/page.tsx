"use client"
import styles from './yControlScrollX.module.scss'
import { useState,useEffect } from 'react'
import Image from 'next/image'
export default function YControlScrollX(){
    let [
        scroll_container,
        setScrollContainer
    ] = useState<any | null>(null)
    let [imgArr,setImgArr] = useState<any[] | null>(null)
    useEffect(()=>{
        !scroll_container
            &&
        setScrollContainer(document.getElementById(styles.scroll_container))
        if(!imgArr && scroll_container){
            let arr:any[] = []
            for (let index = 0; index < 5; index++) {
                arr.push(`http://picsum.photos/${scroll_container.offsetHeight}/${scroll_container.offsetWidth}?t=${new Date().getTime() + index}`)
            }
            setImgArr(arr)
        }
    })
    return (
        <div className='container' id={styles.scroll_container}>
            {
                scroll_container ?
                (
                    <div className={styles.v_scroll} style={{
                        'width': scroll_container.offsetHeight + 'px',
                        'height': scroll_container.offsetWidth + 'px',
                        'transform': `translateY(${scroll_container.offsetHeight}px) rotate(-90deg)`
                    }}>
                        <div className={styles.content} style={{
                            'left':`${scroll_container.offsetHeight}px`,
                            'height':`${scroll_container.offsetHeight}px`
                        }}>
                            <div className={styles.card_list} style={{
                                'left':`0`,
                                'height':`${scroll_container.offsetHeight}px`,
                                'transform': `translateY(${scroll_container.offsetHeight}px) rotate(-90deg)`
                            }}>
                                {
                                    imgArr && imgArr.map((item:any,index:number)=>(
                                        <div className="card-item" key={index}>
                                            <Image src={item} alt='' 
                                                width={scroll_container.offsetHeight}
                                                height={scroll_container.offsetWidth} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : ''
            }
        </div>
    )
}
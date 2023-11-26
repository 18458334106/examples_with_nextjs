"use client"
import { useEffect, useState } from 'react';
import style from './cssFilter.module.scss'

export default function CSSFilter(){
    let innerWidth,innerHeight;
    let [imgUrl,setImgUrl] = useState<any>(null)
    const timeId = new Date().getTime()
    useEffect(()=>{
        if(!imgUrl){
            innerWidth = window.innerWidth
            innerHeight = window.innerHeight
            setImgUrl(`http://picsum.photos/${innerWidth}/${innerHeight}?t=${timeId}`)
        }
    })
    return (
        <div className={style.container} style={{background:`url(${imgUrl}) no-repeat`}}>
            <div className={style.modal}></div>
        </div>
    )
}
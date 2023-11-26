"use client"
import { useEffect, useState } from 'react'
import style from './svgAnimation.module.scss'

export default function SvgAnimation(){
    let paths;
    useEffect(()=>{
        paths = window.document.querySelectorAll(`.icon ${style.p}`)
        paths.forEach(path => {
            //@ts-ignore
            const len = path.getTotalLength()
            //@ts-ignore
            path.style.setProperty('--l',len)
        })
    })
    return (
        <div className="container flexColumnCenterAll">
            <svg t="1688800135925" className="icon" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2449" width="500" height="500">
                <path className={style.p} d="M938.666667 955.733333h-85.333334a17.066667 17.066667 0 0 1-17.066666-17.066666v-17.066667H187.733333v17.066667a17.066667 17.066667 0 0 1-17.066666 17.066666H85.333333a17.066667 17.066667 0 0 1-17.066666-17.066666v-85.333334a17.066667 17.066667 0 0 1 17.066666-17.066666h17.066667V187.733333H85.333333a17.066667 17.066667 0 0 1-17.066666-17.066666V85.333333a17.066667 17.066667 0 0 1 17.066666-17.066666h85.333334a17.066667 17.066667 0 0 1 17.066666 17.066666v17.066667h648.533334V85.333333a17.066667 17.066667 0 0 1 17.066666-17.066666h85.333334a17.066667 17.066667 0 0 1 17.066666 17.066666v85.333334a17.066667 17.066667 0 0 1-17.066666 17.066666h-17.066667v648.533334h17.066667a17.066667 17.066667 0 0 1 17.066666 17.066666v85.333334a17.066667 17.066667 0 0 1-17.066666 17.066666z m-68.266667-34.133333h51.2v-51.2h-51.2v51.2zM102.4 921.6h51.2v-51.2H102.4v51.2z m85.333333-34.133333h648.533334v-34.133334a17.066667 17.066667 0 0 1 17.066666-17.066666h34.133334V187.733333h-34.133334a17.066667 17.066667 0 0 1-17.066666-17.066666V136.533333H187.733333v34.133334a17.066667 17.066667 0 0 1-17.066666 17.066666H136.533333v648.533334h34.133334a17.066667 17.066667 0 0 1 17.066666 17.066666v34.133334zM904.533333 153.6h17.066667V102.4h-51.2v51.2h34.133333zM119.466667 153.6h34.133333V102.4H102.4v51.2h17.066667z" p-id="2450"></path>
            </svg>
        </div>
    )
}
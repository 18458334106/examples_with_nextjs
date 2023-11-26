"use client"
import { useEffect,useState } from 'react';
import styles from './snow.module.scss'

export default function snow(){
    let container,offsetWidth:any,offsetHeight:any;
    let canvas,ctx:any;
    let nums = 200
    let snows:any[] = []
    let [imgUrl,setImgUrl] = useState<any>('')
    const move = () => {
        //@ts-ignore
        snows.forEach((snow, index) => {
            snow.x += Math.random() * 2 + 1
            snow.y += Math.random() * 2 + 1
            //@ts-ignore
            if (snow.y > offsetHeight) {
                snow.y = 0
            }
            //@ts-ignore
            if (snow.x > offsetWidth) {
                snow.x = 0
            }
        })
    }

    const draw = () => {
        //@ts-ignore
        ctx.clearRect(0, 0, offsetWidth, offsetHeight)
        //@ts-ignore
        ctx.fillStyle = '#fff'
        //@ts-ignore
        ctx.fillRect(0, 0, offsetWidth, offsetHeight)
        //@ts-ignore
        snows.forEach((snow) => {
            //@ts-ignore
            ctx.clearRect(0,0,offsetWidth,offsetHeight)
            //@ts-ignore
            ctx.beginPath()
            //@ts-ignore
            ctx.fillStyle = '#fff'
            //@ts-ignore
            ctx.shadowColor = '#fff'
            //@ts-ignore
            ctx.shadowBlur = 10
            //@ts-ignore
            snows.forEach(snow=>{
                //@ts-ignore
                ctx.moveTo(snow.x,snow.y)
                //@ts-ignore
                ctx.arc(snow.x,snow.y,snow.r,0,Math.PI * 2,true)
            })
            //@ts-ignore
            ctx.fill()
            //@ts-ignore
            ctx.closePath()
        })
        move()
    }
    useEffect(()=>{
        container = document.getElementById("container_snow");
        if(container && imgUrl === ''){
            //@ts-ignore
            offsetWidth = container.offsetWidth;
            //@ts-ignore
            offsetHeight = container.offsetHeight;
            setImgUrl(`http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime()}`)
            canvas = document.getElementById('myCanvas')
            //@ts-ignore
            ctx = canvas.getContext('2d')
            //@ts-ignore
            canvas.width = offsetWidth
            //@ts-ignore
            canvas.height = offsetHeight
            for (let i = 0; i < nums; i++) {
                snows.push({
                    x: Math.random() * offsetWidth,
                    y: Math.random() * offsetHeight,
                    r: Math.random() * 4 + 1,
                })
            }
            setInterval(draw, 1)
        }
    })
    return (
        <div id="container_snow" className={styles.container}>
            <img className={styles.snowBg} src={imgUrl} />
            <canvas id="myCanvas"></canvas>
        </div>
    )
}
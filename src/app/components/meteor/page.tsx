"use client"
import { useEffect } from 'react';
import styles from './meteor.module.scss'

export default function Meteor(){
    //@ts-ignore
    let canvas,ctx;
    //@ts-ignore
    let meteors = []
    let allstar = 40
    const init = () => {
        for (let i= 0; i< allstar; i++) {
            newmeteor()
        }
    }
    const newmeteor = () => {
        meteors.push({
            lines: [{
                //@ts-ignore
                x: parseInt(Math.random()*canvas.width),
                //@ts-ignore
                y: parseInt(Math.random()*canvas.height * 0.7),
            }],
            //@ts-ignore
            life: parseInt(Math.random() * 100) + 100,
            age: 0
        })
    }
    const draw = () => {
        //@ts-ignore
        ctx.clearRect(0,0,canvas.width, canvas.height)
        for(let i = 0; i < meteors.length; i++){
            //@ts-ignore
            let meteor = meteors[i]
            let lines = meteor.lines
            for(let j = 0;j < lines.length; j++) {
                //@ts-ignore
                ctx.fillStyle = `rgba(255,255,255,${j / lines.length})`
                //@ts-ignore
                ctx.fillRect(lines[j].x,lines[j].y,1,1)
            }
            //@ts-ignore
            ctx.fillstyle = 'yellow'
            let s_head = lines[lines.length-1]
            //@ts-ignore
            ctx.fillRect(s_head.x, s_head.y,2,2)
            if(meteor.age <= meteor.life / 2){
                lines.push({x: s_head.x - 1,y: s_head.y + 0.3})
            }else{
                lines.shift()
            }
            meteor.age++
            if(meteor.age >= meteor.life){
                //@ts-ignore
                meteors.splice(i,1)
                newmeteor()
            }
        }
    }
    useEffect(()=>{
        canvas = document.getElementById('myCanvas')
        //@ts-ignore
        ctx = canvas.getContext('2d')
        //@ts-ignore
        canvas.width = window.innerWidth
        //@ts-ignore
        canvas.height = window.innerHeight - 50
        //@ts-ignore
        init()
        setInterval(draw, 10)
    })
    return (
        <div className={styles.container}>
            <canvas id="myCanvas"></canvas>
        </div>
    )
}
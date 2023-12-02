"use client"
import { useEffect, useState } from 'react'
import styles from './dragAPIDemo.module.scss'
import Filp from './flip.js'
export default function DragAPIDemo() {
    let list:HTMLElement | null;
    let flip:any;
    useEffect(()=>{
        list = document.querySelector(`.${styles.list}`)
        console.log(list);
        //@ts-ignore
        let sourceNode;
        //@ts-ignore
        list.ondragstart = (e:any)=>{
            setTimeout(()=>{
                e.target.classList.add(styles.moving)
            },0)
            e.dataTransfer.effectAllowed = "move"
            sourceNode = e.target;
            flip = new Filp(list?.children, 0.3);
        }
        //@ts-ignore
        list.ondragenter = (e:any)=>{
            e.preventDefault();
            //@ts-ignore
            if([sourceNode,list].includes(e.target)){
                return
            }
            //@ts-ignore
            let sourceIndex = [...list.children].indexOf(sourceNode)
            //@ts-ignore
            let targetIndex = [...list.children].indexOf(e.target)
            if(sourceIndex<targetIndex){
                //@ts-ignore
                list?.insertBefore(sourceNode,e.target.nextElementSibling)
            }else{
                //@ts-ignore
                list?.insertBefore(sourceNode,e.target)
            }
            //@ts-ignore
            flip.play()
        }
        //@ts-ignore
        list.ondragover = (e:any)=>{
            e.preventDefault();
        }
        //@ts-ignore
        list.ondragover = (e:any)=>{
            e.target.classList.remove(styles.moving)
        }
    },[])
    return (
        <div className='container flexRowCenterAll'>
            <div className={styles.list}>
                <div draggable={true} className={styles.listItem}>1</div>
                <div draggable={true} className={styles.listItem}>2</div>
                <div draggable={true} className={styles.listItem}>3</div>
                <div draggable={true} className={styles.listItem}>4</div>
                <div draggable={true} className={styles.listItem}>5</div>
            </div>
        </div>
    )
}

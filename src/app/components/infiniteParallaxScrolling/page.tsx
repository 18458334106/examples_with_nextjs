"use client"
import { useEffect, useState } from "react";
import './infiniteParallaxScrolling.scss'
function InfiniteParallaxScrolling(){
    let container:any;
    let offsetWidth,offsetHeight,imgArr:any;
    let curIndex = 0;
    let isAnimation = false;
    const getPrevIndex = () => {
        return curIndex === 0 ? imgArr.length - 1 : curIndex - 1
    }
    const getNextIndex = () => {
        return curIndex === imgArr.length - 1 ? 0 : curIndex + 1
    }
    const createElement = (i:number) => {
        const div = document.createElement('div')
        div.className = 'item'
        const img = document.createElement('img')
        img.src = imgArr[i]
        div.appendChild(img)
        //@ts-ignore
        container.appendChild(div)
        return div;
    }
    const resetElement = () => {
        //@ts-ignore
        container.innerHTML = ''
        let prevIndex = getPrevIndex();
        let nextIndex = getNextIndex();
        createElement(prevIndex).classList.add('pre');
        createElement(curIndex).classList.add('cur');
        createElement(nextIndex).classList.add('next');
    }
    
    useEffect(()=>{
        container = document.getElementById("scroll-container")
        if(container){
            offsetWidth = container.offsetWidth;
            offsetHeight = container.offsetHeight;
            imgArr = [
                `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 1}`,
                `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 2}`,
                `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 3}`,
                `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 4}`,
                `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 5}`
            ]
            resetElement()
            window.addEventListener('wheel',(e)=>{
                if(!e.deltaY || isAnimation){
                    return
                }
                isAnimation = true
                console.log(e.deltaY);
                if(e.deltaY > 0){
                    curIndex = getNextIndex()
                    //@ts-ignore
                    container.classList.add('scroll-down')
                }else{
                    curIndex = getPrevIndex()
                    //@ts-ignore
                    container.classList.add('scroll-up')
                }
            })
    
            container.addEventListener('transitionend',()=>{
                //@ts-ignore
                container.classList.remove('scroll-down')
                //@ts-ignore
                container.classList.remove('scroll-up')
                isAnimation = false
                resetElement()
            })
        }
    })
    return (
        <div id="scroll-container" className="scroll-container"></div>
    )
}
export default InfiniteParallaxScrolling;
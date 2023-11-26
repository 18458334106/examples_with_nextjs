"use client"
import style from './colorThief.module.scss'
import { Component } from 'react';
//@ts-ignore
import colorthief from 'colorthief';
const setFontSize = () => {
    let doc = document.documentElement
    let fontSize = doc.clientWidth / 120 > 12 ? doc.clientWidth / 120 : 12
    return fontSize
}

export default class ColorThief extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imgsArr:[]
        }
    }
    handleMouseEnter = async (e:any) => {
        const html = document.documentElement
        let img = e.target
        const colorThief = new colorthief()
        let colors = await colorThief.getPalette(img,3)
        colors = colors.map((item: any[]) => `rgb(${item[0]},${item[1]},${item[2]})`)
        html.style.setProperty('--c1', colors[0])
        html.style.setProperty('--c2', colors[1])
        html.style.setProperty('--c3', colors[2])
    }
    handleMouseLeave = () => {
        const html = document.documentElement
        html.style.setProperty('--c1', '#fff')
        html.style.setProperty('--c2', '#fff')
        html.style.setProperty('--c3', '#fff')
    }
    componentDidMount(){
        let arr = []
        for (let index = 0; index < 4; index++) {
            let timeId = new Date().getTime() + index
            let size = parseInt(setFontSize().toFixed(2)) * 20
            arr.push(`http://picsum.photos/${size}/${size}?t=${timeId}`)
        }
        this.setState({imgsArr:arr})
    }
    render(){
        return (
            <div className={`${style.container} flexRowCenterAll`}>
                <div className={`${style.imgs} flexRowCenterAll`}>
                    {
                        this.state.imgsArr.map((item:any,index:any)=>{
                            return (
                                <img key={index} src={item}
                                    alt=""
                                    id={`img${index}`}
                                    crossOrigin='anonymous'
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseLeave={this.handleMouseLeave} 
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
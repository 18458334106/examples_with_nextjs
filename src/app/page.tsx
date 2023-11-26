"use client"
import { useRouter } from "next/navigation"
import styles from "./page.module.scss"
import { examplesArr,get_examples } from './examples'
import { useEffect, useState } from "react"
get_examples()
const Example = ({obj}:{obj:any}) => {
    const router = useRouter()
    return (
        <div className={styles.example} onClick={()=>{
            router.push(obj.path)
        }}>
            <span className="ellipsis">{ obj.name }</span>
        </div>
    )
}

export default function Page(){
    let [examples,setExamples] = useState([])
    useEffect(()=>{
        setTimeout(()=>{
            setExamples(examplesArr)
        },1000)
    })
    return (
        <div className="container">
            <div className={styles.examples}>
                {
                    examples.map((item:any,index:number) => {
                        return <Example key={index} obj={item} />
                    })
                }
            </div>
        </div>
    )
}
"use client"
import { useRouter } from "next/navigation"
import styles from "./page.module.scss"
import { examplesArr,get_examples } from './examples'
import { useEffect, useState } from "react"

const Example = ({obj}:{obj:any}) => {
    const router = useRouter()
    return (
        <div className={styles.example} onClick={()=>{
            router.push(`/${obj.path}`)
        }}>
            <span className="ellipsis">{ obj.name }</span>
        </div>
    )
}

export default function Page(){
    let [examples,setExamples] = useState<any[] | null>(null)
    useEffect(()=>{
        if(examples === null){
            (async()=>{
                await get_examples()
                setExamples(examplesArr)
            })()
        }
    })
    return (
        <div className="container">
            <div className={styles.examples}>
                {
                    examples && examples.map((item:any,index:number) => {
                        return <Example key={index} obj={item} />
                    })
                }
            </div>
        </div>
    )
}
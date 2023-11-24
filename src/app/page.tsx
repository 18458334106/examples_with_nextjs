"use client"
import { useRouter } from "next/navigation"
import styles from "./page.module.scss"
import { examplesArr } from './examples'
const examples = [...examplesArr]

const example = (obj:any,index:number) => {
    const router = useRouter()
    return (
        <div className={styles.example} key={index} onClick={() => router.push(obj.path)}>
            <span className="ellipsis">{ obj.name }</span>
        </div>
    )
}

export default function page(){
    return (
        <div className="container">
            <div className={styles.examples}>
                {
                    examples.map((item:any,index:number) => example(item,index))
                }
            </div>
        </div>
    )
}
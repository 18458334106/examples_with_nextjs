"use client"
import { useRouter } from "next/navigation"
import styles from "./page.module.scss"
import { examplesArr } from './examples'
const examples = [...examplesArr]

const Example = (obj:any,index:number) => {
    const router = useRouter()
    return (
        <div className={styles.example} key={index} onClick={() => router.push(obj.path)}>
            <span className="ellipsis">{ obj.name }</span>
        </div>
    )
}

export default function Page(){
    return (
        <div className="container">
            <div className={styles.examples}>
                {
                    examples.map((item:any,index:number) => {
                        return <Example key={index} obj={item} index={index} />
                    })
                }
            </div>
        </div>
    )
}
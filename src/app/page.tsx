"use client"
import { useRouter } from "next/navigation"
import styles from "./page.module.scss"
import { examplesArr,get_examples } from './examples'
import { useEffect, useState,useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showLogin } from "@/store/userSlice"
const Example = ({obj}:{obj:any}) => {
    const router = useRouter()
    let userState = useSelector((state:any) => state.userSlice);
    let isLogin = useRef(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(userState.token && userState.userInfo.username){
            isLogin.current = true
        }
    },[userState])
    return (
        <div className={styles.example} onClick={()=>{
            if(isLogin.current){
                router.push(`/components/${obj.path}`)
            }else{
                dispatch(showLogin(true))
            }
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
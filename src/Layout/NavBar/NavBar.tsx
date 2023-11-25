'use client'
import { usePathname } from 'next/navigation'
import styles from './NavBar.module.scss'
import Link from 'next/link'
import { useEffect } from 'react'
import { getToken } from '@/utils/auth'
import { login } from '@/api/user'
function NavLink({href,text}:{href:string,text:string}){
    const pathName = usePathname()
    let isActive = pathName === href
    return (
        <Link className={`flexRowCenterAll ${isActive ? styles.active : ''}`} href={href}>
            {text}
        </Link>
    )
}

const RightMenu = () => {
    let token:string | undefined = getToken();
    let userInfo = token ? JSON.parse(window.atob(token)) : undefined;
    if(token){
        return (
            <div className={`${styles.rightMenu} flexRowCenterAll`}>
                <span>{ userInfo.username }</span>
            </div>
        )
    }else{
        return <div className={`${styles.rightMenu} flexRowCenterAll`} onClick={async()=>{
            const res = await login({username:'admin',password:'123456'})
            console.log(res);
        }}>登陆 / 注册</div>
    }
}

export default function NavBar(){
    return (
        <div className={`${styles.NavBar} flexRow`}>
            <NavLink href="/" text="Home" />
            <RightMenu />
        </div>
    )
}
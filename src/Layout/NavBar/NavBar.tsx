'use client'
import { usePathname } from 'next/navigation'
import styles from './NavBar.module.scss'
import Link from 'next/link'

function NavLink({href,text}:{href:string,text:string}){
    const pathName = usePathname()
    let isActive = pathName === href
    return (
        <Link className={`flexRowCenterAll ${isActive ? styles.active : ''}`} href={href}>
            {text}
        </Link>
    )
}

export default function NavBar(){
    return (
        <div className={`${styles.NavBar} flexRow`}>
            <NavLink href="/" text="Home" />
        </div>
    )
}
'use client'
import { usePathname } from 'next/navigation'
import styles from './NavBar.module.scss'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getToken } from '@/utils/auth'
import { login } from '@/api/user'
import { Form,Input,Button } from 'antd'
function NavLink({href,text}:{href:string,text:string}){
    const pathName = usePathname()
    let isActive = pathName === href
    return (
        <Link className={`flexRowCenterAll ${isActive ? styles.active : ''}`} href={href}>
            {text}
        </Link>
    )
}

const loginForm = {
    username:'',
    password:''
}

const RightMenu = () => {
    let [token,setToken] = useState(getToken())
    let [userInfo,setUserInfo] = useState<any>({ username:'登陆 / 注册' })
    let [showLoginView,setShowLoginView] = useState(false)
    const LoginView = () => {
        const submitLogin = async() => {
            const res = await login(loginForm)
            res && res.data && setToken(res.data)
            setShowLoginView(false)
        }
        if(showLoginView){
            return (
                <div className={`${styles.loginView} flexColumnCenterAll`} onClick={() => setShowLoginView(false)}>
                    <div className={`${styles.loginMain} flexColumn`} onClick={(e)=>{
                        e.stopPropagation()
                    }}>
                        <h1 className={`${styles.loginTitle}`}>Sign In</h1>
                        <span className={`${styles.loginText}`}>
                            Sign in to your account
                        </span>
                        <Form
                            name="loginForm"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={ submitLogin }
                        >
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ]}
                            >   
                                <Input placeholder='请输入用户名' onInput={(e:any)=>{
                                    loginForm.username = e.target.value;
                                }} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                ]}
                            >
                                <Input.Password placeholder='请输入密码'  onInput={(e:any)=>{
                                    loginForm.password = e.target.value;
                                }} />
                            </Form.Item>
                            <div className={`${styles.submit} flexRow`}>
                                <Button type="primary" htmlType="submit">
                                    登陆
                                </Button>
                            </div>
                        </Form>
                        <span className={`${styles.defaultAuth}`}>用户名：admin 密码：123456</span>
                    </div>
                </div>
            )
        }
    }
    useEffect(()=>{
        if(token){
            setUserInfo(JSON.parse(window.atob(token)))
        }
    },[token])
    return (
        <>
            <div className={`${styles.rightMenu} flexRowCenterAll`} onClick={()=>{
                !token && setShowLoginView(!showLoginView)
            }}>
                <span>{ userInfo.username }</span>
            </div>
            <LoginView />
        </>
    )
}

export default function NavBar(){
    return (
        <div className={`${styles.NavBar} flexRow`}>
            <NavLink href="/" text="Home" />
            <RightMenu />
        </div>
    )
}
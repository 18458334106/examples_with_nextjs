'use client'
import { usePathname } from 'next/navigation'
import styles from './NavBar.module.scss'
import Link from 'next/link'
import { useEffect } from 'react'
import { getInfo } from '@/api/user'
import { useSelector,useDispatch } from 'react-redux'
import { loginFn,showLogin,getUserInfo } from '../../store/userSlice'
import { Form,Input,Button } from 'antd'
import Image from 'next/image'

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
    let userState = useSelector((state:any) => state.userSlice);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(userState.token && !userState.userInfo.username){
            // @ts-ignore
            const res = getInfo()
            dispatch(getUserInfo(res))
        }
    },[userState,dispatch])

    if(userState.userInfo.username){
        return (
            <div className={`${styles.rightMenu} flexRowCenterAll`}>
                <span>{userState.userInfo.username}</span>
                <Image className={`${styles.userAvatar}`} src={require('../../assets/avatar.png')} alt=''/>
            </div>
        )
    }else{
        return <div className={`${styles.rightMenu} flexRowCenterAll`} onClick={()=>{
            dispatch(showLogin(true))
        }}>登陆 / 注册</div>
    }
}

const LoginView = () => {
    let userState = useSelector((state:any) => state.userSlice);
    useEffect(()=>{
        
    },[userState])
    const dispatch = useDispatch();

    const loginForm = {
        username:'',
        password:''
    }

    const login = async() => {
        // @ts-ignore
        await dispatch(loginFn(loginForm))
    }

    if(userState.loginView){
        return (
            <div className={`${styles.loginView} flexColumnCenterAll`} onClick={(e)=>{
                dispatch(showLogin(false))
            }}>
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
                        onFinish={ login }
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
    }else{
        return
    }
}

export default function NavBar(){
    return (
        <div className={`${styles.NavBar} flexRow`}>
            <NavLink href="/" text="首页" />
            <NavLink href="/msg" text="留言" />
            <NavLink href="/chat" text="聊天" />
            <NavLink href="/about" text="关于我" />
            <RightMenu />
            <LoginView />
        </div>
    )
}
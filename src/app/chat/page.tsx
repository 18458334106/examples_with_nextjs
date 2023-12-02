"use client"
import styles from './chat.module.scss'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button,Modal,Input } from 'antd'
import Image from 'next/image'
import { queryChatRecodes,sendChatRecode } from '@/api/chat'
import { queryUserList } from '@/api/user'
import { useEffect, useState,useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showLogin } from "@/store/userSlice"
import io from 'socket.io-client';
import { getToken } from '@/utils/auth'
const { Search } = Input;
export default function Chat(){
    let [chatList, setChatList] = useState<any[] | null>(null)
    let [chatDetail, setChatDetail] = useState<any | null>(null)

    const getChatRecodes = async (toUserId:number) => {
        const res = await queryChatRecodes({toUserId})
        return res
    }
    const chatDetailRecodeScrollToBottom = () => {
        //@ts-ignore
        let ele = document.getElementsByClassName(styles.chatDetailRecode)
        setTimeout(()=>{
            //@ts-ignore
            ele[0].scrollTo(0,ele[0].scrollHeight)
        },500)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    let [userList, setUserList] = useState<any[] | null>(null)
    const getUserList = async (value?:string) => {
        const res = await queryUserList({username:value})
        let arr = userList || []
        res && res.data && arr.push(...res.data)
        res && res.data && setUserList([...arr])
    }
    const showModal = async() => {
        if(isLogin.current){
            setIsModalOpen(true);
            const res = await getUserList()
        }else{
            dispatch(showLogin(true))
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSearch = async(value: string) => {
        await getUserList(value)
    }

    let userState = useSelector((state:any) => state.userSlice);
    let isLogin = useRef(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(userState.token && userState.userInfo.username){
            isLogin.current = true
        }
    },[userState])
    const socket = io("https://flask-py.vercel.app/chat"); // 这里替换成你的服务器地址
    // const socket = io("http://127.0.0.1:5001/chat"); // 这里替换成你的服务器地址
    useEffect(() => {
        socket.on("connect", () => {
            console.log(`连接socket服务器:${socket.connected}`);
        });
        socket.on("disconnect", () => { console.log(`断开socket服务器:${socket.connected}`); });
        socket.on("message", (msg) => { 
            console.log("新消息",msg);
            chatDetail.value.recode.push({
                userId:chatDetail.id,
                username: chatDetail.username,
                chatContent: msg
            })
            setChatDetail({...chatDetail})
        });
        socket.on("message update",(msg)=>{
            console.log("消息更新",msg);
            let userId_msg = msg.userId
            let toUserId_msg = msg.toUserId
            let type = false
            //@ts-ignore
            let userInfo = JSON.parse(window.atob(getToken()))
            if(userInfo.id === toUserId_msg){
                let _chatList = chatList || []
                chatList && chatList.map((i,index)=>{
                    if(i.userId === userId_msg){
                        let arr = i.recode || []
                        arr.push(msg)
                        type = true
                        i.unread = true
                        i.recode = arr
                    }
                })
                setChatList([..._chatList])
                if(!type){
                    let arr = chatList || []
                    arr.push({
                        id:userId_msg,
                        username:msg.username,
                        recode:[msg],
                        unread:true
                    })
                    setChatList([...arr])
                }
                console.log(chatList);
                
            }
        })
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="container flexRowCenterAll">

            <Modal title="新建聊天" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Search placeholder="账号搜索" onSearch={onSearch} enterButton />
                <div className={`${styles.userList} flexColumn`}>
                    {
                        userList && userList.map((item:any,index:number)=>(
                            <div className={`${styles.user} flexRow`} key={index}>
                                <div className={styles.userAvatar} style={{"margin": "0 1rem 0 0"}}>
                                    <Image src={require('@/assets/avatar.png')} alt="" />
                                </div>
                                <div className={`${styles.userInfo} flexColumn`}>
                                    <span>昵称：{ item.name }</span>
                                    <span>账号：{ item.username }</span>
                                </div>
                                <div className={styles.newChatBtn}>
                                    <Button type="primary" onClick={()=>{
                                        let arr = chatList || []
                                        arr.push(item)
                                        setChatList([...arr])
                                        handleOk()
                                    }}>发消息</Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Modal>

            <div className={`${styles.chatView} flexRow`}>
                <div className={styles.chatList}>
                    <div className={`${styles.createChat} flexRowCenterAll`} onClick={showModal}>
                        <PlusCircleOutlined />
                        <span style={{"margin": "0 1rem"}}>
                            新建聊天
                        </span>
                    </div>
                    <div className={`${styles.list} flexColumn`}>
                        {
                            chatList && chatList.length >0 ? chatList.map((item:any,index:number) => {
                                return (
                                    <div className={`${styles.listItem} flexRow`} key={index} onClick={async()=>{
                                        let _chatList = chatList || []
                                        _chatList[index].unread = false
                                        setChatList([..._chatList])
                                        const res = await getChatRecodes(item.id)
                                        item.recode = res?.data || []
                                        setChatDetail(item)
                                        chatDetailRecodeScrollToBottom()
                                    }}>
                                        <div className={styles.userAvatar}>
                                            <Image src={require('@/assets/avatar.png')} alt="" />
                                        </div>
                                        <div className={`${styles.username} ellipsis`}>
                                            { item.username }
                                        </div>
                                        <div className={ item.unread ? styles.dot : '' }></div>
                                    </div>
                                )
                            })
                            : <div className={`${styles.empty} flexColumnCenterAll`}>空空如也</div>
                        }
                    </div>
                </div>
                <div className={styles.chatDetail}>
                    {
                        chatDetail && chatDetail.username ? (
                            <div className={styles.chatDetailView}>
                                <div className={`${styles.chatDetailHeader} flexRow`}>{ chatDetail.username }</div>
                                <div className={styles.chatDetailRecode} onScroll={(e)=>{
                                    console.log(e);
                                }}>
                                    {
                                        chatDetail && chatDetail.recode && chatDetail.recode.map((item:any,index:number) => (
                                            <div className={`${styles.recodeItem} flexRow`} key={index}>
                                                {
                                                    item.userId === chatDetail.id ? (
                                                        <div className={`${styles.recodeDetail} flexRow`} key={index}>
                                                            <div className={styles.userAvatar} style={{"margin": "0 1rem 0 0"}}>
                                                                <Image src={require('@/assets/avatar.png')} alt="" />
                                                            </div>
                                                            <div className={styles.content} style={{"background": "white"}}>
                                                                { item.chatContent }
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={`${styles.recodeDetail} flexRow`} key={index}
                                                            style={{"justifyContent": "flex-end"}}>
                                                            <div className={styles.content} style={{'background':'#95ec69'}}>
                                                                { item.chatContent }
                                                            </div>
                                                            <div className={styles.userAvatar} style={{"margin": "0 0 0 1rem"}}>
                                                                <Image src={require('@/assets/avatar.png')} alt="" />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={styles.chatDetailInput}>
                                    <textarea placeholder="请输入……" id={styles.chatDetailTextarea} cols={30} rows={10}
                                    onFocus={()=>{
                                        let _chatList = chatList || []
                                        _chatList?.map(item=>{
                                            if(item.id === chatDetail.id){
                                                item.unread = false
                                            }
                                        })
                                        setChatList([..._chatList])
                                    }} />
                                    <div className={`${styles.submit} flexRow`}>
                                        <Button type="primary" onClick={async()=>{
                                            let textarea:HTMLElement | null = document.getElementById(styles.chatDetailTextarea)
                                            //@ts-ignore
                                            let content = textarea.value || ''
                                            let { userId,username } = chatDetail
                                            //@ts-ignore
                                            let userInfo = JSON.parse(window.atob(getToken()))
                                            socket.emit("message",{
                                                userId:userInfo.id,
                                                username: userInfo.username,
                                                toUserId: chatDetail.id,
                                                toUsername: chatDetail.username,
                                                chatContent: content
                                            });
                                            const res:any | undefined = await sendChatRecode({ content,toUserId:userId,toUsername:username })
                                            if(res && res.status === 201){
                                                chatDetail.recode.push(res.data)
                                                //@ts-ignore
                                                textarea.value = ''
                                                setChatDetail({...chatDetail})
                                                chatDetailRecodeScrollToBottom()
                                            }
                                        }}>
                                            发送
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        </div>
    )
}
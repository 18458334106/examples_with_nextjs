"use client"
import styles from './chat.module.scss'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button,Modal } from 'antd'
import { useState } from 'react'
import Image from 'next/image'

export default function Chat(){
    let [chatList, setChatList] = useState<any[] | null>([
        { username:'test',userId:2 }
    ])
    let [chatDetail, setChatDetail] = useState<any | null>(null)
    return (
        <div className="container flexRowCenterAll">
            <div className={`${styles.chatView} flexRow`}>
                <div className={styles.chatList}>
                    <div className={`${styles.createChat} flexRowCenterAll`}>
                        <PlusCircleOutlined />
                        <span style={{"margin": "0 1rem"}}>
                            新建聊天
                        </span>
                    </div>
                    <div className={`${styles.list} flexColumn`}>
                        {
                            chatList && chatList.length >0 ? chatList.map((item:any,index:number) => {
                                return (
                                    <div className={`${styles.listItem} flexRow`} key={index}>
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
                                <div className={styles.chatDetailRecode}>
                                    {
                                        chatDetail && chatDetail.recode && chatDetail.map((item:any,index:number) => (
                                            <div className={`${styles.recodeItem} flexRow`} key={index}>
                                                {
                                                    item.userId === chatDetail.userId ? (
                                                        <div className={`${styles.recodeDetail} flexRow`} key={index}>
                                                            <div className={styles.userAvatar} style={{"margin": "0 1rem 0 0;"}}>
                                                                <Image src={require('@/assets/avatar.png')} alt="" />
                                                            </div>
                                                            <div className={styles.content} style={{"background": "white;"}}>
                                                                { item.chatContent }
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={`${styles.recodeDetail} flexRow`} key={index}
                                                            style={{"justifyContent": "flex-end;"}}>
                                                            <div className={styles.content} style={{"background": "#95ec69;"}}>
                                                                { item.chatContent }
                                                            </div>
                                                            <div className={styles.userAvatar} style={{"margin": "0 0 0 1rem;"}}>
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
                                    <textarea placeholder="请输入……" id={styles.chatDetailTextarea} cols={30} rows={10} />
                                    <div className={`${styles.submit} flexRow`}>
                                        <Button type="primary">
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
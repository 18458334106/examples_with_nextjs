"use client"
import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { showLogin } from '../../store/userSlice'
import style from './Message.module.scss';
import { getMessageList,addMsg,delMsg } from '@/api/msg';
import { formatTimeWithYMDHMS } from '@/utils/format';
import { Button, Form, Input,message } from 'antd';
const { TextArea } = Input;
const Message = () => {
    const [messages, setMessages] = useState<any[] | null>([]);
    const userState = useSelector((state:any) => state.userSlice);
    const dispatch = useDispatch();
    const userId = userState.userInfo.id;
 
    const getMsgList = async () => {
        const resp = await getMessageList();
        setMessages(resp.data)
    }
 
    const addOneMsg = async (values:any) => {
        if(!userState.token || !userState.userInfo.id){
            dispatch(showLogin(true))
            message.info({content:'请先登录'})
            return
        }
        const response = await addMsg(values);
        getMsgList()
    };
    const delOneMsg = async (id:number) => {
        const response = await delMsg({messageId:id});
        getMsgList()
    }

    useEffect(() => {
        getMsgList();
    }, []);
 
    const formatTimeWithYMDHMS = (time:any) => {
        const date = new Date(time);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    };

    return (
        <div className="container flexColumnCenterAll" style={{ justifyContent: 'flex-start','padding':'2rem' }}>
            <div className={style.mainContent}>
                <Form name="userMsgForm" onFinish={addOneMsg}>
                    <Form.Item
                        name="message"
                        rules={[
                            {
                            required: true,
                            message: '请输入留言',
                            },
                        ]}
                    >
                    <TextArea rows={4} placeholder="留言" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>提交</Button>
                    </Form.Item>
                </Form>
                <div className={style.messages}>
                    {
                        messages && messages.map((item:any, index) => {
                            return (
                                <div className={style.item} key={index}>
                                    <span className={style.item_username}>
                                        {item.username}
                                    </span>
                                    <div className={style.item_usermsg}>
                                        {item.message}
                                    </div>
                                    <div className={`${style.item_msgtime} flexColumn`} style={{ alignItems: 'flex-end' }}>
                                        {formatTimeWithYMDHMS(item.created_at)}
                                        <br />
                                        {
                                            item.userId === userId ? (
                                                <Button danger type="text" style={{ padding: '0' }}
                                                    onClick={() => delOneMsg(item.id)}>
                                                    删除
                                                </Button>
                                            ) : ''
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Message;
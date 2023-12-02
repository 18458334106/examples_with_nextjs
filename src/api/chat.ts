import { getToken, setToken } from "@/utils/auth";
import { supabase } from "@/utils/sql"

export const queryChatRecodes = async(params:any) => {
    let token = getToken()
    if(token){
        const { toUserId } = params
        let { id } = JSON.parse(window.atob(token))
        const { data,status,error }:{
            data:any[] | null,
            status:number,
            error:any
        } = await supabase.from('chat_recode').select("*")
            .in('toUserId', [toUserId,id])
            .in('userId', [id,toUserId])
            .order('created_at', { ascending: true })
        return {
            data,
            status,
            error,
            msg:null
        }
    }
}

export const sendChatRecode = async(params:any) => {
    let token = getToken()
    if(token){
        const { toUserId, content,toUsername } = params
        let { id,username } = JSON.parse(window.atob(token))
        const { data,status,error }:{
            data:any[] | null,
            status:number,
            error:any
        } = await supabase.from('chat_recode').insert({
            userId:id,
            username,
            toUserId,
            toUsername,
            chatContent:content
        })
        return {
            data:{
                userId:id,
                username,
                toUserId,
                toUsername,
                chatContent:content 
            },
            status,
            error,
            msg:null
        }
    }
}
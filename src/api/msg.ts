import { getToken } from "@/utils/auth"
import { supabase } from "@/utils/sql"
export const getMessageList = async() => {
  const { status,data, error } = await supabase.from('user_message').select('*')
  return {
    status,
    data,
    error,
    msg:null
  }
}

export const addMsg = async (data:any) => {
  //@ts-ignore
  let userInfo = JSON.parse(window.atob(getToken()));
  let { id,username } = userInfo
  const { status,error } = await supabase.from('user_message')
      .insert({"message":data.message,"username":username,"userId":id})
  return {
    status,
    error,
    msg:null
  }
}

export const delMsg = async(params:any) => {
  let { messageId } = params
  const { status,error } = await supabase.from('user_message').delete().eq('id',messageId)
  return {
    status,
    error,
    msg:null
  }
}
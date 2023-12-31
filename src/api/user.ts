import { getToken, setToken } from "@/utils/auth";
import { supabase } from "@/utils/sql"

interface LoginForm {
    username:string,
    password:string
}

export const login = async(loginForm:LoginForm) => {
    const { username, password } = loginForm
    const { data,status,error }:{
        data:any[] | null,
        status:number,
        error:any
    } = await supabase.from('sys_user')
        .select('*')
        .eq('username', username)
        .eq('password', password);
    let resp:{
        status:number,
        data:any | null,
        error:any | null,
        msg:string | null
    } = { status,data:null,error:null,msg:null }
    
    if(status === 200){
        if(data && data.length > 0){
            let token = window.btoa(JSON.stringify(data[0]))
            setToken(token)
            resp.data = token
            resp.msg = '登录成功'
        }else{
            resp.msg = '用户名或密码错误'
        }
    }else{
        resp.msg = error.message
    }
    return resp
}

export const getInfo = () => {
    // @ts-ignore
    return JSON.parse(window.atob(getToken()))
}

export const queryUserList = async(params:any) => {
    const { username } = params
    let sql = supabase.from('sys_user').select('*')
    if(username){
        const { data,status,error }:{
            data:any[] | null,
            status:number,
            error:any
        } = await sql.eq('username', username)
        let resp:{
            status:number,
            data:any | null,
            error:any | null,
            msg:string | null
        } = { status,data,error,msg:null }
        return resp
    }else{
        const { data,status,error }:{
            data:any[] | null,
            status:number,
            error:any
        } = await sql
        let resp:{
            status:number,
            data:any | null,
            error:any | null,
            msg:string | null
        } = { status,data,error,msg:null }
        return resp
    }
}
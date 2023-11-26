import { supabase } from "@/utils/sql"

export const getExamples = async () => {
    const { status,data, error } = await supabase
        .from("examples")
        .select("*")
    let resp:{
        status:number,
        data:any | null,
        error:any | null,
        msg:string | null
    } = { status,data,error,msg:null }
    return resp
}
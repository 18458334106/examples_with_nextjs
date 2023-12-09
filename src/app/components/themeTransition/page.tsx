"use client"
import { Button } from 'antd'
export default function ThemeTransition(){
    //@ts-ignore
    const switchTheme = (e) => {
        document.documentElement.style.setProperty('--x',e.clientX + 'px');
        document.documentElement.style.setProperty('--y',e.clientY + 'px');
        //@ts-ignore
        if(document.startViewTransition){
            //@ts-ignore
            document.startViewTransition(()=>{
                //@ts-ignore
                document.getElementById('curContainer').classList.toggle('dark');
            });
        }else{
            //@ts-ignore
            document.getElementById('curContainer').classList.toggle('dark');
        }
    }
    return (
        <div id='curContainer' className="flexColumn">
            <Button type="primary" onClick={(e)=>switchTheme(e)}>Primary</Button>
        </div>
    )
}
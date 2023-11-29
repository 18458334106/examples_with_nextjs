import Image from 'next/image'
import style from './About.module.scss'
export default function About(){
    const arr = [
        { imgUrl:require('../../assets/about/gitee.png'), title:'Gitee', link:'https://gitee.com/zhaojc-077399' },
        { imgUrl:require('../../assets/about/github.png'), title:'GitHub', link:'https://github.com/18458334106' },
        { imgUrl:require('../../assets/about/csdn.png'), title:'CSDN', link:'https://blog.csdn.net/weixin_59685936' },
        { imgUrl:require('../../assets/about/blog.png'), title:'blog', link:'https://blog-1790.vercel.app/' }
    ]
    const infosClass = () => {
        return `${style.infos} flexRowCenterAll`
    }
    return (
        <div className="container flexColumnCenterAll">
            <h1 className={style.title}>About Author [ 某公司摸鱼前端 ]</h1>
            <div className={ infosClass() }>
                {
                    arr.map((item,index)=>{
                        return (
                            <div className={style.item} key={index}>
                                <a rel="noreferrer" className="flexColumnCenterAll" target="_blank" href={item.link}>
                                    <Image src={item.imgUrl} alt={item.title} />
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
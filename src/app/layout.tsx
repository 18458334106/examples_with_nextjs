"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import AppMain from "@/Layout/AppMain/AppMain";
import NavBar from "@/Layout/NavBar/NavBar"
import { useEffect } from "react"
import { Provider } from 'react-redux'
import store from '@/store'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const setFontSize = () => {
    let doc = document.documentElement;
    let fontSize = doc.clientWidth / 120 > 10 ? doc.clientWidth / 120 : 10
    doc.style.fontSize = fontSize + 'px';
    return fontSize
  }
  useEffect(()=>{
    setFontSize()
    window.addEventListener('resize',()=>{ setFontSize() })
  })
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <NavBar/>
          <AppMain>{children}</AppMain>
        </Provider>
      </body>
    </html>
  )
}

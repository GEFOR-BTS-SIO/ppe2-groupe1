import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import  BlueRoundButton  from '@/components/Bouton'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
<main>
        <div>
          <BlueRoundButton to='messagerie' text='Messagerie'></BlueRoundButton>  </div>
      <div>
        <BlueRoundButton to='todo' text='To Do List'></BlueRoundButton>  </div></main>
    </>
  )
}

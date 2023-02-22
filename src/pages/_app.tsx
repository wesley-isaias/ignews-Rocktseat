import { AppProps } from "next/app";
import { Header } from "../components/Header";
import '../styles/global.scss'
import { SessionProvider } from "next-auth/react"


export default function MyApp({ Component, pageProps: {session, ...pageProps}, }: AppProps) {
  return (
      
    <SessionProvider session={session}>
    <Header />
    <Component {...pageProps} />
    </SessionProvider>

      
    
    
  )
}


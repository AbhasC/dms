import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider children={<Component {...pageProps} />}/>
  )
} 

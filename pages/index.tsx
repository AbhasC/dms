import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Fragment } from "react";


const Comp = () => {
  const { user, error, isLoading } = useUser();
  if (user) {
    console.log(user)
    return (
      <Fragment>
        <div>Hello {user.email}</div>
        <Link href="/api/auth/logout">Logout</Link>
      </Fragment>
    ) 
  }
  else if(error) return <div>{error.name}</div>
  else if(isLoading) return <div>Loading...</div>
  else return <Link href="/api/auth/login">Login</Link>
}

export default function Home() {  
  
  return (
    <section id="home" aria-label="home">
      <Comp/>
    </section>
  );
}

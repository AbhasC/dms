import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

interface File {
    "file-name" : string,
    "id" : string
}

interface Folder {
  "folder-name" : string,
  "files" : File[]
}

const Comp = () => {

  const [folder, setFolder] = useState<string>("/");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const rootData = useRef<any>(null);

  const { user, error, isLoading } = useUser();

  useEffect(()=>{
    if(user?.email){
      axios.get("/api/fetch", {params : {
        "email" : user.email
      }}).then((res)=>{
        rootData.current = res?.data?.data[0];
        setFolders(res?.data?.data[0]?.folders ?? [])
        setFiles(res?.data?.data[0]?.files ?? [])
      })
    }
  },[user]);

  if (user) {
    return (
      <Fragment>
        <div>Hello {user.email}</div>
        <Link href="/api/auth/logout">Logout</Link>
        <Link href="/api/create-file">Create a file</Link>
        {(()=>{
          if(folder === "/"){
            return (
              <Link href="/api/create-folder">Create a folder</Link>
            )
          }
          else{
            return (<></>)
          }
        }
        )()}
        <ul>
          <span>Folders : </span>
          <li onClick={()=>{
            setFolders(rootData.current?.folders ?? [])
            setFiles(rootData.current?.files ?? [])
            setFolder("/")
          }}>{"/"}</li>
          {folders.map((elem, ind)=>{
            return(
              <li key={ind} onClick={()=>{
                setFiles(elem?.files ?? [])
                setFolder(`/${elem["folder-name"]}`)
              }}>
                {elem["folder-name"]}
              </li>
            )
          })}
        </ul>
        <ul>
          <span>Files in current folder ({folder}): </span>
          {files.map((elem, ind)=>{
            return (
              <li key={ind}>
                {elem["file-name"]}
              </li>
            )
          })}
        </ul>
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

import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { nanoid } from 'nanoid'

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
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const clickHandler = () => {
    if(dialogRef.current){
      dialogRef.current?.showModal();
    }
  };

  const fileCreationHandler = (e : any) => {
    const filename = e.target[0].value;
    const fileObj = {
      "file-name" : filename,
      "id" : nanoid(5)
    }
    if(rootData.current){
      if(folder === "/")
        rootData.current.files.push(fileObj);
      else{
        rootData.current.folders.forEach((elem : any)=>{
          if("/"+elem["folder-name"] === folder)
            elem.files.push(fileObj);
        })
      };
    }
    axios.post(("/api/update"), {
      "newFormat" : rootData.current
    });
    if(user?.email){
      axios.get("/api/fetch", {params : {
        "email" : user.email
      }}).then((res)=>{
        rootData.current = res?.data?.data[0];
        setFolders(res?.data?.data[0]?.folders ?? [])
        if(folder === "/")
          setFiles(res?.data?.data[0]?.files ?? [])
        else{
          rootData.current.folders.forEach((elem : any)=>{
            if("/"+elem["folder-name"] === folder)
              setFiles(elem.files ?? [])
          })
        };
      })
    }
  }

  if (user) {
    return (
      <Fragment>
        <div>Hello {user.email}</div>
        <Link href="/api/auth/logout">Logout</Link>
        <button onClick={clickHandler}>Create a file</button>
        <dialog ref={dialogRef}>
          <p>Give file name</p>
          <form method="dialog" onSubmit={fileCreationHandler}>
            <input type="text" placeholder="File name"></input>
            <button>OK</button>
          </form>
        </dialog>
        {folder === "/" ? (
              //folder logic
              <>ooga</>
            ) : (<>booga</>)}
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
        <button onClick={()=>{
            console.log(rootData.current)
          }}>Pankme</button>
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

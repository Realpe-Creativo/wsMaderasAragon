import {  useEffect, useState } from "react"
import { brand } from "../atoms/context"
import { postService } from "../services/postServices"
import { useStore } from "@nanostores/react"
import moment from "moment";
import { LuArrowBigLeft } from "react-icons/lu";

export interface PostsProps {
}

export default function  (props?: PostsProps) {
  props

  const $brand = useStore(brand)
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState<any>(null)

  const init = async () => {
    const response = await postService.list({brand:  $brand._id, status: "public"})
    if(response.code === 200){
      setPosts(response.list)
    }
  }

  useEffect(()=>{
    init()
  }, [])

  return (
    <div className="flex flex-col items-center mt-32 mb-20">
      <div className="flex p-4 justify-center w-full bg-stone-700 flex-row">
        <div className="flex w-fit content-center">
          <span className="text-5xl my-4 text-white font-title-bold">Noticias y Articulos</span>
        </div>
      </div>
      {
        !post ?
          <div className="flex flex-col w-9/12 p-6">
            {
              posts.map((post:any, index:number)=>{
                return (
                  <div key={index} onClick={()=>setPost(post)} className="flex rounded-3xl border-[1pt] border-solid border-stone-200 hover:border-stone-500 hover:shadow-md mb-3 cursor-pointer flex-col p-4 w-full">
                    <div className="w-full flex flex-row justify-between">
                      <div className="w-fit">
                        <span className="text-2xl font-title-bold">{post.title}</span>
                      </div>
                      <div className="flex text-start text-sm text-stone-500">
                        {moment.utc(post.created_at).format('DD/MM/YYYY')}
                      </div>
                      </div>
                      <div className="flex">
                        <div className="flex text-start min-h-14">
                          <div  dangerouslySetInnerHTML={{__html: post.body}} className="line-clamp-3 text-start">
                          </div>
                        </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        : 
          <div className="flex my-3 flex-col w-9/12 p-6">
            <span onClick={()=>{setPost(null)}} className="flex absolute top-32 left-2 hover mx-1 cursor-pointer items-center justify-center text-stone-700 bg-white hover:bg-stone-600 hover:text-stone-50 p-2 rounded-full mt-3">
              <LuArrowBigLeft className='inline mx-1'/>
            </span>
            <div className="flex">
              <span className="flex text-4xl text-stone-700 font-title-bold">{post?.title}</span>
            </div>
            <div className="flex mb-4 text-start text-sm text-stone-500">
              {moment.utc(post.created_at).format('DD/MM/YYYY')}
            </div>
            <div className="flex">
              <div  dangerouslySetInnerHTML={{__html: post.body}} className="text-start">
              </div>
            </div>
          </div>
      }
      
    </div>
  )
}
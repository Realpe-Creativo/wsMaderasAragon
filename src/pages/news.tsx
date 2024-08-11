import {  useEffect, useState } from "react"
import { brand } from "../atoms/context"
import { postService } from "../services/postServices"
import { useStore } from "@nanostores/react"

export interface PostsProps {
}

export default function  (props?: PostsProps) {
  props

  const $brand = useStore(brand)
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState(null)

  const init = async () => {
    const response = await postService.list({brand:  $brand._id, status: "published"})
    if(response.code === 200){
      setPosts(response.list)
    }
  }

  useEffect(()=>{
    init()
  }, [])

  return (
    <div className="flex flex-col mt-32 mb-20">
      <div className="flex p-4 justify-center w-full bg-stone-700 flex-row">
        <div className="flex w-fit content-center">
          <span className="text-5xl my-4 text-white font-title-bold">Noticias y Articulos</span>
        </div>
      </div>
    </div>
  )
}
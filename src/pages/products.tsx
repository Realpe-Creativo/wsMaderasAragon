
import { useEffect, useState } from "react"
import AddButton from "../components/car/AddButton"
import Car from "../components/car/Car"
import { tagService } from "../services/tagService"
import { useStore } from "@nanostores/react";
import { brand } from "../atoms/context";
import { productService } from "../services/productService";
import { Card, Image } from '@mantine/core';
import { LuArrowBigLeft, LuSearch } from "react-icons/lu";

import './products.scss'
import { useWindowScroll } from "@mantine/hooks";
import 'react-quill/dist/quill.snow.css';
export interface ProductsProps {
}

export default function  (props?: ProductsProps) {
  const $brand = useStore(brand);
  
  const [product, setProduct] = useState<any>(null)

  const [tags, setTags] = useState<any>([])
  const [products, setProducts] = useState<any>([])

  const [variations, setVariations] = useState<any>([])
  
  const bringData = async() =>{
    const _tags = await tagService.list({brand: $brand?._id})
    setTags(_tags.list)

    const _products = await productService.list({brand: $brand?._id})
    setProducts(_products.list.map((_p:any)=>{
      const types = new Set(_p?.variations?.map((_v:any)=>{return _v.type}))
      return({
        ..._p,
        carousel: [{value: _p.avatar}, ..._p.data.filter((_d:any)=> _d.key.includes('carousel'))],
        content: [ ..._p.data.filter((_d:any)=> _d.key.includes('content'))],
        bento: [ ..._p.data.filter((_d:any)=> _d.key.includes('bento'))],
        types: Array.from(types),
      })
    }))
  }

  const [search, setSearch] = useState<any>({
    brand: $brand?._id,
    search: undefined,
    tags: []
  })

  const [scroll, scrollTo] = useWindowScroll()
  scroll

  const handleSend = (e:any,fn:()=>any) =>{
    if(e.key === "Enter"){
      fn()
    }
  }


  const handleSearch = async(_params?:any) =>{
    const _products = await productService.search(_params ||search)
    if(_products.code === 200){
      setProducts(_products.list)
    }
  }

  const toggleVariation = async(_variation:string) =>{
    const type = product?.variations?.find((_v:any)=>{return _v._id === _variation})?.type
    let aux = [...variations]
    const ids:any[] = []

    product?.variations?.forEach((_v:any)=>{
      ids[_v._id] = _v
    })
    for (const _t of product?.types) {
      if(_t === type){
        const exists = aux.findIndex((_v:any)=>{return _v === _variation})
        if(exists === -1){
          aux = aux.filter((_v:any)=>{return ids[_v].type !== type})
          aux.push(_variation)
        }
      }
    }

    setVariations(aux)
  }

  const toggleTag = async(tag:string) =>{
    if(tag === 'all'){
      setSearch({...search, tags: []})
      await handleSearch({...search, tags: []})
      return
    }
    let arr 
    const exists = search.tags.findIndex((_t:string)=>{return _t === tag})
    if(exists !== -1){
      const aux = search.tags.filter((_t:string)=>{return _t !== tag})
      arr = aux
      setSearch({...search, tags: aux})
    } else {
      const aux = [...search.tags]
      aux.push(tag)
      setSearch({...search, tags: aux})
      arr = aux
    }
    await handleSearch({...search, tags: arr})
  }

  const handleKeyDown = (e:any) =>{
    if(e.key === 'Escape'){
      setProduct(null)
    }
  }

  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown)
    bringData()
  }, [])

  props
  return (
    <div className="flex w-full h-fit pt-[120px] min-h-[88vh] pb-6">
      {
        product ?
          <div className="flex w-full justify-center">
            <span onClick={()=>{setProduct(null)}} className="flex absolute top-32 left-3 md:left-2 hover mx-1 cursor-pointer items-center justify-center text-stone-700 bg-white hover:bg-stone-600 hover:text-stone-50 p-2 rounded-full mt-3">
              <LuArrowBigLeft className='inline mx-1'/>
            </span>
            <div className="flex flex-col max-w-[1240px] w-full">
              {
                product.bento.length ? 
                  <div className="flex w-full mb-5 flex-row gap-2 p-2 md:p-4 md:gap-5">
                    <div style={{backgroundImage: `url(${product.bento[0]?.value})`}} className="flex rounded-s-xl bg-center bg-cover h-[420px] w-full md:w-1/3">
                    </div>
                    <div className="flex h-[420px] flex-col gap-2 md:gap-5 w-full md:w-1/3">
                      <div style={{backgroundImage: `url(${product.bento[1]?.value})`}}  className="flex bg-center bg-cover h-full">
                      </div>
                      <div style={{backgroundImage: `url(${product.bento[2]?.value})`}}  className="flex  bg-center bg-cover h-full">
                      </div>
                    </div>
                    <div style={{backgroundImage: `url(${product.bento[3]?.value})`}}  className="flex rounded-e-xl h-[420px]  bg-center bg-cover w-full md:w-1/3">
                    </div>
                  </div>
                : null
              }

              <div className="flex flex-col md:flex-row w-full">
                <div className="flex flex-col p-4 w-full md:w-1/3">
                  <div className="flex mb-3">
                    <span className="text-sm text-slate-500">{product?.code}</span>
                  </div>
                  <div className="flex mb-3">
                    <span className="text-2xl font-bold">{product?.name}</span>
                  </div>
                  <div className="flex flex-col w-full flex-wrap mb-3">
                  {
                    product?.types?.map((_t:string)=>{return (
                      <div className="flex p-1 align-middle flex-wrap" key={_t}>
                        <span className="flex bg-stone-100 text-stone-800 text-sm font-medium me-2 px-3.5 py-1 h-fit rounded">{_t}</span>
                        {
                          _t === 'size' && product?.variations?.filter((_v:any)=>{return _v.type === _t}).map((_v:any)=>{return (
                            <div className="flex mb-2" key={_v._id}>
                              <div onClick={()=>toggleVariation(_v._id)} className={`${variations.includes(_v._id) ? 'bg-stone-300 text-stone-900' : 'bg-stone-100 text-stone-800'} cursor-pointer flex relative text-sm font-medium me-2 px-3.5 py-1.5 rounded`}>
                                <span>{_v.value}</span>
                              </div>
                            </div>
                          )}) 
                        }
                        {
                          _t === 'color' && product?.variations?.filter((_v:any)=>{return _v.type === _t}).map((_v:any)=>{return (
                            <div className="flex" key={_v._id}>
                              <div onClick={()=>toggleVariation(_v._id)} className={`${variations.includes(_v._id) ? 'bg-stone-300 text-stone-900' : 'bg-stone-100 text-stone-800'} cursor-pointer flex relative text-sm font-medium me-2 px-3.5 py-1.5 rounded`}>
                                <span>{_v.value}</span>
                              </div>
                            </div>
                          )}) 
                        }
                        {
                          _t === 'material' && product?.variations?.filter((_v:any)=>{return _v.type === _t}).map((_v:any)=>{return (
                            <div className="flex" key={_v._id}>
                              <div onClick={()=>toggleVariation(_v._id)} className={`${variations.includes(_v._id) ? 'bg-stone-300 text-stone-900' : 'bg-stone-100 text-stone-800'} cursor-pointer flex relative text-sm font-medium me-2 px-3.5 py-1.5 rounded`}>
                                <span>{_v.value}</span>
                              </div>
                            </div>
                          )}) 
                        }
                      </div>
                    )})
                  }

                  </div>
                  <div className="flex w-full justify-center">
                    <AddButton variations={variations} product={product} quantity={1}></AddButton>
                  </div>
                </div>
                <div className="flex flex-col p-4 w-full md:w-2/3">
                  {
                    product?.content?.map((_c:any)=>{return (
                      <div className="flex p-1.5 content__editor ql-editor" key={_c._id}>
                        <div dangerouslySetInnerHTML={{__html: _c.value}}></div>
                      </div>
                    )})
                  }
                </div>
              </div>

            </div>
          </div>
        : null
      }
      {
        !product ?
          <div className="flex flex-col w-full">
            <div className="flex w-full justify-center flex-row">
              <div onClick={() => toggleTag('all')} className={`flex hover mx-1 cursor-pointer items-center justify-center ${!search.tags.includes('all')? 'text-stone-700 bg-white hover:bg-stone-600 hover:text-stone-50' : 'text-white bg-stone-700 hover:bg-stone-50 hover:text-stone-600'}  px-4 py2 rounded-3xl mt-3`}>
                <span className="inline-flex align-middle items-center text-plain">Todos</span>
              </div>
              {
                tags.map((_t:any)=>{return (
                  <div key={_t._id} onClick={()=>toggleTag(_t.name)} className={`flex hover mx-1 cursor-pointer items-center justify-center ${!search.tags.includes(_t.name)? 'text-stone-700 bg-white hover:bg-stone-600 hover:text-stone-50' : 'text-white bg-stone-700 hover:bg-stone-50 hover:text-stone-600'}  px-4 py2 rounded-3xl mt-3`}>
                    <span className="inline-flex align-middle items-center text-plain">{_t.name}</span>
                  </div>
                )})
              }
              <div className="flex">
                <span className="flex hover mx-1 cursor-pointer items-center justify-center text-stone-700 bg-white px-3 py-1 rounded-3xl mt-3">
                  <input onKeyDown={(e)=> {handleSend(e, handleSearch)}} type='text' className='w-fit min-w-6' value={search.search} onChange={(e)=> {setSearch({...search, search: e.target.value})}} />            
                </span>
                <span onClick={()=>{handleSearch()}} className="flex hover mx-1 cursor-pointer items-center justify-center text-stone-700 bg-white hover:bg-stone-600 hover:text-stone-50 px-4 py2 rounded-3xl mt-3">
                  <LuSearch className='inline mx-1'/>
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-3 flex-wrap mt-4 w-full">
              {
                products.map((_product:any)=>{ return (
                  <Card className="flex w-44 md:w-60 border dark:border-gray-200 dark:bg-white dark:text-gray-900 shadow-sm text-grey-900 hover:shadow-md" shadow="sm" padding="lg" radius="md" onClick={() =>{setVariations([]); setProduct(_product); setTimeout(()=>scrollTo({ y: 0 }),300)}} withBorder>
                    <Card.Section>
                      <Image
                        src={_product?.avatar}
                        height={160}
                        alt="Norway"
                      />
                    </Card.Section>
                    <h5 className="text-md md:text-xl line-clamp-2 font-semibold tracking-tight text-gray-900">
                      {
                        _product?.name
                      }
                    </h5>
                    <div className="flex items-center justify-between">
                      <span className="text-md md:text-xl font-bold text-gray-900">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(_product?.price || 0)}                     
                      </span>
                      <AddButton product={_product} quantity={1} size="sm" />
                    </div>
                  </Card>
                )})
              }
            </div>
          </div>
        : null
      }  
      <Car></Car>
    </div>
  )

}
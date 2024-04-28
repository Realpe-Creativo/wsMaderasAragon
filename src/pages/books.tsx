//bg-red-100 text-red-950 bg-red-700 text-green-700 text-red-700 hover:bg-green-50 hover:bg-red-50 border-green-600 border-red-600 text-green-600 text-red-600 hover:bg-green-600 hover:bg-red-600

import { useEffect, useState } from "react"
import { bookService } from "../services/bookService"
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi"
import moment from "moment"
import { LuChevronRightCircle, LuPen, LuTrash2 } from "react-icons/lu"

export interface booksProps {
}

export default function  (props?: booksProps) {
  props
  const [books, setBooks] = useState([])
  const [book, setBook] = useState<any>(null)
  const [transactions, setTransactions] = useState([])
  const [transaction, setTransaction] = useState<any>({type: 'income'})
   

  useEffect(()=>{
    init()
  }, [])

  useEffect(()=>{
    initBook()
  }, [book?._id])

  const handleUpsertTransaction = async()=>{
    const _transaction = await bookService.upsertTransaction({...transaction, book: book._id})
    setTransaction({type: 'income'})
    if(_transaction.object){
      await initBook()
    }
  }
  const handleDeleteTransaction = async(_t:any)=>{
    const _transaction = await bookService.deleteTransaction({..._t})
    if(_transaction.object){
      await initBook()
    }
  }

  const initBook = async() =>{
    const _transactions = await bookService.listTransactions({type: book.type, book: book._id})
    if(_transactions.transactions){
      setTransactions(_transactions.transactions)
    }
  }
  
  const init = async() =>{
    const _books = await bookService.list({})
    if(_books.list){
      setBooks(_books.list)
      const main = _books.list.find((_b:{config:{default:boolean}})=> _b?.config?.default)
      if(main){
        setBook(main)
      }
    }
  }


  return (
    <div className='flex flex-col transition-all'>

      <div className="flex flex-row">
        <div className='flex w-1/12 text-plain'>
          <span className="text-lg  z-50 p-2 rounded-full flex bg-white shadow-md text-green-600">Libros</span>
          
        </div>
        <div className='flex w-10/12 justify-center text-plain'>

          {
            books.map((_b:any)=>{
              return(
                <span key={_b._id} className={`${book?._id === _b._id ? 'bg-green-800 text-white': ' bg-green-700 text-white '} text-lg mx-1  z-50 px-2 py-1 h-fit rounded-full flex shadow-md  hover:bg-white hover:shadow-lg hover:text-green-700 cursor-pointer`}>{_b.name}</span>
              )
            })
          }
          
        </div>
        <div className='flex w-1/12 text-plain'></div>

      </div>

      <div className="flex flex-row">
        <div className="flex flex-col p-3 w-1/2">

          <div className="flex justify-center mb-3">
            <span className="text-lg  z-50 px-2 py-1 rounded-full flex bg-white shadow-md text-green-600">Información</span>
          </div>
          <div className="flex rounded-3xl shadow-md bg-white p-6 mb-3">
            cde
          </div>
        </div>
        <div className="flex flex-col p-3 w-1/2">
          <div className="flex justify-center mb-3">
            <span className="text-lg  z-50 px-2 py-1 rounded-full flex bg-white shadow-md text-green-600">Movimientos</span>
          </div>
          <div className="flex justify-center rounded-3xl shadow-md bg-white p-3 mb-3">
            <div className="inline-flex rounded-3xl shadow-sm" role="group">
              <button type="button" onClick={()=>{setTransaction({...transaction, type: 'income'})}} className={`${transaction?.type === 'income'? 'bg-green-800 text-white': 'bg-transparent text-green-800'} px-4 transition-all py-2 text-sm font-medium  border border-green-800 rounded-s-3xl hover:bg-green-800 hover:text-white focus:z-10 focus:ring-0 focus:ring-green-500 focus:bg-green-800 focus:text-white border-e-0`}>
                Entrada
              </button>
              
              <button type="button" onClick={()=>{setTransaction({...transaction, type: 'outcome'})}} className={`${transaction?.type === 'outcome'? 'bg-red-800 text-white': 'bg-transparent text-red-800'} px-4 transition-all py-2 text-sm font-medium border border-red-800 rounded-e-3xl hover:bg-red-800 hover:text-white focus:z-10 focus:ring-0 focus:ring-red-500 focus:bg-red-800 focus:text-white border-s-0`}>
                Salida
              </button>
            </div>
            <input type="text" onChange={(_e)=>{setTransaction({...transaction, description: _e.target.value})}} value={transaction?.description || ''} autoFocus placeholder="Descripción" className={`disabled:bg-${transaction.type === 'income'? 'green': 'red'}-200 bg-${transaction.type === 'income'? 'green': 'red'}-100 text-${transaction.type === 'income'? 'green': 'red'}-950 resize-none flex mx-2 w-80 border-0 border-white px-2 py-1 rounded-3xl shadow-sm transition-all`} />
            <input type="currency" onChange={(_e)=>{setTransaction({...transaction, value: _e.target.value})}} value={transaction?.value || ''} placeholder="$$$" step={50} className={`disabled:bg-${transaction.type === 'income'? 'green': 'red'}-200 bg-${transaction.type === 'income'? 'green': 'red'}-100 text-${transaction.type === 'income'? 'green': 'red'}-950 resize-none flex text-center mx-2 w-36 border-0 border-white px-2 py-1 rounded-3xl shadow-sm transition-all`} />
            <button onClick={handleUpsertTransaction} type="button" className={`text-white bg-${transaction.type === 'income' ? 'green' : 'red'}-700 hover:bg-${transaction.type === 'income' ? 'green' : 'red'}-800 focus:ring-4 focus:outline-none focus:ring-${transaction.type === 'income' ? 'green' : 'red'}-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 transition-all`}>
              <LuChevronRightCircle />
            </button>
          </div>
          <div className="flex rounded-3xl shadow-md bg-white p-6 mb-3">
            
            <ol className="relative border-s text-plain p-2 border-stone-200 w-full">    
              {
                transactions.map((_t:any)=>{
                  return(
                    <li key={_t.id} className={`mb-2 transition-all rounded-xl group hover:shadow-sm hover:bg-${_t.type === 'income' ? 'green': 'red'}-50 ms-6 w-full p-2`}>            
                      <span className={`absolute flex items-center justify-center w-6 h-6 bg-${_t.type === 'income' ? 'green' : 'red'}-100 text-${_t.type === 'income' ? 'green' : 'red'}-700 rounded-full -start-3 ring-8 ring-white`}>
                        {
                          _t.type === 'income' ? 
                            <GiReceiveMoney />
                            : 
                            <GiPayMoney />
                          }
                      </span>
                      <div className="relative w-full">
                        <span className={`absolute top-2 right-2 ${ _t.type === 'income' ? 'text-green-900': 'text-red-900'}`}>{ new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(_t.value || 0)}</span>
                        <time className="block mb-2 text-sm font-normal leading-none">{moment.utc(_t.created_at).add(-5,'h').format('DD-MM hh:mmA')}</time>
                        <p className="text-base font-normal">{_t.description}</p>
                        <div className="absolute hidden group-hover:flex group-hover:flex-row top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <span onClick={()=>{handleDeleteTransaction(_t)}} className={`flex mx-2 px-2 py-1 hover:shadow-sm transition-all border border-solid border-${_t.type === 'income' ? 'green': 'red'}-600 text-${_t.type === 'income' ? 'green': 'red'}-600 rounded-xl hover:bg-${_t.type === 'income' ? 'green': 'red'}-600 hover:text-white cursor-pointer`}>
                            <LuTrash2 />
                          </span>
                          <span onClick={()=>{setTransaction(_t)}} className={`flex mx-2 px-2 py-1 hover:shadow-sm transition-all border border-solid border-${_t.type === 'income' ? 'green': 'red'}-600 text-${_t.type === 'income' ? 'green': 'red'}-600 rounded-xl hover:bg-${_t.type === 'income' ? 'green': 'red'}-600 hover:text-white cursor-pointer`}>
                            <LuPen />
                          </span>
                        </div>
                      </div>
                    </li>
                  )
                })
              }              
            </ol>


          </div>  
        </div>
      </div>
    
    </div>
  )
}
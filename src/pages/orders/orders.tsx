
import {
  LuChevronLeft,
  LuChevronRight,
  LuCopy,
} from 'react-icons/lu'
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react"
import { Order, columns } from "./columns"
import { DataTable } from "./data-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"
import { orderService } from "@/services/orderService"
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import moment from 'moment'

export default  function Orders() {
  const [data, setData] = useState<Order[]>([])
  const [order, setOrder] = useState<any>(null)
  const {t} = useTranslation()
  const init = async () => {
    const _orders = await orderService.list()
    setData(_orders.list.map((_o:any, _i:number)=> ({..._o, set: setOrder, index: _i})))
  }

  const handleGhost = async () => {
    
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <div className="block px-4 pe-10 mb-7 md:p-0 w-full md:min-h-screen-lg md:max-w-screen-xl mx-auto mt-24 pt-10">
      <div className="flex px-4 pe-10 flex-col pt-10 bg-white rounded-xl">
        <div className="flex">
          <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link className="text-teal-700" to="/commerce/orders">{t('orders.title')}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <span>{t('orders.all')}</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
              </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className="flex container mx-auto py-10">
          <DataTable ghost={handleGhost} columns={columns} data={data} />
        </div>
        <Dialog open={order} onOpenChange={()=>setOrder(null)}>
          <DialogContent>
            <DialogHeader>
              
            </DialogHeader>
              <Card
                  className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                >
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Order {order?.code}
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <LuCopy className="h-3 w-3" />
                        <span className="sr-only">Copy Order ID</span>
                      </Button>
                    </CardTitle>
                    <CardDescription>{t('orders.date')}: {moment.utc(order?.created_at).format('DD/MM/YYYY')}</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">{t('orders.details')}</div>
                    <ul className="grid gap-3">
                      {
                        order?.items?.map((_i:any)=>{
                          return (
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                {_i.product?.name} x <span>{_i.quantity}</span>
                              </span>
                              
                              <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(_i.price)}</span>
                            </li>
                          )
                        })
                      }
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('orders.subtotal')}</span>
                        <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(order?.subtotal)}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('orders.shipping')}</span>
                        <span>{ Object.hasOwn(order || {}, 'shipping')? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(order?.shipping): t('orders.pending')}</span>

                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('orders.tax')}</span>
                        <span>{ Object.hasOwn(order || {}, 'shipping')? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(order?.shipping): t('orders.pending')}</span>
                        
                      </li>
                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">{t('orders.total')}</span>
                        <span>{Object.hasOwn(order || {}, 'total')? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(order?.total) : t('orders.pending')}</span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <div className="font-semibold">{t('orders.shipping')}</div>
                      <address className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>{order?.address?.address}</span>
                        <span>{order?.address?.city}</span>
                        <span>{order?.address?.state}</span>
                        {
                          order?.address?.zip && <span>{order?.address?.zip}</span>
                        }
                        <span>{order?.address?.country}</span>
                      </address>
                    </div>
                    <div className="grid auto-rows-max gap-3">
                      <div className="font-semibold">{t('orders.delivery')}</div>
                      <div className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>{order?.address?.to}</span>
                        <span>{order?.address?.directions}</span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">{t('orders.customer')}</div>
                    <dl className="grid gap-3">
                      {
                        order?.user?.profile?.first_name && order?.user?.profile?.last_name && 
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">{t('orders.name')}</dt>
                          <dd>{order?.user?.profile?.first_name} {order?.user?.profile?.last_name}</dd>
                        </div>
                      }
                      {
                        order?.user?.profile?.email && 
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">{t('orders.email')}</dt>
                          <dd>
                            <a href={`mailto:${order?.user?.profile?.email}`}>{order?.user?.profile?.email}</a>
                          </dd>
                        </div>
                      }
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">{t('orders.phone')}</dt>
                        <dd>
                          <a href="tel:">{order?.user?.number}</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    {t('orders.updated')} <time dateTime="2023-11-23">{moment.utc(order?.updated_at).format('DD/MM/YYYY')}</time>
                  </div>
                  <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <Button disabled={order?.index === 0} size="icon" variant="outline" className="h-6 w-6" onClick={()=>{setOrder(data[order?.index - 1])}}>
                          <LuChevronLeft className="h-3.5 w-3.5" />
                          <span className="sr-only">Previous Order</span>
                        </Button>
                      </PaginationItem>
                      <PaginationItem>
                        <Button disabled={order?.index === data.length - 1} size="icon" variant="outline" className="h-6 w-6" onClick={()=>{setOrder(data[order?.index + 1])}}>
                          <LuChevronRight className="h-3.5 w-3.5" />
                          <span className="sr-only">Next Order</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>

          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}



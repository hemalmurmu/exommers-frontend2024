
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Skeleton } from "../components/loader";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { CustomError } from "../types/apiTypes";
import { UserReducerInitialState } from "../types/reducer-types";


type DataType={
  _id: string;
  amount:number;
  qunatity:number;
  discount:number;
  status:ReactElement;
  action:ReactElement;
}

const column: Column<DataType>[] = [
  {
    Header:"ID",
    accessor: "_id",
  },
  {
    Header:"Quantity",
    accessor: "qunatity",
  },
  {
    Header:"Discount",
    accessor: "discount",
  },
  {
    Header:"Amount",
    accessor: "amount",
  },
  {
    Header:"Status",
    accessor: "status",
  },
  {
    Header:"Action",
    accessor: "action",
  },

]

const Orders = () => {
  const {user} = useSelector((state:{userReducer:UserReducerInitialState})=> state.userReducer)
  const {data,isError,error,isLoading}=useMyOrdersQuery(user?._id!);
  
  
  const [rows,setRows] =useState<DataType[]>([]);

  if(isError){
    toast.error((error as CustomError).data.message);
  }

  useEffect(()=>{
    if(data){
      setRows(
        data.orders.map((i)=>{
          if(user?.role==="admin"){
            return (
              ({
                _id: i._id,
                amount:i.total,
                qunatity:i.orderItems.length,
                discount:i.discount,
                status:<span className={i.status ==="Processing"?"red":i.status==="Shipped"?"green":"purple"}>{i.status}</span>,
                action:<Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
            })
            )
          }else{
            return (
              ({
                _id: i._id,
                amount:i.total,
                qunatity:i.orderItems.length,
                discount:i.discount,
                status:<span className={i.status ==="Processing"?"red":i.status==="Shipped"?"green":"purple"}>{i.status}</span>,
                action:<Link to={`/orders/${i._id}`}>View Product</Link>,
            })
            )
          }
        }))
    }
  },[data])

    const table = TableHOC<DataType>(column,rows,"dashboar-product-box","Orders",rows.length >6)()
  return (
    <div className="container">
        <h1>My Orders</h1>
        <main>{isLoading? <Skeleton width="unset"/> :table}</main>
    </div>

  )
}

export default Orders
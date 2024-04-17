import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { CartReducerInitialState } from "../types/reducer-types"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { server } from "../redux/reducers/store"
import toast from "react-hot-toast"
import { addShippingInfo } from "../redux/reducers/cartReducer"

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {cartItems,total} = useSelector((state:{cartReducer:CartReducerInitialState})=> state.cartReducer)
   useEffect(()=>{
    if(cartItems.length<=0){
        return navigate("/cart")
    }
   },[cartItems])
   
    const [shippingInfo,setShippingInfo] =useState({
        address:"",
        city:"",
        state:"",
        country:"",
        pincode:"",
    })


    const changeHandler=(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setShippingInfo((prev)=>({...prev,[e.target.name] : e.target.value}))
        console.log(shippingInfo)
    }

    const submitHandler=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(addShippingInfo(shippingInfo))
       try {
        const {data} = await axios.post(`${server}/api/v1/payment/create`,{
            amount:total
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            });

            navigate("/pay",{
                state:data.clientSecret,
            })
       } catch (error) {
        toast.error("Something went wrong")
       }
    }

  return (
    <div className="shipping">
        <button className="backBtn" onClick={()=> navigate("/cart")}>
            <BiArrowBack/>
        </button>

        <form onSubmit={submitHandler}>

            <h1>Shipping Address</h1>
            <input placeholder="Address" type="text" name="address" value={shippingInfo.address} onChange={changeHandler} required/>
            <input placeholder="City" type="text" name="city" value={shippingInfo.city} onChange={changeHandler} required/>
            <input placeholder="State" type="text" name="state" value={shippingInfo.state} onChange={changeHandler} required/>
            <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                <option value="">Choose Country</option>
                <option value="india">India</option>
                
            </select>
    
            <input placeholder="Pincode" type="number" name="pincode" value={shippingInfo.pincode} onChange={changeHandler} required/>
            <button type="submit">PAY NOW</button>
        </form>
    </div>
  )
}

export default Shipping
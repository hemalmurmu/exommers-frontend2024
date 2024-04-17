import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { PlaceOrderRequest } from "../types/apiTypes"
import { CartReducerInitialState, UserReducerInitialState } from "../types/reducer-types"
import { useNewOrderMutation } from "../redux/api/orderApi"
import { responseToast } from "../utils/fetures"
import { resetCart } from "../redux/reducers/cartReducer"

const stripePromimse = loadStripe(import.meta.env.VITE_STRIPE_KEY)






const CheckOutForm =()=>{
    
    const stripe =useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const {user} = useSelector((state:{userReducer:UserReducerInitialState})=> state.userReducer)
    const {
        shippingInfo,
        cartItems,
        subTotal,
        tax,
        discount,
        shippingCharges,
        total
    } = useSelector((state:{cartReducer:CartReducerInitialState})=> state.cartReducer)
    const [isProcessing,setProcessing]=useState<boolean>(false)
    const [newOrder] = useNewOrderMutation()
    const submitHandler=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    
        if(!stripe || !elements){
            return 
        }
        console.log(elements)
        setProcessing(true)

        const orderData:PlaceOrderRequest = {
            shippingInfo,
            orderItems:cartItems,
            subTotal,
            tax,
            discount,
            shippingCharges,
            total,
            user:user?._id!
        };

        const {paymentIntent,error} = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url: window.location.origin
            },
            redirect:"if_required"
        })
        console.log(paymentIntent)

        if(error){
            setProcessing(false)
            console.log(error)
            return toast.error(error.message || "Somethiing Went Wrong");
            
        }

        if(paymentIntent.status==="succeeded"){
            // console.log("Placing Order")
            const res = await newOrder(orderData)
            dispatch(resetCart())
            responseToast(res,navigate,"/orders")
        }
        setProcessing(false)
    }
    return  (
    <div className="checkout-container">
        <form onSubmit={submitHandler} >
            <PaymentElement/>
            <button type="submit" disabled={isProcessing}>
                {
                    isProcessing? "Processing": "Pay"
                }
            </button>
        </form>
       </div>
       )
    
}

const CheckOut = () => {
    const location = useLocation();
    const clientSecret:string | undefined = location.state

    if(!clientSecret){
        return <Navigate to={"/shipping"}/>
    }
  return (
    <Elements options={({
        clientSecret
    })} stripe={stripePromimse} >
        <CheckOutForm/>
    </Elements>
  )
}

export default CheckOut
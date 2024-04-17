import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import { addDiscount, addTocart, calculatePrice, removeFromCart } from "../redux/reducers/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/reducers/store";

;



const Cart = () => {

  const {cartItems,subTotal,tax,total,shippingCharges,discount} = useSelector((state:{cartReducer:CartReducerInitialState})=> state.cartReducer)
  const dispatch = useDispatch();
  const [couponCode,setCouponCode] = useState("");
  const [isValidCouponCode,setIsValieCouponCode] = useState(false);


  const incrementHandler=(cartItem:CartItem)=>{

    if(cartItem.quantity>= cartItem.stock) return toast.error("Max stock exceeded")

    dispatch(addTocart({...cartItem,quantity: cartItem.quantity+1}))
  }

  const decrementHandler=(cartItem:CartItem)=>{
    if(cartItem.quantity<=1){
      return 
    }
    dispatch(addTocart({...cartItem,quantity: cartItem.quantity-1}))
  }

  const removiHandler=(productId:string)=>{

    dispatch(removeFromCart(productId))
  }

  useEffect(()=>{
    const  {token,cancel} = axios.CancelToken.source()
  const timeId = setTimeout(() => {
    axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{
      cancelToken:token,
    }).then((res)=>{
      dispatch(addDiscount(res.data.discount));
      dispatch(calculatePrice())
      setIsValieCouponCode(true);

    })
    .catch(()=>{
      dispatch(addDiscount(0));
      setIsValieCouponCode(false);
      dispatch(calculatePrice())
    })
    if(Math.random()>0.5){
      setIsValieCouponCode(true);
    }else{
      setIsValieCouponCode(false)
    }
  }, 1000);


    return()=>{
      clearTimeout(timeId)
      cancel()
      setIsValieCouponCode(false)
    }

  },[couponCode])


  useEffect(()=>{
    dispatch(calculatePrice())
  },[cartItems])
  return (
    <div className="cart">
      <main>

        {
          cartItems.length>0 ?  
          cartItems.map((i,index)=>(
              <CartItemCard key={index} cartItem={i} incrementHandler={incrementHandler} decrementHandler={decrementHandler} removiHandler={removiHandler}/>
            ))
           : <h1>No Items Added</h1>
        }


      </main>



      <aside>
        <p>Subtotal: ₹{subTotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>


        <p>
          Discount:<em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>
            Total: ₹{total}
          </b>
        </p>
        <input placeholder="Coupon Code" value={couponCode} onChange={(e)=> setCouponCode(e.target.value)} />
        {
          couponCode && (
            isValidCouponCode ? (<span className="green">₹{discount} off using the <code>{couponCode}</code> </span>):
          (<span className="red">Invalid Coupon <VscError/></span>)
          )
        }
        {
          cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>
        }
      </aside>
      </div>
  )
}

export default Cart;
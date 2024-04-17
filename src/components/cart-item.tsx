import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/reducers/store";
import { CartItem } from "../types/types";

type CartItemProps={
  cartItem:CartItem;
  incrementHandler:(cartItem:CartItem) => void;
  decrementHandler:(CartItem:CartItem)=> void;
  removiHandler:(id:string)=>void
}


const CartItemItem = ({cartItem,incrementHandler,decrementHandler,removiHandler}:CartItemProps) => {

  const {photo,productId,name,price,quantity} =cartItem;
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name}/>
      <article>
        <Link to={`/product/${productId}`}>
          {name}
        </Link>
        <span>
        ₹{price}
        </span>
      </article>
      <div>
        <button onClick={()=>decrementHandler(cartItem)}>
          -
        </button>
        <p>{quantity}</p>
        <button onClick={()=>incrementHandler(cartItem)}>+</button>
      </div>
      <button onClick={()=>removiHandler(productId!)}>
        <FaTrash/>
      </button>
    </div>
  )
}

export default CartItemItem
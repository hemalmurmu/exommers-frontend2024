import { FaEye, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { server } from "../redux/reducers/store";
import { CartItem } from "../types/types";


type ProductProps={
  productId:string;
  photo: string;
  name:string;
  price:number;
  stock:number;
  handler:(cartItem: CartItem) => string | undefined;
}

const ProductCard = ({productId,photo,name,price,stock,handler}:ProductProps) => {
  const navigate = useNavigate()
  const handlerClick=()=>{
    return navigate(`/product/${productId}`)
  }
  return (
    <div className="productCard">
      <img src={`${server}/${photo}`}  alt={name}/>
      <p>{name}</p>
      <span>₹{price}</span>
      <div>
        <button onClick={()=>handler({
          productId,photo,name,price,stock,quantity:1
        })}>
          <FaPlus/>
        </button>
        <button onClick={handlerClick}>
          <FaEye />
        </button>
      </div>
    </div> 
  )
}

export default ProductCard;
import toast from 'react-hot-toast';
import { FaX } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '../components/loader';
import { useProductDetailsQuery } from '../redux/api/productApi';
import { addTocart } from '../redux/reducers/cartReducer';
import { server } from '../redux/reducers/store';
import { CartItem } from '../types/types';



const ProductDelatil = () => {
    const params = useParams();
    const productId = params.id;
     const navigate = useNavigate();
     const dispatch  = useDispatch();
     console.log(typeof productId?.toString())

     const {data,isLoading,isError} = useProductDetailsQuery(params.id!);
     console.log("deatisls",data)

     const {price,photo,name,stock,category} = data?.product || {
        photo:"",
        category:"",
        name:"",
        stock:0,
        price:0
      }

      const addToCarthandler=(cartItem:CartItem)=>{
        if(cartItem.stock<1) return toast.error("Out of stick");
    
        dispatch(addTocart(cartItem))
        toast.success("Item added to cart")
      }


    const deleteHandler=()=>{
        navigate("/");
    }


     if(isError){
        return <Navigate to={"/404"}/>
      }
    return (
  <div className="order-container">
  <main className="order-management">
    {
      isLoading? <Skeleton count={10}/> :(
        <>
        <section>
        <strong>{category.toLocaleUpperCase()}</strong>
      <img src={`${server}/${photo}`} alt="Product" />
      <p>{name}</p>
      {stock > 0 ? (
        <span className="green">{stock} Available</span>
      ) : (
        <span className="red"> Not Available</span>
      )}
      <h3>₹{price}</h3>
    </section>
    <article className="shipping-info-card">
            <button className="product-delete-btn" onClick={deleteHandler}>
              <FaX />
            </button>
            <h1>Product Details</h1>
            <p>Name: {name}</p>
            <p>
              
            </p>
            <p>Price: {price}</p>
            
            <button className="shipping-btn" onClick={()=>addToCarthandler({ productId,photo,name,price,stock,quantity:1})}>
              Add to cart
            </button>
          </article>
        </>
      )
    }
  </main>
</div>
);
}

export default ProductDelatil
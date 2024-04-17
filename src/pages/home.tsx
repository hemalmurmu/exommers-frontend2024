import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { addTocart } from "../redux/reducers/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const {data,isLoading,isError} = useLatestProductsQuery("")
  const dispatch  = useDispatch();
  const addToCarthandler=(cartItem:CartItem)=>{
    if(cartItem.stock<1) return toast.error("Out of stick");

    dispatch(addTocart(cartItem))
    toast.success("Item added to cart")
  }

  if(isError){
    toast.error("Can't fetch Products")
  }
  return (
    <div className="home">
      {/* section */}
      <section></section>
      <h1>
        Latest Products
        <Link to={"/search"} className="findmore">More</Link>
      </h1>
      <main>
       {isLoading? <Skeleton width="80vw"/> : 
       ( data?.products.map((i)=>( <ProductCard
          key={i._id} productId={i._id} name={i.name} price={i.price} stock={i.stock} photo={i.photo} handler={addToCarthandler}/>)))
       }
      </main>
    </div>
  )
}

export default Home;
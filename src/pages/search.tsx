import { useState } from "react";
import ProductCard from "../components/product-card";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/apiTypes";
import { Skeleton } from "../components/loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addTocart } from "../redux/reducers/cartReducer";

const Search = () => {
  const dispatch = useDispatch()
  const {data:categoriesResponse,isLoading:loadingCategories,error,isError} = useCategoriesQuery("");
  const [search,setsearch] =useState("");
  const [sort,setSort] = useState("");

  const [maxPrice,setMaxPrice] = useState(1000000);
  const [category,setCatagory] =useState("");
  const [page,setPage] =useState(1);



  const {data:searchData,isLoading:productLoading,isError:productIsError,error:productError} = useSearchProductsQuery({search,sort,category,page,price:maxPrice})

   const addToCarthandler=(cartItem:CartItem)=>{
    if(cartItem.stock<1) return toast.error("Out of stick");

    dispatch(addTocart(cartItem))
    toast.success("Item added to cart")
  }

  const isNextPage = page < 4;
  const isPrevPage = page > 1;


  if(isError){
    toast.error((error as CustomError).data.message);
  }

  if(productIsError){
    toast.error((productError as CustomError).data.message);
  }
  

  
  return (

    <div className="product-search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e)=> setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="desc">Price (High to Low)</option>

          </select>
          </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input type="range" min={100} max={100000} value={maxPrice} onChange={(e)=> setMaxPrice(Number(e.target.value))}/>
          </div>
          <div>
          <h4>Catagory:</h4>
          <select value={category} onChange={(e)=> setCatagory(e.target.value)}>
            <option value="">All</option>
           {
            !loadingCategories && categoriesResponse?.categories.map((i)=>(
              <option key={i} value={i}>{i.toUpperCase()}</option>
            ))
           }

          </select>

          </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search By name" value={search} onChange={(e)=> setsearch(e.target.value)}/>
        

       {
        productLoading? <Skeleton count={10}/> :(
          <div className="search-product-list">
          {
            searchData?.products.map((i=>(
              <ProductCard key={i._id} productId={i._id} name={i.name} price={i.price} stock={i.stock} photo={i.photo} handler={addToCarthandler}/>
            )))
          }
        </div>
        )
       }
      
      {
        searchData && searchData.totalPage >1 &&(
          <article>
        <button onClick={()=> setPage((prev)=> prev-1)} disabled={!isPrevPage}>Prev</button>
        <span>{page} of {searchData.totalPage}</span>
        <button onClick={()=> setPage((prev)=> prev+1)} disabled={!isNextPage}>Next</button>
      </article>
        )
      }
      </main>
      </div>
  )
}

export default Search;
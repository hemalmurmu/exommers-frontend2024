import { Link, useNavigate, useParams } from "react-router-dom";
import { Order, OrderItem } from "../types/types";
import { useOrderDetailsQuery } from "../redux/api/orderApi";
import { Skeleton } from "../components/loader";
import { server } from "../redux/reducers/store";
import toast from "react-hot-toast";
import { CustomError } from "../types/apiTypes";


const orderItems:any[] = []

  const DefaultData:Order ={
    shippingInfo:{
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    status: "",
    subTotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    total:0,
    orderItems,
    user:{
      name:"",
      _id:"",
    },
    _id:"",

  }

const orderDetails = () => {
  const params = useParams()
  const navigate= useNavigate()
  const {data,isError,isLoading,error}=useOrderDetailsQuery(params?.id!);

  const navigateHandler=()=>{
    navigate("/orders")
  }


  if(isError){
    toast.error((error as CustomError).data.message);
  }


  const {shippingInfo:{
    address,city,state,country,pincode
  },orderItems,user:{name},status,tax,subTotal,total,discount,shippingCharges} = data?.order || DefaultData;
  
  
  return (
  
      <div className="order-container">
        <main className="order-management">
         {
          isLoading? <Skeleton count={10}/>:
          <>
           <section
            style={{
              padding: "2rem",
            }}
          >
            <h2>Order Items</h2>
  
            {orderItems.map((i) => (
              <ProductCard
                key={i._id}
                name={i.name}
                photo={`${server}/${i.photo}`}
                productId={i.productId}
                _id={i._id}
                quantity={i.quantity}
                price={i.price}
              />
            ))}
          </section>
  
          <article className="shipping-info-card">
            {/* <button className="product-delete-btn" onClick={deleteHandler}>
              <FaTrash />
            </button> */}
            <h1>Order Info</h1>
            <h5>User Info</h5>
            <p>Name: {name}</p>
            <p>
              Address: {`${address}, ${city}, ${state}, ${country} ${pincode}`}
            </p>
            <h5>Amount Info</h5>
            <p>Subtotal: {subTotal}</p>
            <p>Shipping Charges: {shippingCharges}</p>
            <p>Tax: {tax}</p>
            <p>Discount: {discount}</p>
            <p>Total: {total}</p>
  
            <h5>Status Info</h5>
            <p>
              Status:{" "}
              <span
                className={
                  status === "Delivered"
                    ? "purple"
                    : status === "Shipped"
                    ? "green"
                    : "red"
                }
              >
                {status}
              </span>
            </p>
            <button className="shipping-btn" onClick={navigateHandler}>
              Back to my orders
            </button>
          </article>
          </>
         }
        </main>
      </div>
    );
  };
  
  const ProductCard = ({
    name,
    photo,
    price,
    quantity,
    productId,
  }: OrderItem) => (
    <div className="transaction-product-card">
      <img src={photo} alt={name} />
      <Link to={`/product/${productId}`}>{name}</Link>
      <span>
        ₹{price} X {quantity} = ₹{price * quantity}
      </span>
    </div>
  );

export default orderDetails
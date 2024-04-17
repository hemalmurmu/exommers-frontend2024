import { CartItem, Line, Order, Product, User, bar, pie, shippingInfo, stats } from "./types"

export type messageResponse={
    success:boolean,
    message:string,
    user?:User
}

export type CustomError={
    status:number;
    data:{
        message:string;
        success:boolean;
    }
}


export type UserResponse={
    success:boolean,
    user:User,
}


export type AllProductResponse={
    success:boolean,
    products:Product[],
}

export type CategoryResponse={
    success:boolean,
    categories:string[],
}


export type SearchProductsResponse= AllProductResponse&{
    totalPage:number,
}


export type SearchProductsRequest={
    price:number;
    page:number;
    category:string;
    sort:string;
    search:string;
}


export type CreateProductRequest={
    id:string;
    formData :FormData;
}


export type ProductDetails={
   success:boolean;
   product:Product;
}


export type UpdateProductRequest={
    userId:string;
    productId:string;
    formData: FormData;
 }

 export type DeleteProductRequest={
    userId:string;
    productId:string;
 }


 export type PlaceOrderRequest={
    orderItems : CartItem[],
    subTotal:number,
    tax: number;
    shippingCharges:number,
    discount:number,
    total:number,
    shippingInfo:shippingInfo,
    user:string
 }



 
export type AllOrdersResponse={
    success:boolean,
    orders:Order[],
}



export type OrderDetailResponse={
    success:boolean,
    order:Order,
}


export type UpdateOrderrequest={
   orderId:string;
    userId:string
 }


 export type AllUsersResponse={
    success:boolean,
    users:User[],
 }


 export type DeleteUserrequest={
    userId:string,
    adminUserID:string,
 }


 export type StatsResponse={
    success:boolean,
    stats:stats,
 }


 export type PieResponse={
    success:boolean,
    charts:pie,
 }

 export type BarResponse={
    success:boolean,
    charts:bar,
 }


 export type LineResponse={
    success:boolean,
    charts:Line,
 }




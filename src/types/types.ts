export type User={
    name:string;
    email:string;
    photo:string;
    gender:string;
    role:string;
    dob:string;
    _id:string;
}


export type Product={
    name:string;
    category:string;
    photo:string;
    price:number;
    stock:number;
    _id:string;
}


export type shippingInfo={
    address:string;
    city:string;
    state:string;
    country:string;
    pincode:string;
}


export type CartItem={
    productId:string | undefined;
    photo:string;
    name:string;
    price:number;
    quantity:number;
    stock:number;
}


export type OrderItem= Omit<CartItem,"stock"> &{
    _id:string;
}


export type Order={
    orderItems: OrderItem[];
    shippingInfo: shippingInfo;
    subTotal:number,
    tax: number;
    shippingCharges:number,
    discount:number,
    total:number,
    status:string,
    user:{
        name:string;
        _id:string;
    },
    _id:string
}

type CountAndChange={
    revenu: number;
    Product: number;
    user: number;
    order: number;
}


type LastestTransaction={
    _id: string,
    discount: number,
    amount: number,
    quantity: number,
    status: string
}


export type stats={
    categoryCount:Record<string, number>[],
    percentChange:CountAndChange,
    counts:CountAndChange,
    charts:{
     order: number[],
     revenue: number[],

 },
 genderRatio:{
    male:number,
    female:number
 },
 lastestTransaction:LastestTransaction[]
 }



 
export type pie={
    orderFullfillment:{
        processing: number;
        shipped: number;
     delivered: number;
     },
    productsCategories:Record<string, number>[],
    stockAvailability:{
        inStock: number;
        outOfStock: number;
    },
    revenueTistribution:{
        netMargin: number;
        discount: number;
        productionCost: number;
        burn: number;
        marketingCost: number;
    },
    adminCustomer:{
        admin: number;
    customers: number;
    },
    userAgeGroup:{
        teen: number;
        adult: number;
        old: number;
    }
 }


 export type bar={
    users:number[],
    products:number[],
    orders:number[],
 }


 export type Line={
    users:number[],
    products:number[],
    discount:number[],
    revenu:number[]
 }


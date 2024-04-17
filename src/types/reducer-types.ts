import { CartItem, User, shippingInfo } from "./types";

export interface UserReducerInitialState{
    user:User | null,
    loading:boolean
}


export interface CartReducerInitialState{
    cartItems : CartItem[],
    loading:boolean,
    subTotal:number,
    tax: number;
    shippingCharges:number,
    discount:number,
    total:number,
    shippingInfo:shippingInfo

}
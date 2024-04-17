
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, shippingInfo } from "../../types/types";




const initialState:CartReducerInitialState={
    loading:false,
    cartItems:[],
    subTotal:0,
    tax:0,
    shippingCharges:0,
    discount:0,
    total:0,
    shippingInfo:{
        address:"",
        city:"",
        state:"",
        country:"",
        pincode:"",
    }
}


export const cartReducer= createSlice({
    name:"cartReducer",
    initialState,
    reducers:{
        addTocart:(state,action:PayloadAction<CartItem>)=>{
            state.loading=true;
            const index = state.cartItems.findIndex((i)=>i.productId === action.payload.productId);
            if(index!=-1){
                state.cartItems[index]=action.payload
            }else{
                state.cartItems.push(action.payload);
            }
            
            state.loading=false;
        },
        removeFromCart:(state,action:PayloadAction<string>)=>{
            state.loading=true,
            state.cartItems=state.cartItems.filter((i)=> i.productId!== action.payload),
            state.loading=false;
        },
        calculatePrice:(state)=>{
            let subTotal = 0;

            for(let i=0;i<state.cartItems.length;i++){
                const item = state.cartItems[i];
                subTotal += item.price * item.quantity;
            }

            state.subTotal = subTotal;
            state.shippingCharges = state.subTotal> 1000?0 :200;
            state.tax=Math.round(state.subTotal *0.18);
            state.total = state.subTotal+ state.tax+state.shippingCharges - state.discount
        },
        addDiscount:(state,action:PayloadAction<number>)=>{

            state.discount = action.payload;
        },
        addShippingInfo: (state,action:PayloadAction<shippingInfo>)=>{
            state.shippingInfo = action.payload
        },
        resetCart:()=> initialState
    },
    

})


export const {addDiscount,addTocart,removeFromCart,calculatePrice,addShippingInfo,resetCart} = cartReducer.actions
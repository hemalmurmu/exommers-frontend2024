import { configureStore} from "@reduxjs/toolkit";
import { productApi } from "../api/productApi";
import { userApi } from "../api/userApi";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { orderApi } from "../api/orderApi";
import { dashBoardApi } from "../api/dashBoardApi";

export const server=import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]:cartReducer.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [dashBoardApi.reducerPath]:dashBoardApi.reducer,
        
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(userApi.middleware,productApi.middleware,orderApi.middleware,dashBoardApi.middleware)
});
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { AllUsersResponse, DeleteUserrequest, UserResponse, messageResponse } from "../../types/apiTypes";
import { User } from "../../types/types";
export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/user/`}),
    tagTypes:["users"],
    endpoints:(builder)=>({
        login :builder.mutation<messageResponse,User>({
            query:(user)=>({
            url:"new",
            method:"POST",
            body:user
        }), 
        invalidatesTags:["users"]
    }),
    allUsers:builder.query<AllUsersResponse,string>({
        query:(id)=> `all/?id=${id}`,
       providesTags:["users"],
    }),
    deleteUsers :builder.mutation<messageResponse,DeleteUserrequest>({
        query:({userId,adminUserID})=>({
        url:`${userId}?id=${adminUserID}`,
        method:"DELETE",
    }), 
    invalidatesTags:["users"]
}),

    })
})


export const getUser = async(id:string)=>{
    try {
        const {data}:{data:UserResponse}=await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`);
        return data;
    } catch (error) {
        throw error
    }
}


export const {useLoginMutation,useAllUsersQuery,useDeleteUsersMutation} = userApi
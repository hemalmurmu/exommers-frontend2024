import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductResponse, CategoryResponse, CreateProductRequest, DeleteProductRequest, ProductDetails, SearchProductsRequest, SearchProductsResponse, UpdateProductRequest, messageResponse } from "../../types/apiTypes";

export const productApi = createApi({
    reducerPath:"productApi",
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/product/`}),
    tagTypes:["product"],
    endpoints:(builder)=>({
        latestProducts:builder.query<AllProductResponse,string>({
            query:()=>"latest",
            providesTags:["product"]
        }),
        Allproducts:builder.query<AllProductResponse,string>({
            query:(id)=>`admin-products?id=${id}`,
            providesTags:["product"]
        }),
        categories:builder.query<CategoryResponse,string>({
            query:()=>`categories`,
            providesTags:["product"]
        }),
        searchProducts:builder.query<SearchProductsResponse,SearchProductsRequest>({
            query:({price,search,sort,page,category})=>{
                console.log(price,search,sort,page,category)
                let base = `all?search=${search}&page=${page}`;
                
                if(price) base +=`&price=${price}`;
                if(sort) base +=`&sort=${sort}`;
                if(category) base+=`&category=${category}`;
                console.log(base)
                return base;
            },
            providesTags:["product"]
        }),
        productDetails:builder.query<ProductDetails,string>({
            query:(id)=>id,
            providesTags:["product"]
        }),
        createProduct:builder.mutation<messageResponse,CreateProductRequest>({
            query:({formData,id})=>({
                url: `new?id=${id}`,
                method:"POST",
                body:formData
            }),
            invalidatesTags:["product"]
        }),
        updateProduct:builder.mutation<messageResponse,UpdateProductRequest>({
            query:({formData,userId,productId})=>({
                url: `${productId}?id=${userId}`,
                method:"PUT",
                body:formData
            }),
            invalidatesTags:["product"]
        }),
        deleteProduct:builder.mutation<messageResponse,DeleteProductRequest>({
            query:({userId,productId})=>({
                url: `${productId}?id=${userId}`,
                method:"DELETE",
            }),
            invalidatesTags:["product"]
        }),

    })
})



export const {useDeleteProductMutation,useUpdateProductMutation,useProductDetailsQuery,useLatestProductsQuery,useAllproductsQuery,useCategoriesQuery,useSearchProductsQuery,useCreateProductMutation} = productApi;
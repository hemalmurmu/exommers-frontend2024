import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { messageResponse } from "../types/apiTypes";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";



type ResType = 
{
    data: messageResponse;
} | {
    error: FetchBaseQueryError | SerializedError;
}



export const responseToast = (res:ResType,navigate:NavigateFunction | null,url:string)=>{
    if("data" in res){
        toast.success(res.data.message);
        if(navigate){
            navigate(url);
        }else if("error" in res){
            
            const error = res.error as FetchBaseQueryError;
            const messageResponse = error.data as messageResponse;
            toast.error(messageResponse.message)
        }
    }
}

export const getLastMonths=()=>{
    const currentDate = moment();
    currentDate.date(1);

    const lastSixMonths: string[] = [];
    const last12Months: string[]=[];

    for(let i=0;i<6;i++){
        const month = currentDate.clone().subtract(i,"months");
        const monthName = month.format("MMMM");
        lastSixMonths.unshift(monthName);
    }

    for(let i=0;i<12;i++){
        const month = currentDate.clone().subtract(i,"months");
        const monthName = month.format("MMMM");
        last12Months.unshift(monthName);
    }


    return {
        last12Months,lastSixMonths
    }
}

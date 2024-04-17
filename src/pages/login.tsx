import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { messageResponse } from "../types/apiTypes";
import { useDispatch } from "react-redux";
import { userExists, userNotExists } from "../redux/reducers/userReducer";

const Login = () => {
    const [gender,setGender] = useState("");
    const [date,setDate] = useState("");
    const [login] = useLoginMutation();

    const dispatch = useDispatch();

    const loginHandler=async()=>{
        try {
            const provider = new GoogleAuthProvider()
            const {user} = await signInWithPopup(auth,provider);

            const res=await login({
                name:user.displayName!,
                email:user.email!,
                photo:user.photoURL!,
                gender,
                role:"user",
                dob:date,
                _id:user.uid
            })
           if("data" in res){
            dispatch(userExists(res.data.user!))
            toast.success(res.data.message)
           }else{
            const error = res.error as FetchBaseQueryError;
            const message = (error.data as messageResponse)
            console.log(message)
            toast.error(message.message);
            dispatch(userNotExists())
           }
           console.log(user)
        } catch (error) {
            console.log(error)
            toast.error("Sign In failed")
        }
    }
  return (
    <div className="login">
        <main>
            <h1 className="heading">Loging</h1>
            <div>
                <label>Gender</label>
                <select value={gender} onChange={(e)=> setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
            </div>
            <div>
                <label>Date of birth</label>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            </div>
            <div>
                <p>Already Signed In Once</p>
                <button onClick={loginHandler}>
                    <FcGoogle/><span>Sign in with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login
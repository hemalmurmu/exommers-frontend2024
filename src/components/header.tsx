import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import {User} from "../types/types"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import toast from "react-hot-toast"

interface ProprsType{
    user: User | null
}

const Header = ({user}:ProprsType) => {
    const [isClose,setIsClose] = useState(false);

    const logoutHandler=async()=>{
       try {
        await signOut(auth)
        toast.success("Sign Out Successfully")
       } catch (error) {
        toast.error("Sign Out Fail")
       }
    }

  return (
    <nav className="header">
        <Link to={"/"}  onClick={()=> setIsClose(false)}>
            Home
        </Link>
        <Link to={"/search"}  onClick={()=> setIsClose(false)}>
            <FaSearch/>
        </Link>
        <Link to={"/cart"}  onClick={()=> setIsClose(false)}>
            <FaShoppingBag/>
        </Link>

        {
            user?._id ? (
            <>
            <button onClick={()=> setIsClose(!isClose)}>
            <FaUser/>
            </button>
            <dialog open={isClose}>
                <div>
                    {
                        user.role === "admin" && (
                            <Link onClick={()=> setIsClose(false)} to={"/admin/dashboard"}>Admin</Link>
                        )
                    }
                    <Link onClick={()=> setIsClose(false)} to={"/orders"}>Orders</Link>
                    <button onClick={logoutHandler}>
                        <FaSignOutAlt/>
                    </button>
                </div>
            </dialog>
            
            </>) :
            (
                <Link to={'/login'}><FaSignInAlt/></Link>
            )
        }
    </nav>
  )
}

export default Header
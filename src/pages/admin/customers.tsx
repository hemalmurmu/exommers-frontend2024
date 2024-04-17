import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllUsersQuery,useDeleteUsersMutation} from "../../redux/api/userApi";
import { CustomError } from "../../types/apiTypes";
import { UserReducerInitialState } from "../../types/reducer-types";
import { Skeleton } from "../../components/loader";
import { responseToast } from "../../utils/fetures";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];





const Customers = () => {
  const {user} = useSelector((state:{userReducer:UserReducerInitialState})=> state.userReducer)
  const {data,isError,error,isLoading}=useAllUsersQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  const [deleteUser] = useDeleteUsersMutation()

const deleteHandler=async(userId:string)=>{
  const res = await deleteUser({userId,adminUserID:user?._id!});
  responseToast(res,null,"")
}

console.log(data)


  useEffect(()=>{
    if(data){
      setRows(
        data.users.map((i)=>({
          avatar:<img style={{
            borderRadius:"50%"
          }} src={i.photo} alt={i.name}/>,
          name:i.name,
          email:i.email,
          gender:i.gender,
          role:i.role,
          action: <button onClick={()=>deleteHandler(i._id)}>
          <FaTrash />
        </button>
        }))
        )
    }
  },[data])


  if(isError){
    toast.error((error as CustomError).data.message);
  }

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading? <Skeleton width="unset"/> :Table}</main>
    </div>
  );
};

export default Customers;

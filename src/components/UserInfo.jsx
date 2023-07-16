import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({ name: "..." });
  const [deleted,setDeleted] = useState(false)
  useEffect(() => {
    axios
      .get("https://arzun.onrender.com/users/getuserinfo", { withCredentials: true })
      .then((res) => setUserInfo(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteUser = async (userId)=>{
    axios.delete(`https://arzun.onrender.com/users/${userId}`,{withCredentials:true} )
    .then( res => toast.success(res.data.message))
    .catch(err =>  toast.error(err.response.data.message))
  setDeleted(true)
  }
  return (
    <>
    { deleted?
    <>
 
 <Navigate to={'/login'} />
    </>
    :<>
    <div className="flex absolute right-5 top-5 justify-center items-center  ">
        <button className=" underline ">
            <Link to={'/todo'}>Todo</Link>
            </button>
      </div>

      <div className="MainBody flex justify-center mt-20 ">
        <div className="Container">
          <div className="Circle w-40 h-40  flex justify-center items-center shadow-xl bg-slate-300 rounded-full">
            <div className="  font-mono text-[30px]">
              {(userInfo?.name).charAt(0).toUpperCase() +
                (userInfo?.name).slice(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="MainBody flex justify-center mt-3  ">
        <div className="Container">
          <div className=" bg-slate-300 shadow-lg w-[250px] h-[240px] rounded-lg">
            <div className="p-5 text-sm">
              <p className=" mt-2">  Name:{userInfo.name}</p>
              <p className=" mt-2"> Email:{userInfo.email}</p>
              <p className=" mt-2"> UserId:{userInfo._id}</p>
              <p className=" mt-2"> CreatedAt:{userInfo.createdAt}</p>
            </div>
            <button onClick={()=>deleteUser(userInfo._id)} className=" w-20 h-15 p-1 text-xl bg-red-500 rounded-full relative left-[36%] mt-[18px]">Delete</button>
          </div>
          
        </div>
      </div>
    
    </>}
      
    </>
  );
};

export default UserInfo;

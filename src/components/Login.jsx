import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Login = () => {
  const [isAuthnecated, setIsAuthnecated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelChange = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const data = await axios
      .post(
        "https://arzun.onrender.com/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message), setIsAuthnecated(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setIsLoading(false);
  };

  return (
    <>
      {!isAuthnecated ? (
        <>
          <div className=" w-full h-screen flex justify-center items-center  ">
            <div className="  w-[350px] h-[350px] rounded-xl shadow-l  bg-slate-50">
              <h1 className=" text-center text-[25px] underline ]"> Login </h1>
              <div className=" h-full w-full flex justify-center items-center   ">
                <form
                  onSubmit={handelChange}
                  className=" h-full w-full "
                  action=""
                >
                  <input
                    className=" shadow-2xl indent-4 w-[80%] h-[40px] m-[35px] mt-[40px] rounded-full"
                    placeholder="email"
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className=" shadow-2xl indent-4  w-[80%]  h-[40px] ml-[35px] rounded-full"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    disabled={isLoading}
                    className="  bg-green-400 rounded-full w-[100px] h-[50px] mt-[50px] ml-[125px] text-white"
                  >
                    Login
                  </button>
                  <h1 className=" text-center  text-sm text-blue-400 mt-2 hover:underline cursor-pointer">
                    <Link to={"/"}>Sign Up </Link>
                  </h1>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navigate to={"/todo"} />
        </>
      )}
    </>
  );
};

export default Login;

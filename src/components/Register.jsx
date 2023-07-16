import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { API } from "../App";
import { toast } from "react-hot-toast";
import { Context } from "../main";

const Register = () => {
  const {
    isAuthnecated = false,
    setIsAuthnecated,
    isLoading,
    setIsLoading,
  } = useContext(Context);

  const handleSubmit = async (e) => {
    setIsAuthnecated(false);
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.email.value);
    console.log(e.target.password.value);

    const data = await axios
      .post("https://arzun.onrender.com/users/register", {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        toast.success(res.data.message), setIsAuthnecated(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message), setIsAuthnecated(false);
      });

    setIsLoading(false);
  };

  return (
    <>
      {isAuthnecated ? (
        <>
          <Navigate to="/login" />

        </>
      ) : (
        <>
          <div className=" w-full h-screen flex justify-center items-center  ">
            <div className="  w-[350px] h-[400px] rounded-xl shadow-l  bg-slate-50">
              <h1 className=" text-center text-[25px] underline ]">
                Register{" "}
              </h1>
              <div className=" h-full w-full flex justify-center items-center   ">
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className=" h-full w-full "
                  action=""
                >
                  <input
                    className=" shadow-2xl indent-4  w-[80%]  h-[40px] ml-[35px] mt-[30px] rounded-full"
                    placeholder="name"
                    type="text"
                    name="name"
                    required
                  />
                  <input
                    className=" shadow-2xl indent-4 w-[80%] h-[40px] ml-[35px] mt-[30px] rounded-full"
                    placeholder="email"
                    type='email'
                    name="email"
                    required
                  />
                  <input
                    className=" shadow-2xl indent-4  w-[80%]  h-[40px] ml-[35px] mt-[30px] rounded-full"
                    placeholder="password"
                    type="password"
                    name="password"
                    required
                  />

                  <button
                    disabled={isLoading}
                    className="  bg-green-400 rounded-full w-[100px] h-[50px] mt-[50px] ml-[125px] text-white"
                  >
                    SignUp
                  </button>
                  <h1 className=" text-center  text-sm text-blue-400 mt-2 hover:underline cursor-pointer">
                    <Link to={"/login"}> Login </Link>
                  </h1>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;

/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import AuthInput from "../ui/AuthInput";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, signupUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function AuthModel({ setOpenModal, openModal }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const { token, isLoading, error, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const modelRef = useRef();

  //form submit function
  async function onLoginFormSubmit(data) {
    const result = await dispatch(loginUser(data)); // Dispatch login action

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login Successful! 🎉");
      setOpenModal(false);
      reset();
    } else {
      toast.error(result.payload || "Login Failed");
    }
  }

  // Handle Sign Up form submission
  async function onSignUpFormSubmit(data) {
    const result = await dispatch(signupUser(data));

    if (signupUser.fulfilled.match(result)) {
      toast.success("Signup Successful! 🎉");
      setOpenModal(false);
      reset();
    } else {
      toast.error(result.payload || "Signup failed Failed");
    }
  }
  ////close modal function
  function closeModal(e) {
    if (modelRef.current === e.target) {
      setOpenModal(!openModal);
    }
  }
  return (
    <div
      ref={modelRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black  bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      {!isRegistered ? (
        <div className="bg-stone-50 w-[30rem] rounded-sm px-10 py-5 relative ">
          <button
            className=" absolute right-2 top-2 p-3 hover:bg-stone-200 rounded-full"
            onClick={() => setOpenModal(!openModal)}
          >
            <RxCross1 />
          </button>
          <div className="text-center font-bold text-stone-600 text-xl mb-10">
            {!isRegistered ? "LOGIN" : "Sign Up"}
          </div>
          {/***** * Login Up Form ****/}

          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(onLoginFormSubmit)}
          >
            <AuthInput
              type="text"
              placeholder="enter your email"
              id="email"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              }}
              error={errors.email}
            />
            <AuthInput
              type="password"
              placeholder="enter you password"
              id="password"
              register={register}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be altleast 6 character long",
                },
              }}
              error={errors.password}
            />
            <button className="bg-stone-800 text-stone-50 py-4 rounded-full">
              Sign in
            </button>
          </form>

          <div className="text-center my-4">
            Dont have account ?{" "}
            <button
              className="font-semibold"
              onClick={() => setIsRegistered(!isRegistered)}
            >
              Sign Up
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-stone-50 w-[30rem] rounded-sm px-10 py-5">
          <div className="text-center font-bold text-stone-600 text-xl mb-10">
            {!isRegistered ? "LOGIN" : "Sign Up"}
          </div>
          {/***** * Sign Up Form ****/}
          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(onSignUpFormSubmit)}
          >
            <AuthInput
              type="text"
              placeholder="enter your name"
              id="name"
              register={register}
              validation={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username should be altleast 3 character long",
                },
              }}
              error={errors.name}
            />
            <AuthInput
              type="text"
              placeholder="enter your email"
              id="email"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              }}
              error={errors.email}
            />
            <AuthInput
              type="password"
              placeholder="enter you password"
              id="password"
              register={register}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be altleast 6 character long",
                },
              }}
              error={errors.password}
            />
            <button className="bg-stone-800 text-stone-50 py-4 rounded-full">
              Sign Up
            </button>
          </form>

          <div className="text-center my-4">
            Already have an account?{" "}
            <button
              className="font-semibold"
              onClick={() => setIsRegistered(!isRegistered)}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

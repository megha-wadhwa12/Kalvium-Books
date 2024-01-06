import React, { useMemo , useContext } from "react";
import Navbar from "./Navbar";
import FormSide from "./../assets/FormSide.png";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from './ParentContext'
import { useNavigate } from "react-router-dom"


const Register = () => {

  const {isLogin,setIsLogin} = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit, 
    watch,
    getValues,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm();
  // console.log('form', useForm)
  console.log("isSubmitSuccessful", isSubmitSuccessful);
  console.log("isSubmitted", isSubmitted);

  

  const formSubmit = () => {
    const userData = {
      Name: getValues("name"),
      Email: getValues("email"),
      Password: getValues("password")
    }
    
    console.log(isSubmitSuccessful);
    setIsLogin(true)
    localStorage.setItem("User",JSON.stringify(userData))
      setTimeout(()=>{
        navigate("/")
      },5000)
      toast.success('Form Submitted Successfully', {

        position: 'top-left',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
  };

    const toastHandler =() => {
      if (isSubmitted) {

        for (const errorKey in errors) {
          const errorMessage = errors[errorKey]?.message;
          if (errorMessage) {
            toast.error(errorMessage, {
              position: 'top-left',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            console.log('errorKey', errorKey)
          }
        }
    }
  }
  // const toastHandler =useMemo(() => {
  // },[,errors,isSubmitSuccessful]);  


  const password = watch("password");

  return (
    <div>
      <ToastContainer />
      <ToastContainer toastHandler={toastHandler()} />
      <Navbar />
      <div className="registerMain">
        <img src={FormSide} alt="" />
        <div className="form">
          <div>
            <h1>REGISTRATION FORM</h1>
            <form
              action="#"
              onSubmit={handleSubmit(formSubmit)}
              className="form-content"
            >
              {isSubmitSuccessful && (
                <div className="success">
                  <p>Registration Successful</p>
                </div>
              )}
              <div className="input-div">
                <label htmlFor="name">Name</label>
                <input
                  className="input-field"
                  type="text"
                  id="name"
                  name="name"
                  {...register("name", {
                    required: "Enter you First Name",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters permitted",
                    },
                  })}
                />
                <p className="err">{errors.name?.message}</p>
              </div>
              <div className="input-div">
                <label htmlFor="email">Email</label>
                <input
                  className="input-field"
                  id="email"
                  type="email"
                  name="email"
                  {...register("email", {
                    required: "Enter your e-mail ID",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid e-mail address",
                    },
                  })}
                />
                <p className="err">{errors.email?.message}</p>
              </div>
              <div className="input-div">
                <label htmlFor="password">Password</label>
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  id="password"
                  {...register("password", {
                    required: "Enter password",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters required",
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/,
                      message: "Invalid Password",
                    },
                  })}
                />
                <p className="err">{errors.password?.message}</p>
              </div>
              <div className="input-div">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className="input-field"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please Confirm your Password",
                    validate: (value) => {
                      if (value != password) {
                        return "Confirm Password should be same as the Password";
                      }
                      return true;
                    },
                  })}
                />
                <p className="err">{errors.confirmPassword?.message}</p>
              </div>
              <div className="input-div">
                <input type="submit" value="SIGN-IN" className="sign-in" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register

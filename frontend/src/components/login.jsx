
import {useForm} from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner'
import axios from 'axios'



const Login = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const baseURL = "http://localhost:4000";
    const baseURL = "https://flight-api-40qk.onrender.com";

    const toggleVisibility = () => {
        setPasswordVisible(!passwordVisible)
    } 


    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {

        setIsLoading(true);
        let {email, domain, password} = formData
        email = email+domain;

        try {

            await axios.post(`${baseURL}/api/v1/auth/login`, {email, password});
            // console.log(res.data);
            reset();
            setIsLoading(false);
            navigate('/home', {state: {...formData} })

        }
        catch(err){
            if(err.response.status === 401){
                setIsLoading(false);
                alert("Wrong Credentials.");
            }
        }
        
    };

    if(isLoading){
        return(
          <div className="flex flex-col items-center justify-center my-2 rounded-lg py-3 pl-4 mt-16">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="72"
              visible={true}
            />
          </div>
        )
    }

    else {
        return (
        <div>

            <h1 className='font-bold text-2xl mb-8 w-1/2 lg:text-2xl pt-2' > Login to YourFlight </h1>
        
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex my-2 bg-gray-100 rounded-lg py-1 pl-4 mb-3 ">
                    <input id="email" name="email" className="appearance-none bg-transparent text-gray-700 focus:outline-none" type="text" placeholder="email" {...register("email", {
                            required: true
                        })} />


                    <div className="relative ml-auto mr-1">
                        <select name="domain" id="domain" className="text-sm block appearance-none w-full bg-white text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white md:text-md md:min-w-[140px]" {...register("domain", {
                            required: true
                        })}>
                            <option>@flights.io</option>
                            <option>@iiitdm.ac.in</option>
                            <option>@gmail.com</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                        
                    <div className="cut"></div>

                </div>
                {errors.email && errors.email.type === "required" && (
                    <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >email is required.</p>
                )}


                <div className="flex my-2 bg-gray-100 rounded-lg py-3 pl-4 mb-3">
                    <input id="password" name="password" className="appearance-none w-5/6 bg-transparent text-gray-700 focus:outline-none"  type={passwordVisible ? "text" : "password"} placeholder="password" {...register("password", {
                        required: "Password is required.",
                        minLength: {
                            value: 6,
                            message: "Password should be at-least 6 characters."
                        }

                    })} />


                    <div onClick={toggleVisibility} className="ml-auto mr-2 pt-1">
                        <div className="pointer-events-none inset-y-0 right-0 px-2 text-gray-700">

                            {
                                passwordVisible ? ( <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"> </path>
                                                </svg>) :
                                
                                                (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                </svg>)  
                            }
                        
                        </div>
                    </div>


                    <div className="cut"></div>
                
                </div>

                {errors.password && (
                    <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >{errors.password.message}</p>
                )}


                <label></label>
                <button type="text" className="w-full text-white bg-blue-700 p-3 rounded-md my-6"> Login </button>
                
            </form>
            <div className="flex justify-center text-blue-700 font-bold cursor-pointer">
                Forgot your password?
            </div>

        </div>
        )
    }
}

export default Login;


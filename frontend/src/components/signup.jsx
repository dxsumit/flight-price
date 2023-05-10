import {useForm} from "react-hook-form";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner'
import axios from "axios";

const Signup = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const baseURL = "http://localhost:4000";
    const baseURL = "https://flight.ced19i028sumit.repl.co";

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (formData) => {

        setIsLoading(true);
        // console.log(formData)
        let {name, age, email, domain, password} = formData
        email = email+domain;

        try {
            await axios.post(`${baseURL}/api/v1/auth/signup`, {name, age, email, password});
            reset()
            setIsLoading(false);
            navigate('/home', {state: {email}}) 

        }
        catch(err){
            if(err.response.status === 409){
                setIsLoading(false);
                alert("Email already exist.");
            }
            // console.log(err)
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
    
            <h1 className='font-bold text-2xl mb-8 w-5/6 lg:text-2xl pt-2' > Create account with YourFlight </h1>
    
            <form onSubmit={handleSubmit(onSubmit)} >
    
                <div className="flex my-2 bg-gray-100 rounded-lg py-3 pl-4 mb-3">
                    <input id="name" name="name" className="appearance-none w-11/12 bg-transparent text-gray-700 focus:outline-none" placeholder="name" {...register("name", {
                        required: "name is required.",
                        minLength: {
                            value: 3,
                            message: "name should be at-least 3 characters."
                        }
    
                    })} />
    
    
                    <div className="cut"></div>
                
                </div>
    
                {errors.name && (
                    <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >{errors.name.message}</p>
                )}
    
    
                <div className="flex my-2 bg-gray-100 rounded-lg py-3 pl-4 mb-3">
                    <input id="age" name="age" type="number" className="appearance-none w-11/12 bg-transparent text-gray-700 focus:outline-none" placeholder="age" {...register("age", {
                        required: "age is required.",
                        min: {value: 16, message: "age must be at least 16"},
                        max: {value: 150, message: "age must be no more than 150"},
    
                    })} />
    
    
                    <div className="cut"></div>
                
                </div>
    
                {errors.age && (
                    <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >{errors.age.message}</p>
                )}
    
                
    
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
                    <input id="password" name="password" className="appearance-none w-11/12 bg-transparent text-gray-700 focus:outline-none" placeholder="password" {...register("password", {
                        required: "Password is required.",
                        minLength: {
                            value: 6,
                            message: "Password should be at-least 6 characters."
                        }
    
                    })} />
    
    
                    <div className="cut"></div>
                
                </div>
    
                {errors.password && (
                    <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >{errors.password.message}</p>
                )}
    
    
                <label></label>
                <button type="text" className="w-full text-white bg-blue-700 p-3 rounded-md my-6"> Create Account </button>
                
            </form>
        </div>
        )
    }
}

export default Signup;


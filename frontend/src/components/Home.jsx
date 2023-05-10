import { useLocation } from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {useNavigate} from 'react-router-dom'

const Home = () => {

    const location = useLocation()
    const navigate = useNavigate();

    const {
        reset,
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();


    const onSubmit = async (formData) => {
        reset();
        navigate('/result', {state: formData})

    };

    
    return (

        <div className="flex flex-col h-screen w-1/2 mx-auto pt-12">
            
        <h1 className='font-bold text-2xl mb-8 w-1/2 lg:text-2xl pt-2' > hello, <span className="font-bold text-blue-600"> {location.state.email}{location.state.domain} </span> </h1>

        <form onSubmit={handleSubmit(onSubmit)} >

            <div className="flex my-2 bg-gray-100 rounded-lg py-3 pl-4 mb-3">
                <input id="source" name="name" className="appearance-none w-11/12 bg-transparent text-gray-700 focus:outline-none" placeholder="source" {...register("source", {
                    required: "source is required.",
                    minLength: {
                        value: 3,
                        message: "source should be at-least 3 characters."
                    }

                })} />


                <div className="cut"></div>
            
            </div>

            {errors.source && (
                <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >{errors.source.message}</p>
            )}



            <div className="flex my-2 bg-gray-100 rounded-lg py-3 pl-4 mb-3">
                <input id="destination" name="destination" className="appearance-none w-11/12 bg-transparent text-gray-700 focus:outline-none" placeholder="destination" {...register("destination", {
                    required: "destination is required.",
                    minLength: {
                        value: 3,
                        message: "destination should be at-least 3 characters."
                    }

                })} />


                <div className="cut"></div>
            
            </div>

            {errors.destination && (
                <p className="errorMsg" style={{color:'#f22952', fontSize:'13px'}} >{errors.destination.message}</p>
            )}

            <Controller 
                control={control}
                name='date'
                render={({ field }) => (
                <DatePicker
                    placeholderText='Select date'
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                />
                )}
            />

            <label></label>
            <button type="text" className="w-full text-white bg-blue-700 p-3 rounded-md my-6"> Search </button>


        </form>
        </div>

    )
    

}

export default Home;


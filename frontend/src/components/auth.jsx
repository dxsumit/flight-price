import { useState } from "react";

import Login from "./login";
import Signup from "./signup";


const Auth = () => {

    const [loginComponent, setLoginComponent] = useState(true);

    return (
        // loginComponent ? <Login /> : <Signup />



        <div className="flex flex-col h-screen">

            
            <div className="flex justify-center sm:h-full">
                
                {/* <div className="md:w-full lg:w-1/2 mx-2"> */}
                    
                    <div className='flex flex-col mt-24 w-1/3'>


                        <div className="flex w-full justify-between border-t-2 border-blue-500 rounded-md font-medium">
                            <div className={`container px-auto py-2 px-4 cursor-pointer ${loginComponent ? "" : "bg-gray-100"}`} onClick={() => setLoginComponent(true)} >
                                Login
                            </div>

                            <div className={`container px-auto py-2 px-4 cursor-pointer ${loginComponent ? "bg-gray-100" : ""}`} onClick={() => setLoginComponent(false)} >
                                Signup
                            </div>
                        </div>
                    

                    
                        {loginComponent ? <Login /> : <Signup />}
                        

                    </div>
                    
                {/* </div>  */}
                
            </div>
            
        </div>
    )
}

export default Auth;

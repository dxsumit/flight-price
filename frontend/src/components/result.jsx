import {useState, useEffect} from "react";
import { RotatingLines } from 'react-loader-spinner'
import axios from "axios";
import {useLocation, useNavigate} from 'react-router-dom';

const Result = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // const baseURL = "http://localhost:4000";
    const baseURL = "https://flight-api-40qk.onrender.com";
    // const baseURL = "https://flight.ced19i028sumit.repl.co";

    useEffect( () => {

        const getFlights = async () => {
            const dataObject = location.state;
            dataObject['date'] = dataObject['date'].toString().slice(4,15);

            const response = await axios.post(`${baseURL}/api/v1/flight/get`, dataObject);
            if(response.data.status === "successful"){
                setFlights(response.data.msg);
            }
            else{
                alert(response.data.Error);
            }

            setIsLoading(false);
        }
        
        if(!location.state){
            navigate('/');
        }
        
        getFlights();

    }, [])





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
    
            <div className="flex flex-col h-screen w-1/2 mx-auto pt-12">
                <h1 className='font-bold text-xl mb-8 w-10/12 lg:text-2xl pt-2' > These are results for {location.state.date ? `${location.state.date.toString().slice(4,15)}` : "Today"} from {location.state.source} to {location.state.destination} </h1>

                <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                        <thead
                            className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                            <tr>
                            <th scope="col" className=" px-6 py-4">Airline</th>
                            <th scope="col" className=" px-6 py-4">Price</th>
                           
                            </tr>
                        </thead>

                        <tbody>

                            {
                               flights.map( (obj, i) => (

                                <tr className="border-b dark:border-neutral-500" key={obj._id}>
                                    <td className="whitespace-nowrap  px-6 py-4 font-medium">{obj.airline}</td>
                                    <td className="whitespace-nowrap  px-6 py-4">₹{obj.price.toLocaleString("en-US")}</td>
                                </tr>

                               )) 
                            }

                           
                        </tbody>

                        </table>
                        {flights.length === 0 ? "NO result Found": ""}
                    </div>
                    </div>
                </div>
                </div>


            </div>

        )
    }

}

export default Result;


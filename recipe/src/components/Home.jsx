

import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import HeaderOne from "./HeaderOne";
import Blogs from "../pages/AllBlogs";
import HeaderTwo from "./HeaderTwo";

const Home = () => {
  const {auth} = useAuth(); 
// const [data,setData] = useState([])
const [success,setSuccess] = useState(false)

const checkUser = async ()=>{
  const {data} = await axios.get("http://localhost:8000/api/authenticuser")
  if(data.ok){
    setSuccess(true)
  }else{
    setSuccess(false)
  }
}
 useEffect(()=>{
  checkUser();
 },[])

 if(!success) return <Spinner />
  return (
    
    <>
    <div className="home">
    <HeaderOne />
    <Blogs />
    <HeaderTwo />
    </div>
    </>
  )
}

export default Home
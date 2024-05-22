import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Spinner from "../components/Spinner";
import Blog from '../components/Blog'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setLoader } from '../redux/loaderSlice';
function Blogs() {
  const dispatch = useDispatch();
  const {search} = useLocation();
  console.log(search);
    const [blogs,setBlogs] = useState([])
    const [results,setResults] = useState(false)
// const [loading,setLoading] = useState(false)
const getAllBlogs = async()=>{
  dispatch(setLoader(true))
    try {
        const {data} = await axios.get("http://localhost:8000/api/allblogs"+search)
        setBlogs(data?.blogs)
        if(data?.blogs.length===0){
          setResults(true)
        }else{
          setResults(false)
        }
    } catch (error) {
        console.log(error)
    }
    dispatch(setLoader(false))
}
useEffect(()=>{
getAllBlogs()
},[search])


  return (
    <div className='blogs'>
        <div className="container px-4 md:max-w-[900px] mx-auto">
          <h2 className="text-[35px] text-[#222222] font-semibold my-7">Recent Articles</h2>
           <div className="flex flex-col gap-9">
            {!results? blogs && blogs.map((item)=>(
                <>
                <Blog item={item} key={item?._id}/>
                </>
            )) : (
              <div className='text-center pt-6'>
               <h3>No Posts found..</h3>
              </div>
            )}
           </div>
        </div>
    </div>
  )
}

export default Blogs
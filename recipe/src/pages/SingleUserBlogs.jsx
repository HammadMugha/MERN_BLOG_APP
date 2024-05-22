import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Blog from '../components/Blog'
import Banner from '../components/Banner'
function SingleUserBlogs() {
    const {id} = useParams()
    const [blogs,setBlogs] = useState([])
    //get single user blogs Api integration
    const getBlogs = async()=>{
        try {
            const {data} = await axios.get("http://localhost:8000/api/getsingleuserblogs/"+id)
            setBlogs(data?.blogs)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
     getBlogs();
    },[])
  return (
    <>
    {/* <Banner title={"User Blogs"}/> */}
    <div className='container mx-auto my-[50px]'>
      <div className="flex flex-col gap-9">
            {blogs && blogs.map((item)=>(
                <>
                <Blog item={item} key={item?._id}/>
                </>
            ))}
           </div>
    </div>
    </>
  )
}

export default SingleUserBlogs
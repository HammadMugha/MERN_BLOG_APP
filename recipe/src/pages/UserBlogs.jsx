import { useEffect, useState } from "react";
import axios from "axios";
import Blog from '../components/Blog'
import Banner from "../components/Banner";
function UserBlogs() {
 
  const [blog, setBlog] = useState([]);
   //getLoginUser Blogs 
  const getBlog = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/getuserblogs");
      setBlog(data?.blogs);
      console.log(blog)
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
  };

  //initial time ke lye useEffect ko call kraingy
  useEffect(() => {
    getBlog();
  }, []);
  return (
    <div className='blogs min-h-[100vh] mt-10'>
      {/* <Banner title={"User Blogs"}/> */}
        <div className="container mx-auto md:max-w-[900px]">
           <div className="flex flex-col gap-9">
            {blog.length === 0 && <div className="text-center pt-6 text-[30px]"><h4>This user not created any blog..</h4></div>}
            {blog && blog.map((item)=>(
                <>
                <Blog item={item} key={item?._id}/>
                </>
            ))}
           </div>
        </div>
    </div>
  )
}

export default UserBlogs
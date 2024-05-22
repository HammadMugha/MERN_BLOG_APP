
import Blogs from "../components/Blogs"


function AllBlogs() {
// const [blogs,setBlogs] = useState([])
// const [loading,setLoading] = useState(false)
// const getAllBlogs = async()=>{
//     setLoading(true)
//     try {
//         const {data} = await axios.get("http://localhost:8000/api/allblogs")
//         setBlogs(data?.blogs)

//     } catch (error) {
//         console.log(error)
//     }
//     setLoading(false)
// }
// useEffect(()=>{
// getAllBlogs()
// },[])

// if(loading){
//   return <Spinner />
// }
  return (
   <>
    <Blogs />
   </>
  )
}

export default AllBlogs
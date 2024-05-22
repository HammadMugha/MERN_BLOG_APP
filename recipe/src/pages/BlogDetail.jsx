import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { BiTrash, BiEdit } from "react-icons/bi";
import { useDispatch } from 'react-redux'
// import Detail from "../components/Detail.jsx"
import { useAuth } from "../context/AuthContext";
import Comment from "../components/Comment";
import { setLoader } from "../redux/loaderSlice";
function BlogDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  //Get Blog Detail integration
  const getBlog = async () => {
    dispatch(setLoader(true))
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/getsingleblog/" + id
      );
      setBlog(data?.blog);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false))
  };

    //initial time ke lye useEffect ko call kraingy
    useEffect(() => {
      getBlog();
    }, [id]);

  const handleDelete = async () => {
    try {
      const { data } = axios.delete(
        "http://localhost:8000/api/deleteblog/" + id
      );
      if (data?.success) {
        alert("delete blog successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };


      // get Blog-Comments
      const getPostsComments = async () => {
        try {
         const {data} = await axios.get("http://localhost:8000/api/comments/"+id)
         setComments(data?.allComments)
        } catch (error) {
         console.log(error);
        }
       }
       
      //  useEffect(() => {
      //   getPostsComments();
      // }, [id]);


       
  // post comment api
  const handlePostComment = async () => {
    try {
     const {data} = await axios.post("http://localhost:8000/api/comments",{comment,userId: auth?.user?._id,postId: blog?._id})
     if(data?.success===true){
       alert(data?.message)
     }
     getPostsComments();
    } catch (error) {
     console.log(error);
    }
   }

  return (
    <div className="container mx-auto">
      <div className="blog">
        {blog && (
          <div className="center">
            {/* ==========check if loginUser id or blogCreated id match then user edit or delete post=========== */}
            {auth?.user?._id === blog?.author && (
              <div className="btns mt-4 flex gap-2 mb-4">
                {/* {auth.user._id === blog.author._id &&} */}
                <button>
                  <Link
                    className="flex gap-2 items-center"
                    to={`/editpost/${blog?._id}`}
                  >
                    <BiEdit />
                    Edit
                  </Link>
                </button>
                <button
                  className="flex gap-2 items-center"
                  onClick={handleDelete}
                >
                  <BiTrash />
                  Delete
                </button>
              </div>
            )}
            <img src={`http://localhost:8000/${blog?.cover}`} alt="not show!" />
            <span>{blog?.updatedAt}</span>
            <h2 className="text-[40px] my-3">{blog?.title}</h2>
            <p>{blog?.description}</p>
            {/* {auth?.user?._id === blog?.author ? "jsajsha" : ''} */}
            {/* Comment */}
            <h2 className="text-[20px] my-8">Comments:</h2>
            <Comment />
            <div className="flex items-center justify-between mt-4">
              <input type="text" placeholder="Write a comment" className="outline-none border-none px-3"
              onChange={(e) => setComment(e.target.value)} value={comment}
              />
              <button className="text-white py-2 px-5 rounded-md bg-[#000000] text-[10px]" onClick={handlePostComment}>Add comment</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;

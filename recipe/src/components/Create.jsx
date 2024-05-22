import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { setLoader } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";
const Create = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [comment, setComment] = useState("");
    const [file, setFile] = useState("");

      const onSubmit = async (e) => {
        const data = new FormData();
        data.set("title",title)
        data.set("description",description)
        data.set("comment",comment)
        data.set("file",file)
        e.preventDefault();
        try {
          dispatch(setLoader(true))
          await axios.post("http://localhost:8000/api/createblog", data).then((res) => {
            if (res.status === 201) {
              toast.success("Recipe Created successfully");
              console.log(res);
              navigate("/")
            } else {
              toast.error(res.data.message);
            }
            dispatch(setLoader(false))
          });
        } catch (error) {
          console.log(error);
        }
      };
      // const onChange = (e) => {
      //   const { name, value } = e.target;
      //   setUser({
      //     ...user,
      //     [name]: value,
      //   });
      // };
  return (
    <div>
        <>
        <div className="contact">
        <div className="container">
        <h1 className="text-[40px] font-semibold text-center">Create Blog</h1>
            <div className="row">
                <div className="col">
                <form onSubmit={onSubmit}>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Blog Title"
                onChange={(e)=> setTitle(e.target.value)}
              />
              <textarea type="text"
                name="description"
                value={description}
                placeholder="Description"
                onChange={(e)=> setDescription(e.target.value)}></textarea>
              <input
                type="text"
                value={comment}
                name="comment"
                placeholder="Comment"
                onChange={(e)=> setComment(e.target.value)}
              />
              <input
                type="file"
                placeholder="Url"
                className="file"
                onChange={(e)=> setFile(e.target.files[0])}
              />
              <input type="submit" value="Create" className="btn"/>
              <span className="span">Already have an Account?</span>
              <Link to="/login">LOGIN</Link>
            </form>
                </div>
            </div>
        </div>
    </div>
        </>
    </div>
  )
}

export default Create
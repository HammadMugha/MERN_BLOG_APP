import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams,useNavigate } from "react-router-dom";

const Editpost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
    const {id} = useParams();
    axios.defaults.withCredentials = true;


    //yeah function POST ko Edit krnay ke lye ha jis mein useParams ke through id send krhay hain backend mein
    const editpost = async(e)=>{
      e.preventDefault();
      const data = new FormData();
        data.set("title",title)
        data.set("description",description)
        data.set("comment",comment)
        data.set("file",file)
    
      await axios.put(`http://localhost:8000/api/updateblog/${id}`,data).then((res) => {
        if (res.data?.success) {
          console.log(res);
          navigate("/blogs")
        } else {
          console.log("no update request");
        }
      })
    }



    console.log(id);
     //Get Blog Detail integration
  const getBlog = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/getsingleblog/" + id
      );
      setTitle(data?.blog.title);
      setDescription(data?.blog.description);
      setComment(data?.blog.comment);
      setFile(data?.blog?.cover);
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
  };
     useEffect(()=> {
      getBlog()
     },[])

    // const handlechange = (e) => {
    //   const { name, value } = e.target;
    //   setTitle({
    //     ...title,
    //     [name]: value,
    //   });
    // };

  return (
    <div>
        <>
        <div className="contact">
        <div className="container">
        <h1 className="text-[40px] font-semibold text-center">Update Blog</h1>
            <div className="row">
                <div className="col">
                <form onSubmit={editpost}>
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
              <input type="submit" value="Update Blog" className="btn"/>
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

export default Editpost
import axios from "axios";
// import { useEffect, useState } from "react"
// import { Link, useParams } from "react-router-dom";


const Detail = ({item}) => {
  //   const [data,setData] = useState("")
  //  const {id} = useParams();
  //  console.log(id);
  //   useEffect(()=> {
  //       axios.get(`http://localhost:8000/postdetail/${id}`).then((res) => {
  //           console.log(res.data);
  //           setData(res.data);
  //               }).catch((err) => {
  //                   console.log(err);
  //               })
    
  //   },[])


    // const deletePost = async()=>{
    //   alert("asas")
    //   await axios.delete(`http://localhost:8000/deletepost/${id}`).then((res) => {
    //     if (res.status === 200) {
    //       console.log(res);
    //       window.location.href = "/"
    //     } else {
    //       console.log("no update request");
    //     }
    //   })
    // }

  return (
    <div className="center">
       <img src={`http://localhost:8000/api/${item?.cover}`} alt="not show!"/>
       <h2>{item?.title}</h2>
        <p>{item?.description}</p>
        <div className="btns">
          {/* <button><Link to={`/editpost/${item?._id}`}>Edit</Link></button>
          <button onClick={deletePost}>Delete</button> */}
        </div>
    </div>
  )
}

export default Detail
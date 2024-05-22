import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
const Signup = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        file: ""
      });
      
      const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = new FormData();
          data.set('name', user.name);
          data.set('email', user.email);
          data.set('password', user.password);
          data.set('file', user.file);
          dispatch(setLoader(true))
          await axios.post("http://localhost:8000/api/register", data).then((res) => {
            
            if (res.data.success) {
              toast.success("user register successfully");
              console.log(res);
              navigate("/login");
            } else {
              toast.error(res.data.message);
            }
            dispatch(setLoader(false))
          });
        } catch (error) {
          console.log(error);
        }
      };
      const onChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
      };
  return (
    <div>
        <>
        <div className="contact">
        <div className="container">
            <div className="heading">
                <h1 className="text-[40px] font-semibold]">Sign Up</h1>
            </div>
            <div className="row">
                <div className="col">
                <form onSubmit={onSubmit}>
              <input
                type="text"
                name="name"
                placeholder="First Name"
                onChange={onChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={onChange}
              />
              <input
                type="text"
                name="password"
                placeholder="password"
                onChange={onChange}
              />
              <input
                type="file"
                name="file"
                onChange={(e)=> setUser({file:e.target.files[0]})}
              />
              <input type="submit" value="submit" className="btn"/>
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

export default Signup
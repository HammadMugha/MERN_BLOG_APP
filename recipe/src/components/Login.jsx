import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { setLoader } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";
function Login() {
  const dispatch = useDispatch();
  const [auth,setAuth] = useAuth();  
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
      axios.defaults.withCredentials = true;

      const onSubmit = async (e) => {
        e.preventDefault();
        try {
          dispatch(setLoader(true))
          await axios.post("http://localhost:8000/api/login", user).then((res) => {
            
            if (res.status === 201) {
              setAuth({...auth,user:res.data.user,token:res.data.token})
        localStorage.setItem("auth",JSON.stringify(res.data))
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
            <h1 className="text-[40px] font-semibold]">Login</h1>
            </div>
            <div className="row">
                <div className="col">
                <form onSubmit={onSubmit}>
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
              <input type="submit" value="submit" className="btn"/>
              <span className="span">Already have an Account?</span>
              <Link to="/signup">Signup</Link>
            </form>
                </div>
            </div>
        </div>
    </div>
        </>
    </div>
  )
}

export default Login
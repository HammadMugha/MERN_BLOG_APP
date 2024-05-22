// import { useState } from 'react'
import { Toaster } from "react-hot-toast";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useSelector } from 'react-redux'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create from "./components/Create";
import './App.css'
import axios from "axios";
// import Detail from "./components/Detail";
import Editpost from "./components/Editpost";
import AuthProvider from "./context/AuthContext.jsx";
import AllBlogs from "./pages/AllBlogs.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import Users from "./pages/Users.jsx";
import UserBlogs from "./pages/UserBlogs.jsx";
import Spinner from "./components/Spinner.jsx";
import Footer from "./components/Footer.jsx";
import SingleUserBlogs from "./pages/SingleUserBlogs.jsx";
function App() {
  // const [user,setUser] = useState([])
  axios.defaults.withCredentials = true;
  // useEffect(()=>{
  //   axios.get("http://localhost:8000/").then((res)=>{
  //     // console.log(res);
  //     setUser(res.data.user)
  //   }).catch((err)=>{
  //     console.log(err);
  //   })
  // },[])
  const {loading} = useSelector(state=> state.loader)
  console.log(loading)

  return (
      <>
      {loading && <Spinner />}
      <AuthProvider>
      <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" toastOptions={{duration:5000}}/>
      <Routes>
      <Route exact path="/" element={<Home />}>
        </Route>
        <Route exact path="/signup" element={<Signup />}>
        </Route>
        <Route exact path="/create" element={<Create />}>
        </Route>
        <Route exact path="/login" element={<Login />}>
        </Route>
        <Route exact path="/blogs" element={<AllBlogs />}>
        </Route>
        <Route exact path="/users" element={<Users />}>
        </Route>
        <Route exact path="/user-blogs" element={<UserBlogs />}>
        </Route>
        <Route exact path="/blog/:id" element={<BlogDetail />}>
        </Route>
        <Route exact path="/editpost/:id" element={<Editpost />}>
        </Route>
        <Route exact path="/user/:id" element={<SingleUserBlogs />}>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
      </AuthProvider>
      </>
   
  )
}

export default App

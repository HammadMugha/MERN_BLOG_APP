import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
export default function Users() {
  const [users, setUsers] = useState([]);
  //calling api integration
  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/getallusers");
      if (data.success === true) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //initial call
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className="container mx-auto min-h-[100vh]">
        <h2 className="text-center text-[45px] text-[#161F38] font-semibold mb-7 mt-5">
          Authors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-[50px]">
          {users.map((user) => (
            <>
              <Link to={`/user/${user._id}`}>
              <div className="col rounded-2xl shadow-lg bg-white p-[30px]">
                <span>{user?.name}</span>
              </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

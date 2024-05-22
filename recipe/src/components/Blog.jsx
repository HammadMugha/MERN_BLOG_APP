import { Link } from "react-router-dom";

function Blog({ item }) {
  // const read = item.description.length> 30? item.description+"Readmore.." : ""
  return (
    <Link to={`/blog/${item._id}`}>
      <div className="col bg-white rounded-[20px] shadow-md p-5 cursor-pointer grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-2 overflow-hidden">
          <img
            src={`http://localhost:8000/${item.cover}`}
            alt=""
            className="rounded-[10px] h-[250px] hover:scale-95 w-full object-cover transition-transform"
          />
        </div>
        <div className="md:col-span-3">
          <h4 className="mt-4 text-[15px]">
            <span className="text-[#9b9ea1]">By</span> Andrew Hoffman
          </h4>
          <h2 className="text-[22px] font-semibold my-2">{item?.title}</h2>
          <p className="text-[14px] text-[#7a7a7a]">
            {item?.description.slice(0, 129)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Blog;

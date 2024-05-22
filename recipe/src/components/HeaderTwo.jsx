import React from "react";

function HeaderTwo() {
  return (
    <div className="headerTwo">
      <div className="container mx-auto">
        <div className="all">
          <h2 className="text-white text-[40px] font-semibold mb-3">Subscribe For Newsletter</h2>
          <h4 className="text-white text-[20px] font-light mb-3">27+ peoples subscribe today</h4>
          <div className="flex items-center justify-center gap-3 mt-7 md:flex-row flex-col">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-transparent text-white py-3 px-2 border-white border-2 rounded-xl outline-none w-full md:w-[400px]"
            />
            <button className="text-white py-3 px-5 rounded-md bg-[#250C83]">
              Subscribed Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderTwo;

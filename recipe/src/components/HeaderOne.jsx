import React from 'react'
import { FaFacebookF,FaTwitter,FaInstagram,FaGithub } from "react-icons/fa";
function HeaderOne() {
  return (
    <div className='headerOne'>
        <div className="container px-4 mx-auto md:max-w-[1150px]">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-[40px] items-center">
                <div className="md:col-span-2">
                    <img src="../../public/images/banner.webp" alt="!none" className='w-full rounded-[12px] object-cover h-full'/>
                </div>
                <div className="md:col-span-3">
                  <h5 className='text-[14px] text-[#222222] font-medium'>Business, Travel — <span className='text-[#999999]'>July 2, 2020</span></h5>
                  <h2 className='text-[40px] leading-[40px] text-[#222222] font-semibold my-[30px]'>Your most unhappy <br /> customers are your greatest source of learning.</h2>
                  <h4 className='text-[14px] text-[#999999]'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</h4>
                  <div className="flex items-center gap-5 mt-5">
                    <span>Follow:</span>
                    <div className="flex gap-4">
                       <FaTwitter />
                       <FaFacebookF />
                       <FaInstagram />
                       <FaGithub />
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeaderOne
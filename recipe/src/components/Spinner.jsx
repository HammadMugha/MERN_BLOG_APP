import React from 'react'

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-[100vh] w-full fixed inset-0 z-10 bg-white">
        <div role="status">
        <img src="../../public/images/icons8-loading.gif" alt="" className='h-5 w-5' height={100}/>
    <span className="sr-only">Loading...</span>
</div>
    </div>
  )
}

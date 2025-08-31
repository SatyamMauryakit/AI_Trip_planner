import React from 'react'
import Chatbox from './_components/Chatbox'

const page = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-10 '>
       <div><Chatbox/></div>
       <div>map and trip</div>
      
    </div>
  )
}

export default page

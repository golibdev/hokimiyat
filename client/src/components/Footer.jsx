import React from 'react'

const Footer = () => {
   return (
      <div className='d-flex align-items-center' style={{ position: 'absolute', right: '50px', bottom: '0' }}>
         <img width={100} src="/assets/it-park.png" alt="it-park" />
         <span className='fw-bold'>Powered by IT Park</span>
      </div>
   )
}

export default Footer
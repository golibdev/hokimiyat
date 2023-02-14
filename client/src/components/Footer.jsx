import React from 'react'

const Footer = () => {
   return (
      <div className='d-flex align-items-center' style={{ position: 'absolute', right: '50px', bottom: '0' }}>
         <span className='fw-bold'>Powered by</span>
         <img width={100} src="/assets/it-park.png" alt="it-park" />
      </div>
   )
}

export default Footer
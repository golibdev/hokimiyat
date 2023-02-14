import React from 'react'

const Loader = () => {
   return (
      <div className="spinner-border" role="status" style={{ width: '150px', height: '150px' }}>
         <span className="visually-hidden">Loading...</span>
      </div>
   )
}

export default Loader
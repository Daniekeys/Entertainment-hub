import React from 'react'
import "./Header.css"
const Header = () => {
 return (
  <div className="header" onClick={() => window.scrollTo(0,0)}>
  <span role="img">

   🎥 
  </span>
   
   Entertainment Hub
   <span role="img" >
    📷
    </span>  
  </div>
 )
}

export default Header

import React from 'react'
import { useLocation,Link,useNavigate } from "react-router-dom";
function first() {
    const navigate = useNavigate();
    const signin = () => {
        navigate("/signin", { state: {name: name , userData:userData} });
      }
      //ขอสวยๆ
  return (
    <div>
      <button onClick={signin}></button>
    </div>
  )
}

export default first

import React from 'react'
import { useLocation,Link,useNavigate } from "react-router-dom";
function first() {
    const navigate = useNavigate();
    const signin = () => {
        navigate("/signin");
      }
      //ขอสวยๆ
  return (
    <div>
      <Link to="/signin">signin</Link>
    </div>
  )
}

export default first

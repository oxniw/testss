import React, { useRef , useEffect, useState  } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./login.css";
import gsap, {TweenMax,Power3} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
gsap.registerPlugin(ScrollTrigger);
function login() {
    const [username,setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const ip1 = "https://testss-voa9.onrender.com/api/v2"
    const handleSubmit = async (event) => {
        event.preventDefault();//////////////////////////////////////////////////////////////////////////
        const send =  await axios.post(ip1, {
          username: username,
          password: password,
        });
        if (send.data.message == "ok"){
          alert("ok")
          
          navigate("/home", { state: { userData: send.data.data , name:send.data.name }} );
        } else {
          alert(send.data.why);
        }
    }
    const logind = useRef(null);
    useEffect(() => {
        gsap.to(logind.current, {
          ease: "elastic.out(1, 0.3)",
          opacity: 1,
          y: "200%",
          duration: 5
            });
    }, []);
  return (
    <div>
      
        <div className="loginc"ref={logind} style={{left:"35%",
          position:"absolute"
          }}>
            <h1>Login</h1>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setusername(e.target.value)} 
              placeholder="Enter username..."
            />
            <input 
              type="text" 
              value={password} 
              onChange={(e) => setpassword(e.target.value)} 
              placeholder="Enter password..."
            />
            <button onClick={handleSubmit}>sign in </button>
            <Link to="/signin">signin</Link>
        
      </div>
    </div>
  )
}

export default login

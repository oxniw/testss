import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation,Link,useNavigate, data } from "react-router-dom";
function leaderboard() {
    const ip1 = "http://192.168.1.2:8080/api/v5"
    const [data,Getdata] = useState([]);
    useEffect(() => {
        const leader = async () => {
            const send =  await axios.post(ip1);
            Getdata(send.data.leader);
          }
          leader();
    },[])
  return (
    <div>
      {data.map((chat, i) => (
          <div key={i} className="namedd">
            <div className="message">rank:{chat[0]}</div>
            <div className="message">name :{chat[1]}</div>
            <div className="message">win :{chat[2]}</div>
          </div>
        ))}
    </div>
  )
}

export default leaderboard

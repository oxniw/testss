import React, { useEffect, useState } from "react";
import { useLocation,Link,useNavigate } from "react-router-dom";
import axios from "axios";
function Home() {
  const ip3 = "https://testss-voa9.onrender.com/api/v3"
  const location = useLocation();
  const [userData,GetuserData] = useState(location.state?.userData || { sources: {}});
  const [name,getname] = useState(location.state?.name || "Guest");
  const navigate = useNavigate();
  const [findname1,setText1] = useState("");
  const [findname2,setText2] = useState("");
  const handleleaderboard = () => {
    navigate("/leaderboard");
  }
  const handleplay = () => {
    navigate("/game", { state: {name: name , userData: userData} });
  }
  useEffect(() => {
    const handleSubmit = async () => {
      const send =  await axios.post(ip3, { // axios ยิง post ไปที่ ip3 โดยส่งข้อมูล {username: name}
        username: name,
      });
      if (send.data.message == "ok"){
        GetuserData(send.data.data);
      }
    }
    handleSubmit();
  },[])

  return (
    <div>
      <h1>Welcome to Home</h1>
      <h2>Username</h2>
      <p>{name}</p>
      <h2>Sources</h2>
      <p>Win: {userData.sources?.win ?? 0}</p>
      <p>Winsteak: {userData.sources?.winstreak ?? 0}</p>
      <button onClick={handleplay}>game</button>
      <button onClick={handleleaderboard}>leaderboard</button>
      <button onClick={() => {navigate("/login")}}>log out</button>
      <div className="leaderboard">

      </div>
    </div>
  );
}

export default Home;

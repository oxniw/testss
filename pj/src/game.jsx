import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation,Link,useNavigate } from "react-router-dom";
import "./game.css"; // Import external CSS file

const words = [
  ["Active transport", "ลำเลียงสารเข้าออกเซลล์"],
  ["Cleavage furrow", "การคอดกิ่วเซลล์"],
  ["Food Vacuole", "ออแกเนลล์เก็บอาหาร"],
  ["Fermentation", "กระบวนการสร้างแอลกอฮอล์"],
  ["Kinetochore", "โปรตีนที่เซนโทรเมียร์"],
  ["Mitochondria", "ออแกเนลล์สร้างพลังงาน"],
  ["Phosphorylation", "กระบวนการสร้าง ATP"],
  ["Tonicity", "สภาพตึงตัว"],
  ["Replication fork", "จุดแยกการจำลองตัว"],
  ["Dihybrid cross", "การผสมสองลักษณะ"],
  ["Vector", "ดีเอ็นเอพาหะ"],
  ["Complete flower", "ดอกสมบูรณ์"],
  ["Aerating root", "รากหายใจ"],
  ["Cladophyll", "ลำต้นคล้ายใบ"],
  ["Leaf tendril", "ใบมือเกาะ"],
  ["Tendril stem", "ลำต้นมือเกาะ"],
  ["Suberin", "สารที่มีคุณสมบัติกันน้ำ"],
  ["Thorny root", "รากหนาม"],
  ["Wood", "เนื้อไม้"],
  ["Vein", "เส้นใบ"]
];

const Game = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const location = useLocation();
  const [name,getname] = useState(location.state?.name || "Guest");
  const [userData,GetuserData] = useState(location.state?.userData || { sources: {}});
  const ip1 = "http://192.168.1.2:8080/api/v4"
  useEffect(() => {
    if (timeLeft <= 0) {
      endGame();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const nextQuestion = () => {
    setTimeLeft(15);
    setIsGameOver(false);

    let [word, correctDef] = words[Math.floor(Math.random() * words.length)];
    let shownDef =
      Math.random() > 0.5 ? correctDef : words[Math.floor(Math.random() * words.length)][1];

    setCurrentQuestion({ word, shownDef, answer: shownDef === correctDef });
  };

  const checkAnswer = (userAnswer) => {
    if (userAnswer === currentQuestion.answer) {
      setScore(score + 1);
      nextQuestion();
    } else {
      endGame();
    }
  };

  const endGame = () => {
    alert(`แพ้ละอีโหง้5555 คะแนนรวม: ${score}`);
    setIsGameOver(true);
    restartGame();
  };

  const restartGame = () => {
    setScore(0);
    nextQuestion();
    const senddata = async (event) => {
        
        const send =  await axios.post(ip1, {
          username: name,
          score:score,
        });
    }
    senddata();
  };
  const home = () => {
    navigate("/home", { state: {name: name , userData:userData} });
  }
  useEffect(() => {
    nextQuestion();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <button onClick={home}>home</button>
        <h1 className="title">ทายศัพท์ไบโอ</h1>
        <h2 className="word">{currentQuestion.word || "..."}</h2>
        <p className="definition">{currentQuestion.shownDef || "..."}</p>
        <p className="timer">⏳ เวลาที่เหลือ: <b>{timeLeft}</b> วินาที</p>
        <p className="score">🏆 คะแนน: <b>{score}</b></p>
        <div className="buttons">
          <button onClick={() => checkAnswer(true)} className="correct-btn">✅ ถูก</button>
          <button onClick={() => checkAnswer(false)} className="wrong-btn">❌ ผิด</button>
          {isGameOver && (
            <button onClick={restartGame} className="restart-btn">🔄 เริ่มใหม่</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;

import React, { useState, useEffect, useCallback } from "react";
import { FaTimes, FaPlay, FaPause, FaUndo, FaCog } from "react-icons/fa";
import Confetti from "react-confetti";

const MeditationActivity = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState("вдох");
  const [circleSize, setCircleSize] = useState(50);
  const [showSettings, setShowSettings] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [totalDiamonds, setTotalDiamonds] = useState(0);

  useEffect(() => {
    // Load total diamonds from localStorage when component mounts
    const storedDiamonds = localStorage.getItem("totalDiamonds");
    if (storedDiamonds) {
      setTotalDiamonds(parseInt(storedDiamonds, 10));
    }

    // Load ongoing meditation state if exists
    const ongoingMeditation = localStorage.getItem("ongoingMeditation");
    if (ongoingMeditation) {
      const state = JSON.parse(ongoingMeditation);
      setTimeLeft(state.timeLeft);
      setIsActive(false); // Always load paused, user must click play to resume
      setBreathPhase(state.breathPhase);
      setCircleSize(state.circleSize);
      setInhaleTime(state.inhaleTime);
      setExhaleTime(state.exhaleTime);
    }
  }, []);

  const breathCycle = useCallback(() => {
    if (breathPhase === "вдох") {
      setCircleSize((size) => Math.min(size + 100 / (inhaleTime * 10), 100));
    } else {
      setCircleSize((size) => Math.max(size - 100 / (exhaleTime * 10), 50));
    }
  }, [breathPhase, inhaleTime, exhaleTime]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 0.1);
        breathCycle();
      }, 100);
    } else if (timeLeft <= 0) {
      setIsActive(false);
      setTimeLeft(0);
      setShowConfetti(true);
      setShowReward(true);

      // Add 15 diamonds and update localStorage
      const newTotalDiamonds = totalDiamonds + 15;
      setTotalDiamonds(newTotalDiamonds);
      localStorage.setItem("totalDiamonds", newTotalDiamonds.toString());

      // Clear ongoing meditation when completed
      localStorage.removeItem("ongoingMeditation");

      setTimeout(() => {
        setShowConfetti(false);
        setShowReward(false);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, breathCycle, totalDiamonds]);

  // Save meditation state to localStorage whenever it changes
  useEffect(() => {
    if (timeLeft > 0 && timeLeft < 30) {
      const state = {
        timeLeft,
        isActive,
        breathPhase,
        circleSize,
        inhaleTime,
        exhaleTime,
      };
      localStorage.setItem("ongoingMeditation", JSON.stringify(state));
    }
  }, [timeLeft, isActive, breathPhase, circleSize, inhaleTime, exhaleTime]);

  // Auto-pause when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isActive && timeLeft > 0) {
        const state = {
          timeLeft,
          isActive: false, // Pause the timer
          breathPhase,
          circleSize,
          inhaleTime,
          exhaleTime,
        };
        localStorage.setItem("ongoingMeditation", JSON.stringify(state));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isActive, timeLeft, breathPhase, circleSize, inhaleTime, exhaleTime]);

  useEffect(() => {
    let breathInterval = null;
    if (isActive) {
      breathInterval = setInterval(() => {
        setBreathPhase((phase) => (phase === "вдох" ? "выдох" : "вдох"));
      }, (breathPhase === "вдох" ? inhaleTime : exhaleTime) * 1000);
    }
    return () => clearInterval(breathInterval);
  }, [isActive, breathPhase, inhaleTime, exhaleTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(30);
    setIsActive(false);
    setBreathPhase("вдох");
    setCircleSize(50);
    localStorage.removeItem("ongoingMeditation"); // Clear saved state on reset
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {showConfetti && <Confetti />}
      <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Медитация</h2>
          <div className="flex items-center">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-600 hover:text-gray-800 transition-colors mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2"
            >
              <FaCog size={28} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2"
            >
              <FaTimes size={28} />
            </button>
          </div>
        </div>
        {showSettings ? (
          <div className="mb-8 bg-gray-100 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Настройки</h3>
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="inhaleTime" className="text-lg mr-2">
                Время вдоха (с):
              </label>
              <input
                type="number"
                id="inhaleTime"
                value={inhaleTime}
                onChange={(e) => setInhaleTime(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 w-20 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="10"
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="exhaleTime" className="text-lg mr-2">
                Время выдоха (с):
              </label>
              <input
                type="number"
                id="exhaleTime"
                value={exhaleTime}
                onChange={(e) => setExhaleTime(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 w-20 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="10"
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            {showReward ? (
              <div className="text-2xl font-bold text-green-600 mb-6">
                Поздравляем! Вы заработали 15 алмазов! 💎
              </div>
            ) : (
              <>
                <div className="text-7xl font-bold mb-10 text-gray-700">
                  {formatTime(timeLeft)}
                </div>
                <div className="relative w-64 h-64 mx-auto mb-10">
                  <div
                    className="absolute inset-0 bg-blue-300 rounded-full transition-all duration-100 ease-linear shadow-lg"
                    style={{
                      transform: `scale(${circleSize / 100})`,
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                    {breathPhase === "вдох" ? "Вдох" : "Выдох"}
                  </div>
                </div>
                <div className="flex justify-center space-x-6 mb-10">
                  <button
                    className={`p-5 rounded-full ${
                      isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    onClick={toggleTimer}
                  >
                    {isActive ? <FaPause size={28} /> : <FaPlay size={28} />}
                  </button>
                  <button
                    className="p-5 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={resetTimer}
                  >
                    <FaUndo size={28} />
                  </button>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  Следуйте ритму круга. Вдыхайте, когда он расширяется,
                  выдыхайте, когда он сжимается.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                  ></div>
                </div>
              </>
            )}
            {showReward && (
              <div className="text-xl text-gray-700">
                Всего алмазов: {totalDiamonds}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationActivity;

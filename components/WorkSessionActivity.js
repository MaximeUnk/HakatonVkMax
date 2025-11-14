import React, { useState, useEffect } from "react";
import { FaTimes, FaPlay, FaPause, FaUndo, FaBriefcase } from "react-icons/fa";
import Confetti from "react-confetti";

const WorkSessionActivity = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour work session
  const [isActive, setIsActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const workSuggestions = [
    "Уберите все отвлекающие факторы",
    "Сосредоточьтесь на одной задаче",
    "Отключите уведомления на телефоне",
    "Держите воду рядом с собой",
    "Делайте короткие заметки о прогрессе",
  ];

  // Load ongoing work session state if exists
  useEffect(() => {
    const ongoingWorkSession = localStorage.getItem("ongoingWorkSession");
    if (ongoingWorkSession) {
      const state = JSON.parse(ongoingWorkSession);
      setTimeLeft(state.timeLeft);
      setIsActive(false); // Always load paused, user must click play to resume
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsActive(false);
      setTimeLeft(0);
      setShowConfetti(true);
      setShowReward(true);

      // Clear ongoing work session when completed
      localStorage.removeItem("ongoingWorkSession");

      setTimeout(() => {
        setShowConfetti(false);
        setShowReward(false);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Save work session state to localStorage whenever it changes
  useEffect(() => {
    if (timeLeft > 0 && timeLeft < 3600) {
      const state = {
        timeLeft,
        isActive,
      };
      localStorage.setItem("ongoingWorkSession", JSON.stringify(state));
    }
  }, [timeLeft, isActive]);

  // Auto-pause when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isActive && timeLeft > 0) {
        const state = {
          timeLeft,
          isActive: false, // Pause the timer
        };
        localStorage.setItem("ongoingWorkSession", JSON.stringify(state));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(3600);
    setIsActive(false);
    localStorage.removeItem("ongoingWorkSession"); // Clear saved state on reset
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      {showConfetti && <Confetti />}
      <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Рабочая сессия</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2"
          >
            <FaTimes size={28} />
          </button>
        </div>
        <div className="text-center">
          {showReward ? (
            <div className="text-2xl font-bold text-green-600 mb-6">
              Отлично! Вы заработали 10 алмазов за рабочую сессию! 💎
            </div>
          ) : (
            <>
              <div className="text-7xl font-bold mb-10 text-gray-700">
                {formatTime(timeLeft)}
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
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Советы для продуктивности:
                </h3>
                <ul className="text-left">
                  {workSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start mb-2">
                      <FaBriefcase className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${(timeLeft / 3600) * 100}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkSessionActivity;

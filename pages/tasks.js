import React, { useState, useEffect, useCallback } from "react";
import { tasks } from "../components/tasks";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTrophy,
  FaFire,
} from "react-icons/fa";
import confetti from "canvas-confetti";

const Tasks = () => {
  const [apiData, setApiData] = useState({
    relaxationIndex: 0,
    concentrationIndex: 0,
    alphaGravity: 0,
    cognitiveScore: 0,
    gamingStress: 0,
    gamingFocus: 0,
    gamingChill: 0,
    fatigueScore: 0,
    alphaRhythm: 0,
    betaRhythm: 0,
    thetaRhythm: 0,
  });
  const [taskProgress, setTaskProgress] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Simulate API data fetch with more dynamic values
    const fetchData = () => {
      setApiData({
        relaxationIndex: Math.sin(Date.now() / 1000) * 50 + 50,
        concentrationIndex: Math.cos(Date.now() / 1000) * 50 + 50,
        alphaGravity: Math.abs(Math.sin(Date.now() / 500)),
        cognitiveScore: Math.tan(Date.now() / 1500) * 25 + 75,
        gamingStress: Math.abs(Math.sin(Date.now() / 2000)) * 100,
        gamingFocus: Math.abs(Math.cos(Date.now() / 1800)) * 100,
        gamingChill: Math.abs(Math.sin(Date.now() / 2200)) * 100,
        fatigueScore: Math.abs(Math.cos(Date.now() / 2500)) * 100,
        alphaRhythm: Math.abs(Math.sin(Date.now() / 1200)),
        betaRhythm: Math.abs(Math.cos(Date.now() / 1400)),
        thetaRhythm: Math.abs(Math.sin(Date.now() / 1600)),
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []); // Remove checkAchievements from the dependency array

  const checkTasks = useCallback(() => {
    const newProgress = { ...taskProgress };
    let pointsGained = 0;
    let tasksCompleted = 0;
    tasks.forEach((task) => {
      if (!newProgress[task.id]?.completed) {
        newProgress[task.id] = task.checkCompletion(
          apiData,
          newProgress[task.id] || {}
        );
        if (
          newProgress[task.id].completed &&
          !taskProgress[task.id]?.completed
        ) {
          pointsGained += task.points;
          tasksCompleted++;
          showNotification(
            `🎉 Task Completed: ${task.name}`,
            `🏆 Points Earned: ${task.points}`
          );
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    });
    setTaskProgress(newProgress);
    if (pointsGained > 0) {
      setTotalPoints((prevPoints) => prevPoints + pointsGained);
      setStreak((prevStreak) => prevStreak + tasksCompleted);
    }
  }, [apiData, taskProgress, setTaskProgress, setTotalPoints, setStreak]);

  useEffect(() => {
    checkTasks();
  }, [checkTasks]);

  const showNotification = (title, message) => {
    // TODO: Implement a custom notification component
    console.log(title, message);
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 min-h-screen text-white p-8">
      <h1 className="text-6xl font-bold mb-6 text-center text-yellow-400 animate-pulse">
        🧠 Brain Training Quests 🧠
      </h1>
      <div className="flex justify-center items-center mb-10 space-x-8">
        <div className="text-3xl font-bold text-center text-green-400">
          <FaTrophy className="inline-block mr-2" />
          Total Points: <span className="text-4xl">{totalPoints}</span>
        </div>
        <div className="text-3xl font-bold text-center text-orange-400">
          <FaFire className="inline-block mr-2" />
          Streak: <span className="text-4xl">{streak}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200 border-2 border-yellow-400"
          >
            <h2 className="text-2xl font-bold mb-3 text-yellow-400">
              {task.name}
            </h2>
            <p className="text-gray-300 mb-3">{task.description}</p>
            <p className="text-blue-300 mb-4 font-semibold">
              🏆 Points: {task.points}
            </p>
            <div className="mt-4">
              {taskProgress[task.id]?.completed ? (
                <div className="flex items-center text-green-400">
                  <FaCheckCircle className="mr-2" />
                  <span className="font-bold">Quest Completed!</span>
                </div>
              ) : task.duration ? (
                <div className="flex items-center">
                  <FaHourglassHalf className="mr-2 text-yellow-400 animate-pulse" />
                  <span>
                    Progress:{" "}
                    <span className="font-bold">
                      {(
                        ((taskProgress[task.id]?.startTime
                          ? Date.now() - taskProgress[task.id].startTime
                          : 0) /
                          task.duration) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </span>
                </div>
              ) : (
                <span className="text-blue-400 animate-bounce">
                  Quest Active!
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;

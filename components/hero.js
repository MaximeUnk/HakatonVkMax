import React, { useState, useEffect } from "react";
import { FaFire, FaPlus, FaTrash } from "react-icons/fa";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";
import MeditationActivity from "./MeditationActivity";
import TakeBreakActivity from "./TakeBreakActivity";
import BottomBar from "./BottomBar";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const WorkGamificationApp = () => {
  const [showMeditation, setShowMeditation] = useState(false);
  const [showTakeBreak, setShowTakeBreak] = useState(false);
  const [totalDiamonds, setTotalDiamonds] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [activityCounts, setActivityCounts] = useState({
    meditation: 0,
    break: 0,
    goals: 0,
    workSession: 0,
  });
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAllTasksCompleted, setShowAllTasksCompleted] = useState(false);

  useEffect(() => {
    // Загрузка общего количества алмазов и ежедневной серии из localStorage при монтировании компонента
    const storedDiamonds = localStorage.getItem("totalDiamonds");
    const storedStreak = localStorage.getItem("dailyStreak");
    const lastLoginDate = localStorage.getItem("lastLoginDate");
    const storedTasks = localStorage.getItem("dailyTasks");
    const storedActivityCounts = localStorage.getItem("activityCounts");
    const storedCompletedTasksCount = localStorage.getItem(
      "completedTasksCount"
    );
    const today = new Date().toDateString();

    if (storedDiamonds) {
      setTotalDiamonds(parseInt(storedDiamonds, 10));
    }
    if (storedStreak) {
      if (lastLoginDate === today) {
        setDailyStreak(parseInt(storedStreak, 10));
      } else if (
        lastLoginDate === new Date(Date.now() - 86400000).toDateString()
      ) {
        // Если последний вход был вчера, увеличиваем серию
        const newStreak = parseInt(storedStreak, 10) + 1;
        setDailyStreak(newStreak);
        localStorage.setItem("dailyStreak", newStreak.toString());
        localStorage.setItem("lastLoginDate", today);
      } else {
        // Если серия прервалась, сбрасываем на 1
        setDailyStreak(1);
        localStorage.setItem("dailyStreak", "1");
        localStorage.setItem("lastLoginDate", today);
      }
    } else {
      // Если серии не существует, инициализируем её
      localStorage.setItem("dailyStreak", "1");
      localStorage.setItem("lastLoginDate", today);
      setDailyStreak(1);
    }
    if (storedTasks) {
      setDailyTasks(JSON.parse(storedTasks));
    }
    if (storedActivityCounts) {
      setActivityCounts(JSON.parse(storedActivityCounts));
    }
    if (storedCompletedTasksCount) {
      setCompletedTasksCount(parseInt(storedCompletedTasksCount, 10));
    }

    // Check for ongoing activities and restore them
    const ongoingMeditation = localStorage.getItem("ongoingMeditation");
    const ongoingBreak = localStorage.getItem("ongoingBreak");

    if (ongoingMeditation) {
      setShowMeditation(true);
    } else if (ongoingBreak) {
      setShowTakeBreak(true);
    }
  }, []);

  const handleActivityClick = (activityName) => {
    if (activityName === "Медитировать") {
      setShowMeditation(true);
      updateActivityCount("meditation");
    } else if (activityName === "Сделать перерыв") {
      setShowTakeBreak(true);
      updateActivityCount("break");
    } else if (activityName === "Поставить цели") {
      updateActivityCount("goals");
      // Implement goal setting functionality
    } else if (activityName === "Начать рабочую сессию") {
      updateActivityCount("workSession");
      // Implement work session functionality
    }
  };

  const updateActivityCount = (activityType) => {
    setActivityCounts((prevCounts) => {
      const newCounts = {
        ...prevCounts,
        [activityType]: prevCounts[activityType] + 1,
      };
      localStorage.setItem("activityCounts", JSON.stringify(newCounts));
      return newCounts;
    });
  };

  const handleMeditationClose = () => {
    setShowMeditation(false);
    // Обновление общего количества алмазов из localStorage
    const updatedDiamonds = localStorage.getItem("totalDiamonds");
    if (updatedDiamonds) {
      setTotalDiamonds(parseInt(updatedDiamonds, 10));
    }
    // Не обновляем ежедневную серию здесь, так как она должна обновляться только при новом входе после 24 часов
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...dailyTasks, { text: newTask, completed: false }];
      setDailyTasks(updatedTasks);
      localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = dailyTasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setDailyTasks(updatedTasks);
    localStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));

    const newCompletedTasksCount = updatedTasks.filter(
      (task) => task.completed
    ).length;
    setCompletedTasksCount(newCompletedTasksCount);
    localStorage.setItem(
      "completedTasksCount",
      newCompletedTasksCount.toString()
    );

    if (
      newCompletedTasksCount === updatedTasks.length &&
      updatedTasks.length > 0
    ) {
      setShowConfetti(true);
      setShowAllTasksCompleted(true);
      setTimeout(() => setShowConfetti(false), 5000);
      setTimeout(() => setShowAllTasksCompleted(false), 5000);
    }
  };

  const handleClearTasks = () => {
    setDailyTasks([]);
    setCompletedTasksCount(0);
    localStorage.setItem("dailyTasks", JSON.stringify([]));
    localStorage.setItem("completedTasksCount", "0");
    setShowConfetti(false);
    setShowAllTasksCompleted(false);
  };

  const calculateProgress = () => {
    if (dailyTasks.length === 0) return 0;
    return Math.round((completedTasksCount / dailyTasks.length) * 100);
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen p-6 flex flex-col">
      {showConfetti && <Confetti />}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <UserCircle2
            size={64}
            strokeWidth={1.5}
            className="text-gray-400 mr-3"
          />
          <div>
            <p className="text-gray-500 text-lg">С возвращением,</p>
            <h1 className="text-xl font-bold">Test User</h1>
          </div>
        </div>

        <div className="bg-yellow-400 text-white px-4 py-2 rounded-full flex items-center text-xl">
          <span className="mr-2">💎</span>
          <span>{totalDiamonds}</span>
        </div>
      </header>

      <div className="bg-green-400 rounded-lg p-6 mb-8 flex-grow">
        <p className="text-white text-xl text-center">Прогресс ежедневной цели</p>
        <p className="text-white text-lg text-center">Продолжайте в том же духе!</p>
        <div className="flex justify-center items-center mt-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-green-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <motion.circle
                className="text-yellow-300 stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{
                  strokeDashoffset: 251.2 - (251.2 * calculateProgress()) / 100,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                strokeDasharray="251.2"
                transform="rotate(-90 50 50)"
              ></motion.circle>
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <motion.span
                className="text-2xl text-white font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {calculateProgress()}%
              </motion.span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-white text-xl mb-2">Задачи на сегодня:</h3>
          <ul className="space-y-2">
            {dailyTasks.map((task, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                  className="mr-2 w-5 h-5"
                />
                <span
                  className={`text-white ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex mt-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Добавить новую задачу"
              className="flex-grow p-2 rounded-l-lg"
            />
            <button
              onClick={handleAddTask}
              className="bg-yellow-300 text-white p-2 rounded-r-lg"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
          <FaFire className="mr-3 text-yellow-300 text-3xl" />
          Ежедневный стрик
        </h2>
        <div className="flex items-center justify-between">
          {dailyStreak === 0 ? (
            <div className="text-white text-center w-full">
              <p className="text-3xl font-bold mb-2">
                Начните свою серию сегодня!
              </p>
              <p className="text-xl">
                Выполните любое действие, чтобы начать свой путь
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <p className="text-white text-6xl font-bold mb-2">
                  {dailyStreak}
                </p>
                <p className="text-white text-xl">
                  {dailyStreak === 1 ? "день" : "дней"}
                </p>
              </div>
              <div className="text-white text-xl flex-grow ml-6">
                <p className="font-bold text-2xl mb-2">
                  {dailyStreak < 7 ? "Так держать!" : "Невероятная работа!"}
                </p>
                <p className="text-lg">
                  {dailyStreak < 7
                    ? `${7 - dailyStreak} дней до следующей вехи!`
                    : `Вы достигли вехи в ${
                        Math.floor(dailyStreak / 7) * 7
                      } дней!`}
                </p>
                <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
                  <div
                    className="bg-yellow-300 h-2 rounded-full"
                    style={{ width: `${((dailyStreak % 7) / 7) * 100}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <BottomBar />

      {showMeditation ? (
        <MeditationActivity onClose={handleMeditationClose} />
      ) : showTakeBreak ? (
        <TakeBreakActivity onClose={() => setShowTakeBreak(false)} />
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center">Повысить продуктивность</h2>
          <div className="grid grid-cols-2 gap-6 mb-20">
            {[
              { name: "Медитировать", icon: "🧘" },
              { name: "Сделать перерыв", icon: "☕" },
              { name: "Поставить цели", icon: "🎯" },
              { name: "Начать рабочую сессию", icon: "⏱️" },
            ].map((activity, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg flex flex-col items-center justify-center ${getBackgroundColor(
                  index
                )} h-32 cursor-pointer`}
                onClick={() => handleActivityClick(activity.name)}
              >
                <span className="text-white text-4xl mb-2">
                  {activity.icon}
                </span>
                <span className="text-white text-medium text-center">
                  {activity.name}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {showAllTasksCompleted && (
        <div className="fixed center left-0 right-0 bg-yellow-300 text-white p-4 flex justify-between items-center rounded-t-lg">
          <span className="font-bold">Все задачи выполнены!</span>
          <button
            onClick={handleClearTasks}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaTrash className="mr-2" />
            Очистить
          </button>
        </div>
      )}
    </div>
  );
};

const getBackgroundColor = (index) => {
  const colors = [
    "bg-blue-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
  ];
  return colors[index % colors.length];
};

export default WorkGamificationApp;

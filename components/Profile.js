import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaCog, FaTimes } from "react-icons/fa";
import { UserCircle2 } from "lucide-react";
import BottomBar from "./BottomBar";

const ProfileComponent = () => {
  const [totalDiamonds, setTotalDiamonds] = useState(0);
  const [activityCounts, setActivityCounts] = useState({
    meditation: 0,
    break: 0,
    goals: 0,
    workSession: 0,
  });
  const [ongoingActivitiesCount, setOngoingActivitiesCount] = useState(0);
  const [showActivityDetails, setShowActivityDetails] = useState(false);

  useEffect(() => {
    // Load total diamonds from localStorage when component mounts
    const storedDiamonds = localStorage.getItem("totalDiamonds");
    if (storedDiamonds) {
      setTotalDiamonds(parseInt(storedDiamonds, 10));
    }

    // Load activity counts from localStorage
    const storedActivityCounts = localStorage.getItem("activityCounts");
    if (storedActivityCounts) {
      setActivityCounts(JSON.parse(storedActivityCounts));
    }

    // Count ongoing activities from localStorage
    let count = 0;
    if (localStorage.getItem("ongoingMeditation")) count++;
    if (localStorage.getItem("ongoingBreak")) count++;
    setOngoingActivitiesCount(count);
  }, []);

  // Mock user data (keep other fields, update points with totalDiamonds)
  const user = {
    username: "User Test",
    level: "Бронза",
    badges: [
      { id: 1, icon: "🏆", name: "Чемпион" },
      { id: 2, icon: "🌟", name: "Звезда" },
      { id: 3, icon: "🚀", name: "Быстрый ученик" },
      { id: 4, icon: "🎯", name: "Достигатор целей" },
      { id: 5, icon: "💪", name: "Настойчивый" },
      { id: 6, icon: "🧠", name: "Искатель знаний" },
      { id: 7, icon: "🤝", name: "Командный игрок" },
      { id: 8, icon: "🔥", name: "В огне" },
    ],
  };

  const totalActivities = Object.values(activityCounts).reduce(
    (a, b) => a + b,
    0
  );

  const toggleActivityDetails = () => {
    setShowActivityDetails(!showActivityDetails);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white p-4 flex justify-between items-center">
        <FaChevronLeft className="text-gray-600 text-xl" />
        <h1 className="text-xl font-bold">Профиль</h1>
        <FaCog className="text-gray-600 text-xl" />
      </header>

      <main className="p-6 -mt-3.5">
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex flex-col items-center">
            <UserCircle2 size={128} strokeWidth={1.5} className="text-gray-400" />
            <h2 className="mt-4 text-3xl font-semibold">{user.username}</h2>
            <div className="mt-2 flex items-center">
              <span className="bg-orange-400 text-white px-3 py-1 rounded-full text-lg mr-2">
                💎 {totalDiamonds}
              </span>
              <span className="bg-green-400 text-white px-3 py-1 rounded-full text-lg">
                {user.level}
              </span>
            </div>
          </div>

          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Мои значки</h3>
            <div className="grid grid-cols-4 gap-4">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-gray-200 rounded-lg p-2 flex flex-col items-center justify-center aspect-square"
                  title={badge.name}
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <span className="text-xs mt-1 text-center truncate w-full">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Мои активности</h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="bg-yellow-100 p-4 rounded-lg cursor-pointer"
                onClick={toggleActivityDetails}
              >
                <h4 className="font-medium">Всего</h4>
                <p className="text-2xl font-bold mt-2">{totalActivities}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg">
                <h4 className="font-medium">В процессе</h4>
                <p className="text-2xl font-bold mt-2">
                  {ongoingActivitiesCount}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {showActivityDetails && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-11/12 max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Детали активности</h3>
                <FaTimes
                  className="text-gray-600 cursor-pointer"
                  onClick={toggleActivityDetails}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(activityCounts).map(([activity, count]) => {
                  const activityLabels = {
                    meditation: "Медитация",
                    break: "Перерыв",
                    goals: "Цели",
                    workSession: "Рабочая сессия",
                  };
                  return (
                    <div key={activity} className="bg-blue-100 p-4 rounded-lg">
                      <h4 className="font-medium">{activityLabels[activity]}</h4>
                      <p className="text-2xl font-bold mt-2">{count}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileComponent;

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import BottomBar from "../components/BottomBar";

const StatsPage = () => {
  // Mock data for stats
  const statsData = {
    weeklyProgress: {
      tasksCompleted: 23,
      pointsEarned: 450,
      productivityScore: 85,
    },
    monthlyComparison: [
      { label: "Завершено задач", current: 92, previous: 87 },
      { label: "Заработано очков", current: 1800, previous: 1650 },
      { label: "Активность", current: 88, previous: 82 },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen p-6 flex flex-col">
      <header className="flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold">Личная статистика</h1>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Недельный прогресс</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-1.5 rounded-lg text-center ">
            <h4 className="text-sm font-medium">Завершено задач</h4>
            <p className="text-2xl font-bold mt-4">
              {statsData.weeklyProgress.tasksCompleted}
            </p>
          </div>
          <div className="bg-green-100 p-1 rounded-lg text-center pt-1.5">
            <h4 className="text-sm font-medium">Заработано очков</h4>
            <p className="text-2xl font-bold mt-4">
              {statsData.weeklyProgress.pointsEarned}
            </p>
          </div>
          <div className="bg-purple-100 p-1 rounded-lg text-center pt-2">
            <h4 className="text-sm font-medium">Активность</h4>
            <p className="text-2xl font-bold mt-8">
              {statsData.weeklyProgress.productivityScore}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-md mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-8">Прошлый месяц</h2>
        <div className="space-y-4">
          {statsData.monthlyComparison.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium">
                {item.label}
              </span>
              <div className="flex items-center">
                <span className="font-bold mr-2">{item.current}</span>
                {item.current > item.previous ? (
                  <FaChevronUp className="text-green-500" />
                ) : (
                  <FaChevronDown className="text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default StatsPage;

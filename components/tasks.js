export const tasks = [
  {
    id: 1,
    name: "Zen Master",
    description: "Achieve a high Relaxation index for 10 minutes",
    points: 100,
    metric: "relaxationIndex",
    condition: (value) => value > 80,
    duration: 600000, // 10 minutes
    checkCompletion: (apiData, taskProgress) => {
      if (apiData.relaxationIndex > 80) {
        if (!taskProgress.startTime) {
          return { ...taskProgress, startTime: Date.now() };
        } else if (Date.now() - taskProgress.startTime >= 600000) {
          return { completed: true };
        }
      } else {
        return { startTime: null };
      }
      return taskProgress;
    },
  },
  {
    id: 2,
    name: "Focus Guru",
    description: "Maintain a high Concentration index for 15 minutes",
    points: 150,
    metric: "concentrationIndex",
    condition: (value) => value > 70,
    duration: 900000, // 15 minutes
    checkCompletion: (apiData, taskProgress) => {
      if (apiData.concentrationIndex > 70) {
        if (!taskProgress.startTime) {
          return { ...taskProgress, startTime: Date.now() };
        } else if (Date.now() - taskProgress.startTime >= 900000) {
          return { completed: true };
        }
      } else {
        return { startTime: null };
      }
      return taskProgress;
    },
  },
  {
    id: 3,
    name: "Flow State",
    description: "Achieve a high Alpha Gravity state for 20 minutes",
    points: 200,
    metric: "alphaGravity",
    condition: (value) => value > 0.6,
    duration: 1200000, // 20 minutes
    checkCompletion: (apiData, taskProgress) => {
      if (apiData.alphaGravity > 0.6) {
        if (!taskProgress.startTime) {
          return { ...taskProgress, startTime: Date.now() };
        } else if (Date.now() - taskProgress.startTime >= 1200000) {
          return { completed: true };
        }
      } else {
        return { startTime: null };
      }
      return taskProgress;
    },
  },
  {
    id: 4,
    name: "Cognitive Powerhouse",
    description: "Maintain a high Cognitive score for 10 minutes",
    points: 100,
    metric: "cognitiveScore",
    condition: (value) => value > 80,
    duration: 600000, // 10 minutes
    checkCompletion: (apiData, taskProgress) => {
      if (apiData.cognitiveScore > 80) {
        if (!taskProgress.startTime) {
          return { ...taskProgress, startTime: Date.now() };
        } else if (Date.now() - taskProgress.startTime >= 600000) {
          return { completed: true };
        }
      } else {
        return { startTime: null };
      }
      return taskProgress;
    },
  },
  {
    id: 5,
    name: "Stress Buster",
    description: "Reduce your Gaming Stress from high to low",
    points: 75,
    checkCompletion: (apiData, taskProgress) => {
      if (!taskProgress.initialStress) {
        return { ...taskProgress, initialStress: apiData.gamingStress };
      } else if (apiData.gamingStress < 30 && taskProgress.initialStress > 70) {
        return { completed: true };
      }
      return taskProgress;
    },
  },
  {
    id: 6,
    name: "Balanced Gamer",
    description:
      "Maintain high Gaming Focus and Gaming Chill simultaneously for 5 minutes",
    points: 125,
    metrics: ["gamingFocus", "gamingChill"],
    condition: (values) => values.gamingFocus > 70 && values.gamingChill > 60,
    duration: 300000, // 5 minutes
    checkCompletion: (apiData, taskProgress) => {
      if (apiData.gamingFocus > 70 && apiData.gamingChill > 60) {
        if (!taskProgress.startTime) {
          return { ...taskProgress, startTime: Date.now() };
        } else if (Date.now() - taskProgress.startTime >= 300000) {
          return { completed: true };
        }
      } else {
        return { startTime: null };
      }
      return taskProgress;
    },
  },
  {
    id: 7,
    name: "Fatigue Fighter",
    description: "Reduce your Fatigue score by 30% in 15 minutes",
    points: 150,
    checkCompletion: (apiData, taskProgress) => {
      if (!taskProgress.initialFatigue) {
        return {
          ...taskProgress,
          initialFatigue: apiData.fatigueScore,
          startTime: Date.now(),
        };
      } else if (Date.now() - taskProgress.startTime >= 900000) {
        // 15 minutes
        if (apiData.fatigueScore <= taskProgress.initialFatigue * 0.7) {
          return { completed: true };
        } else {
          return {
            initialFatigue: apiData.fatigueScore,
            startTime: Date.now(),
          };
        }
      }
      return taskProgress;
    },
  },
  {
    id: 8,
    name: "Rhythm Master",
    description:
      "Maintain a balanced Alpha, Beta, and Theta rhythm for 10 minutes",
    points: 175,
    metrics: ["alphaRhythm", "betaRhythm", "thetaRhythm"],
    condition: (values) =>
      Math.abs(values.alphaRhythm - values.betaRhythm) < 0.2 &&
      Math.abs(values.alphaRhythm - values.thetaRhythm) < 0.2,
    duration: 600000, // 10 minutes
    checkCompletion: (apiData, taskProgress) => {
      if (
        Math.abs(apiData.alphaRhythm - apiData.betaRhythm) < 0.2 &&
        Math.abs(apiData.alphaRhythm - apiData.thetaRhythm) < 0.2
      ) {
        if (!taskProgress.startTime) {
          return { ...taskProgress, startTime: Date.now() };
        } else if (Date.now() - taskProgress.startTime >= 600000) {
          return { completed: true };
        }
      } else {
        return { startTime: null };
      }
      return taskProgress;
    },
  },
];

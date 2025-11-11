export const achievements = [
  {
    id: 1,
    name: "Focused Mind",
    description: "Maintain a Concentration index above 80 for 5 minutes",
    metric: "concentrationIndex",
    condition: (value) => value > 80,
    duration: 300000, // 5 minutes in milliseconds
  },
  {
    id: 2,
    name: "Zen Master",
    description: "Achieve a Relaxation index of 90 or higher",
    metric: "relaxationIndex",
    condition: (value) => value >= 90,
    instant: true,
  },
  {
    id: 3,
    name: "Energizer",
    description: "Reduce your Fatigue score by 50%",
    metric: "fatigueScore",
    condition: (value, initial) => value <= initial * 0.5,
    needsInitial: true,
  },
  {
    id: 4,
    name: "Alpha Wave Rider",
    description: "Maintain an Alpha Rhythm above 0.5 for 3 minutes",
    metric: "alphaRhythm",
    condition: (value) => value > 0.5,
    duration: 180000, // 3 minutes in milliseconds
  },
  {
    id: 5,
    name: "Cool Under Pressure",
    description:
      "Keep your Gaming Stress below 30 for an entire gaming session",
    metric: "gamingStress",
    condition: (value) => value < 30,
    duration: 600000, // 10 minutes in milliseconds
  },
  {
    id: 6,
    name: "Heart of a Champion",
    description: "Maintain a steady BPM between 60-80 for 5 minutes",
    metric: "BPM",
    condition: (value) => value >= 60 && value <= 80,
    duration: 300000, // 5 minutes in milliseconds
  },
  {
    id: 7,
    name: "Cognitive Powerhouse",
    description: "Achieve a Cognitive score of 90 or higher",
    metric: "cognitiveScore",
    condition: (value) => value >= 90,
    instant: true,
  },
  {
    id: 8,
    name: "Balanced Gamer",
    description:
      "Maintain Gaming Focus above 70 and Gaming Chill above 60 simultaneously for 2 minutes",
    metrics: ["gamingFocus", "gamingChill"],
    condition: (apiData) =>
      apiData.gamingFocus > 70 && apiData.gamingChill > 60,
    duration: 120000, // 2 minutes in milliseconds
  },
];

# Neiry Gamification App

## Overview

This project is a gamification app developed for Neiry, a Russian Brain-Computer Interface (BCI) company, during a hackathon held from September 20-22. The app aims to enhance user engagement and productivity by incorporating game-like elements into daily tasks and activities.

## Features

1. **Work Gamification**

   - Daily tasks management
   - Progress tracking
   - Reward system with diamonds

2. **Meditation Activity**

   - Guided breathing exercises
   - Customizable inhale and exhale timers
   - Rewards for completing sessions

3. **Break Management**

   - Timed break sessions
   - Activity suggestions during breaks
   - Rewards for taking regular breaks

4. **Achievement System**

   - Various achievements to unlock
   - Progress tracking for each achievement

5. **User Profile**

   - Personalized avatar
   - Badge collection
   - Activity statistics

6. **Stats Dashboard**
   - Weekly progress overview
   - Monthly comparisons
   - Top achievements showcase

## Technology Stack

- Next.js
- React
- Tailwind CSS
- Framer Motion
- Chart.js
- Canvas Confetti

## Getting Started

To run this project locally:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

The main components of the project are:

- `components/hero.js`: Main work gamification interface
- `components/MeditationActivity.js`: Meditation session component
- `components/TakeBreakActivity.js`: Break management component
- `components/tasks.js`: Task definitions and logic
- `components/achievements.js`: Achievement definitions
- `pages/stats.js`: Statistics dashboard
- `components/Profile.js`: User profile component

## Customization

The app's appearance can be customized by modifying the Tailwind configuration file:

javascript:tailwind.config.js
startLine: 1
endLine: 68

## Contributing

This project was developed during a hackathon, but contributions for improvement are welcome. Please feel free to submit issues or pull requests.

## License

MIT

## Acknowledgements

Special thanks to Neiry for the opportunity to develop this gamification app during the hackathon, and to all team members who contributed to its creation.

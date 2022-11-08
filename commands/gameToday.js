const axios = require("axios");

const gameToday = async () => {
  const timestamp = Date.now();
  const todayDate = new Date(timestamp);
  const todayDateString = todayDate.toISOString().substring(0, 10);
  const season = todayDate.getFullYear();

  try {
    const response = await axios.get(
      `https://balldontlie.io/api/v1/games?team_ids[]=3&seasons[]=${season}`
    );
    const gamesArray = response.data.data;
    const upcomingGames = gamesArray.filter((game) => game.time !== "Final");

    console.log(upcomingGames[0].date);
    const nextGame = new Date(upcomingGames[0].date);
    const nextGameDateString = nextGame.toISOString().substring(0, 10);
    if (todayDateString === nextGameDateString) {
      console.log("There is a game later today!");
    } else if (todayDateString !== nextGameDateString) {
      console.log("No game today!");
      console.log(`Next game is ${nextGameDateString}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = gameToday;

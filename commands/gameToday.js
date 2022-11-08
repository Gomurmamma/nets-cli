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

    const nextGame = upcomingGames[0];
    const nextGameDate = new Date(upcomingGames[0].date);
    const nextGameDateString = nextGameDate.toISOString().substring(0, 10);
    if (todayDateString === nextGameDateString) {
      console.log("There is a game later today!");
    } else if (todayDateString !== nextGameDateString) {
      console.log("No game today!");
      const nextGameDatePrint = nextGameDate.toLocaleDateString("en-us", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      console.log(`Next game is ${nextGameDatePrint}.`);
    }

    nextGame.home_team.id === 3
      ? console.log("Nets are home.")
      : console.log(`Nets are away at ${nextGame.home_team.city}`);

    console.log(`Game starts at ${nextGame.status}`);
    console.log("Go Nets!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = gameToday;

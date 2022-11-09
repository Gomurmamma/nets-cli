const axios = require("axios");
const chalk = require("chalk");

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

    //filter game schedule into upcomingGames
    let upcomingGames = gamesArray.filter((game) => game.time !== "Final");

    //Sort by ascending id since id's are in chronological order
    upcomingGames = upcomingGames.sort((a, b) => {
      return a.id - b.id;
    });

    //Net's nextGame will be first in upcomingGames[]
    const nextGame = upcomingGames[0];

    const nextGameDate = new Date(upcomingGames[0].date);
    const nextGameDateString = nextGameDate.toISOString().substring(0, 10);

    //Compare date strings
    if (todayDateString === nextGameDateString) {
      console.log(chalk.bgGreen.bold("There is a game today!"));
    } else if (todayDateString !== nextGameDateString) {
      console.log(chalk.yellowBright.bold("No game today!"));
      const nextGameDatePrint = nextGameDate.toLocaleDateString("en-us", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      console.log(
        chalk.yellowBright.bold.underline(`Next game is: ${nextGameDatePrint}.`)
      );
    }

    nextGame.home_team.id === 3
      ? console.log(
          chalk.whiteBright.bold("Nets are home against the ") +
            chalk.yellowBright.bold(`${nextGame.visitor_team.full_name}`)
        )
      : console.log(
          chalk.whiteBright.bold(`Nets are away at ${nextGame.home_team.city}`)
        );

    console.log(chalk.whiteBright(`Game starts at ${nextGame.status}`));
    console.log(
      chalk.redBright.bold("GO NETS!"),
      chalk.whiteBright.bold("GO NETS!"),
      chalk.blueBright.bold("GO NETS!")
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = gameToday;

#! /usr/bin/env node

const { program } = require("commander");
const gameToday = require("../commands/gameToday");

program
  .command("game-today")
  .description("Lists all Brooklyn Nets NBA games for today")
  .action(gameToday);

program.parse();

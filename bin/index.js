#! /usr/bin/env node
console.log("Hello world!");

const { program } = require("commander");

program
  .command("game-today")
  .description("Lists all Brooklyn Nets NBA games for today")
  .action(game - today);

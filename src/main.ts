#!/usr/bin/env node


import figlet from "figlet";
import { program } from "./program";

console.log(figlet.textSync("Giroldo's Font Manager"));

// Executa o programa
program.parse(process.argv);

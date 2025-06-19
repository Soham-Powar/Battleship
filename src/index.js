import "./styles.css";
import Player from "./components/Player";

import renderGameBoard from "../renderGameBoards";

const userPlayer = new Player("User");
const cpuPlayer = new Player("CPU");

renderGameBoard();

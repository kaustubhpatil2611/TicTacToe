import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns){
  let activePlayer = 'X';
  
  if(turns.length>0 && turns[0].player === 'X'){
    activePlayer = 'O';
  }

  return activePlayer;
}

function checkWinningPlayer(gameBoard, players, gameTurns){
  let winnerPlayer;
  let gameFinished = false;

  for(const combination of WINNING_COMBINATIONS){
    let firstMark = gameBoard[combination[0].row][combination[0].column];
    let secondMark = gameBoard[combination[1].row][combination[1].column];
    let thirdMark = gameBoard[combination[2].row][combination[2].column];
    
    if(firstMark && firstMark === secondMark  && secondMark === thirdMark){
       winnerPlayer = players[firstMark];
       gameFinished = true;
     }
  }

  let gameDraw = (gameTurns && gameTurns.length === 9 && !winnerPlayer? true:false);

  return [winnerPlayer, gameFinished, gameDraw];
  
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];;

  for(const turn of gameTurns){
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }

  return gameBoard;
}

function App() {
  
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(
    {
      X: 'Player1',
      O: 'Player2',
    }
  )
  

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const [winnerPlayer, gameFinished, gameDraw] = checkWinningPlayer(gameBoard, players, gameTurns);

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    })
  }

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurn)=>{
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        {square:{row:rowIndex, col:colIndex}, player: currentPlayer},
        ...prevTurn,
      ]
      return updatedTurns;
    });
}

  const handleRestart = () => {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer==='X'} playerNameChangeHandler={handlePlayerNameChange}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer==='O'} playerNameChangeHandler={handlePlayerNameChange}/>
        </ol>
        {gameDraw && <GameOver restartHandler={handleRestart}></GameOver>}
        {winnerPlayer && <GameOver winner={winnerPlayer} restartHandler={handleRestart}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} disableBoard={gameFinished}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App

export default function GameOver({winner, restartHandler}){
    console.log("game over screen");
    return (
        <div id="game-over">
            <h2>GameOver</h2>
            {!winner?<p>Game Drawn!</p>:<p>{winner} won!</p>}
            <p><button onClick={restartHandler}>Rematch!</button></p>
        </div>
    )
}

export default function GameBoard({onSelectSquare, gameBoard, disableBoard}){
    return <ol id="game-board">
        {gameBoard.map((row, rowIndex)=>{
            return ( 
            <li key={rowIndex}>
                <ol>
                {row.map((playerSymbol,colIndex)=>{
                    return (<li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null || disableBoard}>{playerSymbol}</button>
                    </li>);
                })}
                </ol>
            </li>);
        })}
    </ol>; 
}
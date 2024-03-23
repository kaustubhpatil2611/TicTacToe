import {useState} from 'react';

export default function Player({name, symbol, isActive, playerNameChangeHandler}){

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    const editPlayer = () => {
        setIsEditing(true);
    }

    const savePlayer = () => {
        setIsEditing(false);
        playerNameChangeHandler(symbol, playerName);
    }

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive?'active':undefined}>
            <span className="player">
              {isEditing?<input type='text' onChange={handleChange} value={playerName} required></input>:<span className="player-name">{playerName}</span>}
              <span className="player-symbol">{symbol}</span>
            </span>
            {isEditing?<button onClick={savePlayer}>Save</button>:<button onClick={editPlayer}>Edit</button>}
            
        </li>
    );
}
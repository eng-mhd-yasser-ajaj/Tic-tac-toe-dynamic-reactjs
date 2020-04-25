import React, { useState } from 'react';
import XOGame from './XOGame';

import Select from 'react-select';

const options = [
    { value: '0', label: 'Please select one' },
    { value: '3', label: '3X3' },
    { value: '5', label: '5X5' },
    { value: '7', label: '7X7' } 
  ];

function StartGame() {
    const [startXOGame,setStartXOGame] = useState(false)
    const [clicked,setClicked] = useState(false)
    const [size, setSize] = useState(0)
    const [xPlayer, setXPlayer] = useState('')
    const [oPlayer, setOPlayer] = useState('')

    const onSelectedSize = (e) => {
        setSize( 
           e.value
        )
    }

    const changeName = (e) => {
        if (e.target.name === 'firstplayer') {
            setXPlayer(e.target.value)
        } else if (e.target.name === 'secondplayer') {
            setOPlayer(e.target.value)
        }
    }

    const stopClicked = () => {
        setClicked(false)
    }

    const startGame = () => {
        setStartXOGame(true)
        setClicked(true)
    }

    const restartHandle = () => {
        setStartXOGame(false)
        setClicked(false)
        setXPlayer('')
        setOPlayer('')
    }

    return (
            
            (!clicked ||  !startXOGame || xPlayer.length===0 || oPlayer.length===0)?
                <div>
                    <h2>Tic Tac Toe Game</h2>
                     <Select className="select-custom-class" options = {options} onChange={e => onSelectedSize(e)}/>
                    
                    <table align="center">
                        <tbody>
                            <tr>
                                <td><label>Please add name for Player X</label></td>
                                <td><input name="firstplayer" type="text" value={xPlayer} onChange={e => changeName(e)}/>
                                {startXOGame && xPlayer.length===0? <tr><label className="error-class">please add name</label></tr> : ""}
                                </td>
                            </tr>
                            <tr>
                                <td><label>Please add name for Player O</label></td>
                                <td><input name="secondplayer" type="text" value={oPlayer} onChange={e => changeName(e)}/>
                                {startXOGame && oPlayer.length===0? <tr><label className="error-class">please add name</label></tr> : ""}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={startGame}>
                        Start Game
                    </button>
                    {clicked? stopClicked() : null}
                </div>
            :
            <div>
                <XOGame size={size} xPlayer={xPlayer} oPlayer={oPlayer} onRestartClick={restartHandle}/>
            </div>
            
    );
}

export default StartGame;
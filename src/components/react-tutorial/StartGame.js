import React, { useState } from 'react';
import XOGame from './XOGame';
import chroma from 'chroma-js';

import Select from 'react-select';

const options = [
    { value: '0', label: 'Please select one' },
    { value: '3', label: '3X3' },
    { value: '5', label: '5X5' },
    { value: '7', label: '7X7' } 
  ];

function StartGame(props) {
    const [startXOGame,setStartXOGame] = useState(false)
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

    const startGame = () => {
        setStartXOGame(true)
    }

    return (
            !startXOGame?
                <div>
                    <h2>Tic Tac Toe Game</h2>
                    {/* <select onChange={e => onSelectedSize(e)}>
                        <option value="0">Please choose one</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                    </select> */}
                     <Select className="select-custom-class" options = {options} onChange={e => onSelectedSize(e)}/>
                    
                    <table align="center">
                        <tbody>
                            <tr>
                                <td><label for="firstplayer">Please add name for Player X</label></td>
                                <td><input name="firstplayer" type="text" value={xPlayer} onChange={e => changeName(e)}/></td>
                            </tr>
                            <tr>
                                <td><label for="secondplayer">Please add name for Player O</label></td>
                                <td><input name="secondplayer" type="text" value={oPlayer} onChange={e => changeName(e)}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={startGame}>
                        Start Game
                    </button>
                </div>
            :
            <XOGame size={size} xPlayer={xPlayer} oPlayer={oPlayer}/>
    );
}

export default StartGame;
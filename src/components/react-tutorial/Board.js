import Square from './Square';
import React from 'react';

function Board(props) {
    const renderSquer = (i) => {
        return(
            <Square 
                value={props.squares[i]}        
                onClick={() => props.onClick(i)}
                />
        )
    }

    const size = props.size
    const arr = Array(size);
    for (let i=0;i<size;i++) {
        arr[i] = i+1
    }
    return (
        <table align="center">
            <tbody>
                {arr.map((row, rowIdx) => { 
                    return (
                    <tr key={rowIdx}>
                        {
                        arr.map((col, colIdx) => { 
                        return <td key={rowIdx+'_'+colIdx}>{renderSquer((size * rowIdx) + colIdx)} </td> 
                        })}
                    </tr>
                    );
                })}
            </tbody>
        </table>
        );
}

export default Board;
import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
    
    renderSquer(i) {
        return(
            <Square 
                value={this.props.squares[i]}        
                onClick={() => this.props.onClick(i)}
                />
        )
    }

    render() {
        const self = this;
        const arr = [];
        const size = this.props.size
        for (let i=0;i<size;i++) {
            arr[i] = i+1
        }
        return (
            <table align="center">
                <tbody>
                    {arr.map((row, rowIdx) => { // create rows
                        return (
                        <tr key={rowIdx}>
                            {
                            arr.map((col, colIdx) => { // create columns
                            return <td key={rowIdx+'_'+colIdx}>{self.renderSquer((size * rowIdx) + colIdx)} </td> // square index
                            })}
                        </tr>
                        );
                    })}
              </tbody>
            </table>
          );
    }
}


export default Board;
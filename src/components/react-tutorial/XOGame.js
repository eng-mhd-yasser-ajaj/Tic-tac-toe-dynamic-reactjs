import React, {  useReducer } from 'react';
import Board from './Board';

function XOGame(props) {
    const TYPE_CHOOSE = 'TYPE_CHOOSE'
    const SIZE = props.size
    const xPlayer = props.xPlayer
    const oPlayer = props.oPlayer
    const X = 'X'
    const O = 'O'
    const initialState = {
        history: [{squares: Array(SIZE*SIZE).fill(null)}],
        step:0,
        xIsNext: true
    }
    const reducer = (state, action) => {
        switch(action.type) {
            case TYPE_CHOOSE:
                const squares = action.squares;
                const history = state.history;
                return { ...state,
                    history:history.concat([{squares: squares}]),
                    step: state.step + 1,
                    xIsNext: !state.xIsNext
                }
            default: 
                return state;
        }
    }
    
    const [state,dispatch] = useReducer(reducer,initialState)
    const onClickHandler = (i) => {
        const history = state.history;
        const squares = history[history.length-1].squares;
        if (squares[i] || calculateWinner(squares,SIZE)) {
            return;
        }
        squares[i] = state.xIsNext? X : O
        dispatch({type:TYPE_CHOOSE,index:i, squares:squares})
    }
    
    const history = state.history;
    const current = history[state.step];    
    const winner = calculateWinner(current.squares,SIZE);    
    let status;    
    if (winner) {
        status = 'Winner: ' + (winner===X? xPlayer : oPlayer) ;    
    } else { 
        status = 'Next player: ' + (state.xIsNext ? xPlayer : oPlayer);    
    }
    return (
        <div>
            <Board size={SIZE}
                squares={current.squares} 
                onClick={(i) => onClickHandler(i)}/>   
            <div>
                {status}
            </div>
            {/* <div>
                {moves}
            </div> */}
        </div>
    );
}

export default XOGame;

// class XOGame extends Component {
//     constructor(props) {    
//         super(props);
//         this.state = {      
//             history: [{squares: Array(props.size*props.size).fill(null)}],
//             step:0,
//             xIsNext: true
//         };
//     }

//     // jumpTo(move) {
//     //     this.setState({
//     //         step:move,
//     //         xIsNext: (move%2) === 0
//     //     })
//     // }

//     onClickHandler(i) {
//         const step = this.state.step
//         const history = this.state.history.slice(0,step+1);
//         const squares = history[history.length-1].squares;
//         if (squares[i] || calculateWinner(squares,this.props.size)) {
//             return;
//         }
//         squares[i] = this.state.xIsNext? 'X' : 'O'
//         this.setState({
//             history:history.concat([{squares: squares}]),
//             step: step + 1,
//             xIsNext: !this.state.xIsNext
//         })
        
//     }
    
//     render() {
//         const history = this.state.history;
//         const current = history[this.state.step];    
//         const winner = calculateWinner(current.squares,this.props.size);    
//         let status;    
//         if (winner) {
//             status = 'Winner: ' + winner;    
//         } else { 
//             status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
//         }

//         // const moves = history.map((step, move) => {      
//         //     const desc = move ?        
//         //     'Go to move #' + move :        
//         //     'Go to game start';      
//         //     return (        
//         //         <li key={move}>          
//         //             <button onClick={() => this.jumpTo(move)}>{desc}</button>        
//         //         </li>      
//         //     );   
//         //  });

//         return (
//             <div>
//                 <Board size={this.props.size}
//                     squares={current.squares} 
//                     onClick={(i) =>this.onClickHandler(i)}/>   
//                 <div>
//                     {status}
//                 </div>
//                 {/* <div>
//                     {moves}
//                 </div> */}
//             </div>
//         );
//     }

// }

function calculateWinner(squares,size) {
    let leftRight = Array(2).fill(true)
    for (let i=0;i<size;i++) {
        let rowColumnIndex = Array(2).fill(null)
        let rowColumn = Array(2).fill(true)
        for (let j=0;j<size && (rowColumn[0]|| rowColumn[1]);j++) {
            if (!rowColumnIndex[0] && squares[(j+(i*size))] && j===0) {
                rowColumnIndex[0] = j+(i*size)
            }
            if (rowColumn[0] && !(squares[(j+(i*size))] && squares[(j+(i*size))] === squares[rowColumnIndex[0]])) {
                rowColumn[0] = false;
            }
            
            if (rowColumn[1] && !rowColumnIndex[1] && squares[i + (j*size)] && j===0) {
                rowColumnIndex[1] = i + (j*size)
            }
            if (rowColumn[1] && !(squares[i + (j*size)] && squares[i + (j*size)] === squares[rowColumnIndex[1]])) {
                rowColumn[1] = false;
            }
        }
        if (rowColumn[0] || rowColumn[1]) {
            return rowColumn[0]? squares[rowColumnIndex[0]] : squares[rowColumnIndex[1]]
        }
        if (leftRight[0] && !(squares[0] && squares[i + (i*size)] === squares[0])) {
            leftRight[0] = false;
        }
        if (leftRight[1] && !(squares[size-1] && squares[(i+1)*(size -1)] === squares[size -1])) {
            leftRight[1] = false;
        }
    }
    if (leftRight[0] || leftRight[1]) {
        return leftRight[0]? squares[0] : squares[size-1]
    }
    return null;
}

// export default XOGame;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import VideoGameAssetIcon from '@material-ui/icons/VideogameAsset';
import ReplayIcon from '@material-ui/icons/Replay';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}
const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true
};
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }
  restartGame() {
    this.setState(initialState);
  }
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <Typography className="status" variant="body1" gutterBottom>
          {status}
        </Typography>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <Button variant="contained" color="secondary" className="restart-btn" onClick={() => this.restartGame()}>
          Restart the game
          <ReplayIcon />
        </Button>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <VideoGameAssetIcon className="logo" color="secondary" />
            <Typography className="title" variant="h6" color="inherit">
              Tic-Tac-Toe
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper>
          <div className="game">
            <div className="game-board">
              <Board />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

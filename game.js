const { useState, useEffect, useRef } = React;

const Square = ({ id, newState }) => {
    const palet = ['red', 'blue', 'green'];
    const getRandomColor = () => palet[Math.floor(Math.random() * 3)];
    const [color, setColor] = useState(null);
    const [player, setPlayer] = React.useState(null);
    const XorO = ["O", "X"];
    const buttonRef = useRef(null);
    
    useEffect(() => {
        buttonRef.current.style.background = color;
        if (color) {
            let nextPlayer = newState(id);
            setPlayer(nextPlayer);   
        }
    }, [color]);

    return (
        <button ref={buttonRef} onClick={
            () => {
                setColor(getRandomColor());
            }
        }>
        <h1>{XorO[player]}</h1>
        </button>
    )
}

const Board = () => {
    const [player, setPlayer] = useState(1);
    const [state, setState] = useState(new Array(9).fill(null));
    let status = `Player ${player}'s Turn.`;
    let winner = checkWinner(state);
    if (winner != null) status = `Player ${winner} wins`;

    const newState = idOfSquare => {
        state[idOfSquare] = player;
        setState(state);
        let nextPlayer = player ? 0 : 1;
        setPlayer(nextPlayer);
        return player;
    }

    function renderSquare(i) {
        return <Square id={i} newState={newState}></Square>
    }

    return (
        <div className="game-board">
            <div className="grid-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="grid-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="grid-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div id="info">
                <h1> {status} </h1>
            </div>
        </div>
    );
};

function checkWinner(state) {
    
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        if (state[a] == state[b] && state [a] == state[c] && state[a] != null)
            return state[a];
    }

    return null;
};

ReactDOM.render(<Board />, document.getElementById("root"));
/*

create a module for the game board (gameBoard)
    use a multi-dimensional array to represent the game board cells
    create a function to display the game board cells
        loop through array items and get total length
        add that many divs to #board
        add x and y data attributes to board cells (can be later used to mark location)
    create function that takes active payers marker and adds it to _boardArray on click

create a factory function to create the players (Players)
    must take in value for marker
    must take in value for player name

create a module to control the flow of the game (gameFlow)
    start game on start button click
    Create player objects from form
        pass into gameBoard?
    control reset game button


Questions?
    What module/function should control how marks are added to the boardArray?
        leaning towards gameBoard as it houses the board element and boardArray
        seems like gameFlow should be for higher level stuff(start, reset, enter names, etc);
    How to check for winning values?
    Active player needs to change on click
        Does this mean that _setActivePlayer should be part of the gameBoard?

*/

// Factories
//////////////////////

const Player = (name, marker) => {

    const getMarker = () => marker;
    const getName = () => name;

    return {
        getMarker,
        getName
    }

};


// Modules
//////////////////////

const gameBoard = (() => {

    // Private variables/functions

    let _player1;
    let _player2;
    let _activePlayer;

    const _board = document.querySelector('#board');

    let _boardArray = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];


    const _setActivePlayer = (playerObject) => {

        const activeName = playerObject.getName();
        const activeMarker = playerObject.getMarker();

        return {
            activeName,
            activeMarker
        }

    }

    // Public variables/functions

    const createPlayers = () => {

        _player1 = Player('player 1', 'x');
        _player2 = Player('player 2', 'o');

        _activePlayer = _setActivePlayer(_player1);

    }


    const displayBoard = () => {

        for (let i = 0; i < _boardArray.length; i++){

            for(let y = 0; y < _boardArray[i].length; y++){

                let cell = document.createElement('div');
                cell.setAttribute('class', 'board-cell');
                cell.setAttribute('data-position-x', i);
                cell.setAttribute('data-position-y', y);

                cell.innerText = _boardArray[i][y];

                _board.appendChild(cell);

            }

        }

    }


    return{
        createPlayers,
        displayBoard
    }

})();


const gameFlow = (() => {


    const startGame = () => {

        gameBoard.createPlayers();
        gameBoard.displayBoard();

    }


    return {
        startGame
    }

})();
gameFlow.startGame();

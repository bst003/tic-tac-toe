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

    const playerMarker = marker;

    const getMarker = () => marker;
    const getName = () => name;

    return {
        playerMarker,
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


    const _addMarkToBoard = (e) => {

        let positionX = e.target.getAttribute('data-position-x');
        let positionY = e.target.getAttribute('data-position-y');


        console.log(`x:${positionX} y:${positionY}`);

        if( _boardArray[positionX][positionY] === "" ){
            _boardArray[positionX][positionY] = _activePlayer.activeMarker;

            const winningMove = _checkForWin();

            displayBoard();
            setBoardListeners();
            if( winningMove ){
                console.log('winning move');
            }
            _activePlayer = _switchActivePlayer(_activePlayer);
        }

    }


    const _checkForWin = () => {

        // loop to get horizontal winning options
        for (let i = 0; i < _boardArray.length; i++){

            if( 
                ( ( _boardArray[i][0] !== "" ) 
                    && ( _boardArray[i][0] === _boardArray[i][1] ) 
                    && ( _boardArray[i][1] === _boardArray[i][2] ) 
                )
                || ( 
                    ( _boardArray[0][i] !== "" ) 
                    && ( _boardArray[0][i] === _boardArray[1][i] ) 
                    && ( _boardArray[1][i] === _boardArray[2][i] ) 
                )
            ){
                return true;
            } 

        }

        //condtionals to cover both diagonal options
        if(
            ( _boardArray[0][0] !== "" ) 
            && ( _boardArray[0][0] === _boardArray[1][1] )
            && ( _boardArray[1][1] === _boardArray[_boardArray.length - 1][_boardArray.length - 1] )
        ){
            return true;
        } else if (
            ( _boardArray[0][_boardArray.length - 1] !== "" ) 
            && ( _boardArray[0][_boardArray.length - 1] === _boardArray[1][1] )
            && ( _boardArray[1][1] === _boardArray[_boardArray.length - 1][0] )
        ) {
            return true;
        }

        return false;

    }


    const _setActivePlayer = (playerObject) => {

        const activeName = playerObject.getName();
        const activeMarker = playerObject.getMarker();

        return {
            activeName,
            activeMarker
        }

    }


    const _switchActivePlayer = (playerObject) => {

        let updatedActivePlayer;

        if( playerObject.activeMarker == 'x' ){
            updatedActivePlayer =_setActivePlayer(_player2);
        } else {_setActivePlayer(_player2);
            updatedActivePlayer =_setActivePlayer(_player1);
        }

        return updatedActivePlayer;

    }

    // Public variables/functions

    const createPlayers = () => {

        _player1 = Player('player 1', 'x');
        _player2 = Player('player 2', 'o');

        _activePlayer = _setActivePlayer(_player1);

    }


    const displayBoard = () => {

        _board.innerText = '';

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


    const setBoardListeners = () => {

        let cells = document.querySelectorAll('.board-cell');

        cells.forEach( (cell) => {

            cell.addEventListener('click', _addMarkToBoard );

        }); 

    }


    return{
        createPlayers,
        displayBoard,
        setBoardListeners
    }

})();


const gameFlow = (() => {


    const startGame = () => {

        gameBoard.createPlayers();
        gameBoard.displayBoard();
        gameBoard.setBoardListeners();

    }


    return {
        startGame
    }

})();
gameFlow.startGame();

/*

TODO LIST
    Add logic for tie games
    Add buttons to play again or to reset to start screen
    Add vs computer option

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


    const _addMarkToBoard = (e) => {

        let positionX = e.target.getAttribute('data-position-x');
        let positionY = e.target.getAttribute('data-position-y');

        const messages = document.querySelector('#messages');

        if( _boardArray[positionX][positionY] === "" ){
            _boardArray[positionX][positionY] = _activePlayer.marker;

            const winningMove = _checkForWin();

            displayBoard();
            setBoardListeners();
            if( winningMove ){
                messages.innerText = `${_activePlayer.name} wins!`;
                _removeBoardListeners();
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


    const _removeBoardListeners = () => {

        let cells = document.querySelectorAll('.board-cell');

        cells.forEach( (cell) => {

            cell.removeEventListener('click', _addMarkToBoard );

        }); 

    }


    const _setActivePlayer = (playerObject) => {

        const activeName = playerObject.getName();
        const activeMarker = playerObject.getMarker();

        return {
            name: activeName,
            marker: activeMarker
        }

    }


    const _switchActivePlayer = (playerObject) => {

        let updatedActivePlayer;

        if( playerObject.marker == 'x' ){
            updatedActivePlayer =_setActivePlayer(_player2);
        } else {_setActivePlayer(_player2);
            updatedActivePlayer =_setActivePlayer(_player1);
        }

        return updatedActivePlayer;

    }

    // Public variables/functions

    const createPlayers = ( name1, name2 ) => {

        _player1 = Player(name1, 'x');
        _player2 = Player(name2, 'o');

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

    // Private variables/functions
    const _formContent = document.querySelector('#form-content');
    const _preGameContent = document.querySelector('#pre-game-content');
    const _startButtons = document.querySelectorAll('.start-game');

    const _startGame = () => {

        const playerForm = document.querySelector('#player-form');

        _preGameContent.classList.add('hidden');
        _formContent.classList.remove('hidden');

        playerForm.addEventListener('submit', _submitPlayerForm);

    }


    const _submitPlayerForm = (e) => {

        e.preventDefault();

        _formContent.classList.add('hidden');

        const player1Name = document.querySelector('#player-1-name').value;
        const player2Name = document.querySelector('#player-2-name').value;

        gameBoard.createPlayers(player1Name, player2Name);
        gameBoard.displayBoard();
        gameBoard.setBoardListeners();

    }

    // Public variables/functions

    const setupGame = () => {

        _startButtons.forEach( (startButton) => {
            startButton.addEventListener('click', _startGame);
        });

    }


    return {
        setupGame
    }

})();
gameFlow.setupGame();

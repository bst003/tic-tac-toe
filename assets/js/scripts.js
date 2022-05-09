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
    const _messages = document.querySelector('#messages');
    const _playAgainButton = document.querySelector('#play-again');
    const _postGameButtons = document.querySelector('#post-game-buttons');

    let _boardArray = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];


    const _addMarkToBoard = (e) => {

        let positionX = e.target.getAttribute('data-position-x');
        let positionY = e.target.getAttribute('data-position-y');

        console.log(gameFlow.vsComputer);


        if( _boardArray[positionX][positionY] === "" ){

            _boardArray[positionX][positionY] = _activePlayer.marker;

            let postGameMessage;

            const tieMove = _checkForTie();
            const winningMove = _checkForWin();

            displayBoard();
            setBoardListeners();

            if( winningMove ){
                postGameMessage = `${_activePlayer.name} wins!`;
            } else if ( tieMove ) {
                postGameMessage = `Tie game!`;
            }

            if( winningMove || tieMove ){
                _messages.innerText = postGameMessage;
                _postGameButtons.classList.remove('hidden');
                _playAgainButton.addEventListener('click', _playAgain );
                gameFlow.resetGameButton.addEventListener('click', gameFlow.resetGame );
                _removeBoardListeners();
            } else {
                _activePlayer = _switchActivePlayer(_activePlayer);
            }

            if( _activePlayer.marker === 'o' &&  gameFlow.vsComputer ){
                _makeComputerMove();
            } else {
                console.log( 'test' );
            }

        }

    }


    const _checkForTie = () => {

        let result = true;

        for (let i = 0; i < _boardArray.length; i++){

            for(let y = 0; y < _boardArray[i].length; y++){

                if( _boardArray[i][y] === "" ){

                    result = false;

                }

            }

        }

        return result;

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


    const _makeComputerMove = () => {

        const randomPositionX = Math.round( Math.random() * 2);
        const randomPositionY = Math.round( Math.random() * 2);

        if( _boardArray[randomPositionX][randomPositionY] !== "" ){
            _makeComputerMove();
        } else {

            const randomCell = document.querySelector(`.board-cell[data-position-x="${randomPositionX}"][data-position-y="${randomPositionY}"]`);

            randomCell.click();

        }

    }


    // reset the board to play again
    const _playAgain = () => {

        _boardArray = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];

        _activePlayer = _setActivePlayer(_player1);

        _messages.innerText = '';
        _postGameButtons.classList.add('hidden');

        displayBoard();
        setBoardListeners();

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


    const resetGameBoard = () => {

        _player1 = {};
        _player2 = {};

        _boardArray = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];        

        _board.innerText = '';

        _messages.innerText = '';
        _postGameButtons.classList.add('hidden');

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
        resetGameBoard,
        setBoardListeners
    }

})();


const gameFlow = (() => {

    // Private variables/functions
    const _formContent = document.querySelector('#form-content');
    const _player2NameWrap = document.querySelector('#player-2-input-wrap');
    const _preGameContent = document.querySelector('#pre-game-content');
    const _startButtons = document.querySelectorAll('.start-game');


    const _startGame = (e) => {

        // console.log(e.target.getAttribute('id'));

        if( e.target.getAttribute('id') === 'start-computer' ) {

            const player2Name = document.querySelector('#player-2-name');

            player2Name.value = 'The Computer';
            _player2NameWrap.classList.add('hidden');

            gameFlow.vsComputer = true;

        }

        const playerForm = document.querySelector('#player-form');

        _preGameContent.classList.add('hidden');
        _formContent.classList.remove('hidden');resetGameButton

        playerForm.addEventListener('submit', _submitPlayerForm);

    }


    const _submitPlayerForm = (e) => {

        e.preventDefault();

        _formContent.classList.add('hidden');

        const player1NameValue = document.querySelector('#player-1-name').value;
        const player2NameValue = document.querySelector('#player-2-name').value;

        gameBoard.createPlayers(player1NameValue, player2NameValue);
        gameBoard.displayBoard();
        gameBoard.setBoardListeners();

        document.querySelector('#player-1-name').value = '';
        document.querySelector('#player-2-name').value = '';

    }

    // Public variables/functions

    let vsComputer = false;
    
    const resetGameButton = document.querySelector('#reset');

    
    const resetGame = () => {

        gameBoard.resetGameBoard();

        gameFlow.vsComputer = false;

        _player2NameWrap.classList.remove('hidden');

        _preGameContent.classList.remove('hidden');

    }


    const setupGame = () => {

        _startButtons.forEach( (startButton) => {
            startButton.addEventListener('click', _startGame);
        });

    }


    return {
        resetGameButton,
        resetGame,
        setupGame,
        vsComputer
    }

})();
gameFlow.setupGame();

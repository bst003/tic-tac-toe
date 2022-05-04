/*

create a module for the game board (gameBoard)
    use a multi-dimensional array to represent the game board cells
    create a function to display the game board cells
        loop through array items and get total length
        add that many divs to #board
        add x and y data attributes to board cells (can be later used to mark location)

create a factory function to create the players (Players)
    must take in value for marker
    must take in value for player name

create a module to control the flow of the game (gameFlow)
    start game on start button click
    Create player objects from form
    change active player
    control reset game button


Questions?
    What module/function should control how marks are added to the boardArray?
        leaning towards gameBoard as it houses the board element and boardArray
        seems like gameFlow should be for higher level stuff(start, reset, enter names, etc);
    How to check for winning values?

*/

const gameBoard = (() => {

    const _board = document.querySelector('#board');

    let boardArray = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    const displayBoard = () => {

        for (let i = 0; i < boardArray.length; i++){

            for(let y = 0; y < boardArray[i].length; y++){

                let cell = document.createElement('div');
                cell.setAttribute('class', 'board-cell');
                cell.setAttribute('data-position-x', i);
                cell.setAttribute('data-position-y', y);

                cell.innerText = boardArray[i][y];

                _board.appendChild(cell);

            }

        }

    }

    return{
        boardArray,
        displayBoard
    }

})();
gameBoard.displayBoard();
console.log(gameBoard.boardArray);


const gameFlow = (() => {

    return {

    }

})();


const Player = (marker) => {

    const getMarker = () => marker;

    return {
        getMarker
    }

};

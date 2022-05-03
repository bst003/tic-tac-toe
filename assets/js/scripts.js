/*

create a module for the game board
    use an array to represent the game board cells
    create a function to display the game board cells
        loop through array items and get total length
        add that many divs to #board
        add x and y data attributes to board cells (can be later used to mark location)

create a factory function to create the players
    must take in value for marker

create a module to control the flow of the game
    start game on start button click
    take in player names
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

    return{
        boardArray
    }

})();
console.log(gameBoard.boardArray)


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

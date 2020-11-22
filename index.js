const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
    let button = new five.Button(5);

    button.on('press', () => {
        console.log('press');
    });

    button.on('release', () => {
        console.log('release');
    });

    button.on('hold', () => {
        console.log('hold');
    });

});
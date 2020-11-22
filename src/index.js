const five = require('johnny-five');
const board = new five.Board();

const codes = {
    A: '·−',
    B: '−···',
    C: '−·−·',
    D: '−··',
    E: '·',
    F: '··−·',
    G: '−−·',
    H: '····',
    I: '··',
    J: '·−−−',
    K: '−·−',
    L: '·−··',
    M: '−−',
    N: '−·',
    O: '−−−',
    P: '·−−·',
    Q: '−−·−',
    R: '·−·',
    S: '···',
    T: '−',
    U: '··−',
    V: '···−',
    W: '·−−',
    X: '−··−',
    Y: '−·−−',
    Z: '−−··'
};

let letter = [];
let word = [];

board.on('ready', () => {
    let button = new five.Button(5);
    let count = Date.now();

    button.on('press', () => {
        if (checkBrake(count)) {
            console.log('long');
            word.push(convertLetter(letter.join('')));
            letter = [];
            letter.push('·');
        } else {
            console.log('short');
            letter.push('·');
        }
    });

    button.on('hold', () => {
        letter.pop();
        letter.push('−');
    });

    button.on('release', () => {
        count = Date.now();
        console.log(`word: ${word.join('')}`);
        console.log(`letter ${letter.join('')}`);
    });
});

function checkBrake(time) {
    return (time !== 0 && Date.now() - time < 1000) ? false : true;
}

function convertLetter(letter) {
    for (const [key, value] of Object.entries(codes)) {
        if (letter === value) return key;
    }
}
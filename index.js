const chalk = require('chalk')

/**
 * generate a smooth unicode progress bar in CLI using block characters
 *
 * @param {number} value
 * @param {number} max 
 * @param {number=10}len 
 * @return {string}
 */
function print_bar(value, max, len) {
    if (typeof len == 'undefined') len = 10;

    const BLOCKS = ['▉', '▊', '▋', '▌', '▍', '▎','▏'];
    const VALUES = [7/8, 3/4, 5/8, 1/2, 3/8, 1/3, 1/8];

    let print_len = (value / max) * len;
    
    let block_count = Math.floor(print_len);
    if (! print_len) return ' '.repeat(len);
    else if (block_count === len) return '█'.repeat(len);

    let out = '█'.repeat(block_count);

    let remain = print_len - Math.floor(print_len);
    if (! remain) return out + ' '.repeat(len - block_count);

    for (let i = 0; i < VALUES.length; i++) {
        if (remain >= VALUES[i] ) 
            return out + BLOCKS[i] + ' '.repeat(len - block_count - 1);
    }
    return out + ' '.repeat(len - block_count);

}

async function main() {

    function sleep(n) {
        return new Promise(resolve => {
            setTimeout(resolve, n);
        });
    }
    for (let i = 0; i <= 100; ++i) {
        let erase = i === 0 ? "" : '\u001b[A\u001b[K';
        console.log(erase + "now loading [" + print_bar(i, 100, 10) + "]");
        await sleep(20);
    }

    for (let i = 0; i <= 100; ++i) {
        let color = i === 100 ? chalk.greenBright : chalk.yellowBright.bgBlackBright;
        let erase = i === 0 ? "" : '\u001b[A\u001b[K';
        console.log(erase + "with colour  " + color(print_bar(i, 100, 10)) + " " + i + "%" ); 
        await sleep(20);
    }

    for (let i = 0; i <= 100; ++i) {
        let color = chalk.hsl(i, 100, 50).bgBlackBright;
        let erase = i === 0 ? "" : '\u001b[A\u001b[K';
        console.log(erase + "fancy colour " + color(print_bar(i, 100, 10)) + " " + i + "%" ); 
        await sleep(20);
    }
    
}

return main();

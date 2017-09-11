/* Node.js implementation of divide and conquer algorithm for inversions */

'use strict';

 const fs = require('fs');
 const readline = require('readline');

 const arr = [];
 const rl = readline.createInterface({
	 input: fs.createReadStream('test.txt')
 });

 rl.on('line', (line) => {
	 arr.push(line);
 });

 rl.on('close', () => {
	 countInversions(arr);
 });

function countInversions(arr) {
	let n = arr.length;
	if(n <= 1) return 0;

	let mid = n / 2;
	let l = arr.slice(0, mid);
	let r = arr.slice(mid);
}

function merge() {

}
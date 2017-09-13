/* Node.js implementation of divide and conquer algorithm for inversions */

'use strict';

const fs = require('fs');
const readline = require('readline');

const arr = [];
const rl = readline.createInterface({
	input: fs.createReadStream('integers.txt')
});

rl.on('line', (line) => {
	arr.push(line);
});

rl.on('close', () => {
	let inv = new Inversion();
	inv.countInv(arr);
	console.log(inv.count)
});

class Inversion {
	constructor() {
		this.count = 0;
	}
	 
	countInv(arr) {
		let len = arr.length;
		if(len === 1) return arr;

		let mid = Math.floor(len / 2);
		let l = arr.slice(0, mid);
		let r = arr.slice(mid);

		let sortedL = this.countInv(l);
		let sortedR = this.countInv(r);

		return this.merge(sortedL, sortedR);
	}

	merge(l, r) {
		let sortedArr = [];
		let lLen = l.length;
		let rLen = r.length;
		let i = 0;
		let j = 0;

		while(i < lLen && j < rLen) {
			if(Number(l[i]) < Number(r[j])) {
				sortedArr.push(l[i]);
				i++;
			} else {
				sortedArr.push(r[j]);
				// Black magic is here
				this.count += l.slice(i).length;
				j++;
			}
		}

		let restL = l.slice(i);
		let restR = r.slice(j);
		return sortedArr.concat(restL).concat(restR);
	}
}

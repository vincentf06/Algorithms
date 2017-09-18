/* Counting comparisons in quick sort */

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
	console.log(arr)
});

class QuickSort {
	constructor() {
		this.comparisons = 0;
	}

	quickSort(arr, lInd, rInd) {
		let len = arr.length;
		if(len === 1 ) return;

		let parInd = this._partition(arr, lInd, rInd);
		
		quickSort(arr, lInd, parInd - 1);
		quickSort(arr, parInd + 1, rInd);
	}

	_partition(arr, lInd, rInd) {
		let pivotInd = lInd;
		let i = pivotInd + 1;
		let j = pivotInd + 1;
	}
}
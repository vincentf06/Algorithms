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
	let sorter = new QuickSort();
	sorter.sort(arr, 0, 9999);
	console.log(sorter.comparisons);
});

class QuickSort {
	constructor() {
		this.comparisons = 0;
	}

	sort(arr, lInd, rInd) {
		let len = rInd - lInd + 1;
		if(len < 2 ) return;

		let pivotInd = lInd;
		let parInd = this._partition(arr, lInd, rInd, pivotInd);
		
		this.sort(arr, lInd, parInd - 1);
		this.sort(arr, parInd + 1, rInd);
	}

	_partition(arr, lInd, rInd, pivotInd) {
		let i = pivotInd + 1;
		let j = pivotInd + 1;

		while(j <= rInd) {
			if(Number(arr[j]) < Number(arr[pivotInd])) {
				[arr[i], arr[j]] = [arr[j], arr[i]];
				i++;
			}

			j++;
		}

		[arr[pivotInd], arr[i - 1]] = [arr[i - 1], arr[pivotInd]];
		this.comparisons += rInd - lInd;
		return i - 1;
	}
}
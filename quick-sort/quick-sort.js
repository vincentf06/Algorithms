/** 	
 * 	Counting comparisons in quick sort
 * 	Use the "median-of-three" pivot rule
 *
 * 	@author Vincent Fu
 */

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

    let pivotInd = this._choosePivot(arr, lInd, rInd);
    // exchange pivot element with first element of sub array
    [arr[pivotInd], arr[lInd]] = [arr[lInd], arr[pivotInd]];
    let parInd = this._partition(arr, lInd, rInd, lInd);
    
    this.sort(arr, lInd, parInd - 1);
    this.sort(arr, parInd + 1, rInd);
  }

  _choosePivot(arr, lInd, rInd) {
    // Choose the first one if there are only two entries
    if(rInd - lInd + 1 === 2) return lInd;
    
    let midInd = Math.floor((rInd + lInd) / 2);
    let indices = Array.of(lInd, midInd, rInd);
    let values = indices.map(ind => arr[ind]);

    for(let ind of indices) {
      if(arr[ind] > Math.min(...values) && arr[ind] < Math.max(...values)) {
        return ind;
      }
    }
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

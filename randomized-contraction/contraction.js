/* Karger's algorithm */
/* Find the minimum cut on a undirected graph */

'use strict';

const fs = require('fs');
const readline = require('readline');

const adjacencyList = [];
const rl = readline.createInterface({
	input: fs.createReadStream('graph.txt'),
});

rl.on('line', (line) => {
	var list = line.split('\t');
	list.shift();
	adjacencyList.push(list);
});

rl.on('close', () => {
	console.log(adjacencyList);
})

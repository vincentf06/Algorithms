/* Computing strongly connected components of a directed graph */
/* There are more than 800,000 vertices and 5,000,000 edges in the graph */
/* Memery management need to be very careful */
/* Adajcency list is used to represent the graph */
/* Kosaraju’s Two-Pass algorithm is used to find SCCs */
/* Stack is used to implement DFS */

'use strict';

const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const graph = [];
const rl = createInterface({
	input: createReadStream('directed-graph.txt')
});

rl.on('line', (line) => {
	const list = line.split(' ');
	// Remove the last entry which is a space
	list.pop();
	graph.push(list);
});

rl.on('close', () => {
	console.log(graph)
});
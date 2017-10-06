/* Computing strongly connected components of a directed graph */
/* There are more than 800,000 vertices and 5,000,000 edges in the graph */
/* Memery management need to be very careful */
/* Adajcency list is used to represent the graph */
/* Kosaraju’s Two-Pass algorithm is used to find SCCs */
/* Stack is used to implement DFS */

'use strict';

const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const clone = require('clone');

const graph = [];
const thisList = {
	tail: null,
	heads: [],
};

const rl = createInterface({
	input: createReadStream('graph.txt')
});

rl.on('line', (line) => {
	const list = line.split(' ');
	const [tail, head] = list;

	if(tail !== thisList.tail) {
		if(thisList.tail) graph.push(clone(thisList));

		thisList.tail = tail;
		thisList.heads = [head];
	} else {
		thisList.heads.push(head);
	}
});

rl.on('close', () => {
	console.log(graph)
});
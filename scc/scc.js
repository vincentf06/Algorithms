/* Computing strongly connected components of a directed graph */
/* There are more than 800,000 vertices and 5,000,000 edges in the graph */
/* Memery management need to be very careful */
/* Adajcency list is used to represent the graph */
/* Kosaraju’s Two-Pass algorithm is used to find SCCs */
/* Recursive DFS will cause stack overflow because of the size of the graph */
/* Stack is used to implement DFS */

'use strict';

const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const clone = require('clone');

const graph = [];
const reversedGraph = [];
const thisList = {
	tail: null,
	heads: [],
};

const rl = createInterface({
	input: createReadStream('test.txt')
});

rl.on('line', (line) => {
	const list = line.split(' ');
	const [tail, head] = list;

	// Build graph
	if(tail !== thisList.tail) {
		if(thisList.tail) graph.push(clone(thisList));

		thisList.tail = tail;
		thisList.heads = [head];
	} else {
		thisList.heads.push(head);
	}

	// Build reversed graph
	const reversedList = reversedGraph.find(list => list.tail === head);
	if(!reversedList) {
		reversedGraph.push({tail: head, heads: [tail]});
	} else {
		reversedList.heads.push(tail);
	}
});

rl.on('close', () => {
	console.log(reversedGraph)
});
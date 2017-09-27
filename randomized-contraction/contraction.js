/* Karger's algorithm */
/* Find the minimum cut on a undirected graph */

'use strict';

const fs = require('fs');
const readline = require('readline');


const adjacencyList = [];
const edges = [];
const rl = readline.createInterface({
	input: fs.createReadStream('graph.txt'),
});

rl.on('line', (line) => {
	const list = line.split('\t');
	// The last entry is an empty string, remove it.
	list.pop();
	const v = list.shift();
	adjacencyList.push(list);

	for(let u of list) {
		const edge = [v, u];
		edges.push(edge);
	}

});

rl.on('close', () => {
	const minCut = getMinCut(adjacencyList, edges);
	// console.log(minCut);
});

function getMinCut(adjacencyList, edges) {
	if(adjacencyList.length === 2) return;

	const edge = getRandomEdge(edges);
	console.log(edge);
	removeEdge(edges, edge);
}

function getRandomEdge(edges) {
	const index = Math.floor(Math.random() * edges.length);
	return edges[index];
}

function removeEdge(edges, edge) {
	
}
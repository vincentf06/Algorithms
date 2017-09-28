/* Karger's min cut algorithm */
/* Store edges separately to make sure edge pick is uniformly at random */

'use strict';

const fs = require('fs');
const readline = require('readline');


const adjacencyList = [];
const edges = [];
const rl = readline.createInterface({
	input: fs.createReadStream('test.txt'),
});

rl.on('line', (line) => {
	const list = line.split('\t');
	// The last entry is a tab, remove it.
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
});

function getMinCut(adjacencyList, edges) {
	if(adjacencyList.length === 2) return console.log(adjacencyList);

	const thisEdge = getRandomEdge(edges);
	console.log(thisEdge);
	removeSelectedEdge(edges, thisEdge);
	contract(adjacencyList, thisEdge);
	// console.log(adjacencyList)
	getMinCut(adjacencyList, edges);
}

function getRandomEdge(edges) {
	const index = Math.floor(Math.random() * edges.length);
	return edges[index];
}

// Remove an edge from edge list when it's chosen
function removeSelectedEdge(edges, thisEdge) {
	let index = edges.indexOf(thisEdge);
	edges.splice(index, 1);

	for(let [thisIndex, edge] of edges.entries()) {
		if((edge[0] === thisEdge[0] && edge[1] === thisEdge[1]) || (edge[0] === thisEdge[1] && edge[1] === thisEdge[0])) {
			index = thisIndex;
			break;
		}
	}

	edges.splice(index, 1);
}

function contract(adjacencyList, edge) {
	const vertex_1 = adjacencyList[edge[0] - 1];
	const vertex_2 = adjacencyList[edge[1] - 1];

	// Merge vertex_1 to vertex 2
	for(let e of vertex_1) {
		if(e !== edge[1]) {
			vertex_2.push(e);
			adjacencyList[e - 1].push(edge[1]);
		}
	}

	// Remove the first vertex after merging
	adjacencyList.splice(edge[0] - 1, 1);
}
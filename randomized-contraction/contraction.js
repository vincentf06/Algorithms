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
	adjacencyList.push(list);

	const u = list[0];
	for(let [index, v] of list.entries()) {
		if(index === 0) continue;

		const edge = [u, v];
		edges.push(edge);
	}
});

rl.on('close', () => {
	const minCut = getMinCut(adjacencyList, edges);
});

function getMinCut(adjacencyList, edges) {
	if(adjacencyList.length === 2) return;

	const thisEdge = getRandomEdge(edges);
	// console.log(thisEdge);
	removeSelectedEdge(edges, thisEdge);
	contract(adjacencyList, edges, thisEdge);
	getMinCut(adjacencyList, edges);
}

function getRandomEdge(edges) {
	const index = Math.floor(Math.random() * edges.length);
	return edges[index];
}

// Remove an edge from edge list when it's chosen
function removeSelectedEdge(edges, thisEdge) {
	console.log(thisEdge)
	let index = edges.indexOf(thisEdge);
	edges.splice(index, 1);
	// console.log(edges)
	for(let [thisIndex, edge] of edges.entries()) {
		if((edge[0] === thisEdge[0] && edge[1] === thisEdge[1]) || (edge[0] === thisEdge[1] && edge[1] === thisEdge[0])) {
			index = thisIndex;
			break;
		}
	}
	console.log(edges[index])
	edges.splice(index, 1);
}

function contract(adjacencyList, edges, thisEdge) {
	let u = thisEdge[0];
	let v = thisEdge[1];
	let vertex_1 = null;
	let vertex_2 = null;
	let vertexIndex_1 = null;
	
	for(let [index ,list] of adjacencyList.entries()) {
		if(list[0] === u) {
			vertex_1 = list;
			vertexIndex_1 = index;
		} else if(list[0] === v) {
			vertex_2 = list;
		}
	}

	// Merge vertex_1 to vertex 2
	for(let [index, e] of vertex_1.entries()) {
		if(index === 0) continue;

		if(e !== v) {
			vertex_2.push(e);
			
			for(let list of adjacencyList) {
				if(list[0] === e) {
					for(let [index, e] of list.entries()) {
						if(index === 0) continue;
						if(e === u) list[index] = v;
					}
				}
			}
		}
	}

	// Remove self-loops
	for(let i = vertex_2.length; i > 0; i--) {
		if(vertex_2[i] === u) vertex_2.splice(i, 1);
	}

	// Remove the first vertex after merging
	adjacencyList.splice(vertexIndex_1, 1);

	// update edge list
	for(let edge of edges) {
		if(edge[0] === u) {
			edge[0] = v;
		} else if(edge[1] === u) {
			edge[1] = v;
		}
	}

	// console.log(edges)
}
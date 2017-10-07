/* Karger's min cut algorithm */
/* Store edges separately to make sure edge pick is uniformly at random */
/* TODO: Merge some loops to decrease the constant of time complexity */

'use strict';

const fs = require('fs');
const readline = require('readline');

const adjacencyLists = [];
const edges = [];
const rl = readline.createInterface({
	input: fs.createReadStream('graph.txt'),
});

rl.on('line', (line) => {
	const list = line.split('\t');
	// The last entry is a tab, remove it.
	list.pop();
	adjacencyLists.push(list);

	const u = list[0];
	for(let [index, v] of list.entries()) {
		if(index === 0) continue;

		const edge = [u, v];
		edges.push(edge);
	}
});

rl.on('close', () => {
	const minCut = getMinCut(adjacencyLists, edges);
	console.log(minCut);
});

function getMinCut(adjacencyLists, edges) {
	if(adjacencyLists.length === 2) {
		return adjacencyLists[0].length - 1;
	}

	const chosenEdge = getRandomEdge(edges);
	removeSelectedEdge(edges, chosenEdge);
	contract(adjacencyLists, edges, chosenEdge);
	const minCut = getMinCut(adjacencyLists, edges);
	return minCut;
}

function getRandomEdge(edges) {
	const index = Math.floor(Math.random() * edges.length);
	return edges[index];
}

// Remove an edge from edge list when it's chosen
function removeSelectedEdge(edges, chosenEdge) {
	for(let i = edges.length - 1; i >= 0; i--) {
		if((edges[i][0] === chosenEdge[0] && edges[i][1] === chosenEdge[1]) || (edges[i][0] === chosenEdge[0] && edges[i][1] === chosenEdge[1])) {
			edges.splice(i, 1);
		}
	}

	// update edge list
	for(let edge of edges) {
		if(edge[0] === chosenEdge[0]) {
			edge[0] = chosenEdge[1];
		} else if(edge[1] === chosenEdge[0]) {
			edge[1] = chosenEdge[1];
		}
	}

	// Remove self-loops in edge list
	// TODO: Can be merged in above steps
	for(let i = edges.length - 1; i >= 0; i--) {
		if(edges[i][0] === edges[i][1]) {
			edges.splice(i, 1);
		}
	}
}

function contract(adjacencyLists, edges, chosenEdge) {
	let [u, v] = chosenEdge;
	let vertex_1 = null;
	let vertex_2 = null;
	let vertexIndex_1 = null;
	
	for(let [index ,list] of adjacencyLists.entries()) {
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
			
			for(let list of adjacencyLists) {
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
	adjacencyLists.splice(vertexIndex_1, 1);
}

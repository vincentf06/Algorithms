/* Computing strongly connected components of a directed graph */
/* There are more than 800,000 vertices and 5,000,000 edges in the graph */
/* Memery management need to be very careful */
/* Adajcency list is used to represent the graph */
/* Kosaraju’s Two-Pass algorithm is used to find SCCs */
/* Recursive DFS will cause stack overflow because of the size of the graph */
/* Stack is used to implement DFS */
/* TODO: do the first pass on original graph instead of constructing the reverse graph */

'use strict';

const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const clone = require('clone');

const graph = [];
const reverseGraph = [];

const rl = createInterface({
	input: createReadStream('test.txt')
});

rl.on('line', (line) => {
	const list = line.split(' ');
	const [tail, head] = list;

	// Construct original graph
	if(!graph[tail]) {
		graph[tail] = {heads: [head], visited: false};
	} else {
		graph[tail].heads.push(head);
	}

	// Construct reverse graph
	if(!reverseGraph[head]) {
		reverseGraph[head] = {heads: [tail], visited: false};
	} else {
		reverseGraph[head].heads.push(tail);
	}
});

rl.on('close', () => {
	const sccCaculator = new SccCaculator(graph, reverseGraph);
	sccCaculator.traverse(false);
});

class SccCaculator {
	constructor(graph, reverseGraph) {
		this.graph = graph;
		this.reverseGraph = reverseGraph;
		this.finishingTime = 0;
		this.leaders = [];
		this.stack = [];
	}

	traverse(forward) {
		const graph = forward ? this.graph : this.reverseGraph;
		
		for(let i = 0; i < graph.length; i++) {
			if(graph[i] && !graph[i].visited) {
				this.leaders.push(i);
				this._dfs(i, graph);
			}
		}
		console.log(graph, this.stack)
	}

	_dfs(index, graph) {
		console.log(graph, index)
		const heads = graph[index].heads;
		this.stack.push(index);

		for(let j = 0; j < heads.length; j++) {
			if(!graph[heads[j]].visited && heads[j] !== index) {
				this.stack.push(j);
				this._dfs(j, graph);
			}
		}
	}
}
/**
 * Computing strongly connected components of a directed graph.
 * There are more than 800,000 vertices and 5,000,000 edges in the graph.
 * Memery management need to be very careful.
 * Adajcency list is used to represent the graph.
 * Kosaraju’s Two-Pass algorithm is used to find SCCs.
 * Use --stack-size to increase maximum stack size when running the programme,
 * to avoid stack overflow issue caused by the recursive DFS algorithm
 * @todo do the first pass on original graph instead of constructing the reverse graph. 
 * 
 * @author Vincent Fu
 */ 

'use strict';

const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const graph = [];
const reverseGraph = [];

const rl = createInterface({
	input: createReadStream('graph.txt')
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
		console.log(graph, this.stack);
	}

	_dfs(index, graph) {
		graph[index].visited = true;
		this.stack.push(index);

		const heads = graph[index].heads;
		const headsLen = heads.length;
		for(let j = 0; j < headsLen; j++) {
			const head = heads[j];
			if(graph[head] && !graph[head].visited && head !== index) {
				this._dfs(head, graph);
			}
		}
	}
}
/* Karger's algorithm */
/* Find the minimum cut on a undirected graph */

'use strict';

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
	input: fs.createReadStream('kargerMinCut.txt'),
});
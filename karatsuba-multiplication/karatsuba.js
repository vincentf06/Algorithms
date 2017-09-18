/* Node.js implementation of Karatsuba multiplication */
/* Using big-Integer for addition and subtraction only */

'use strict';

const bigInt = require('big-Integer');

const x = '3141592653589793238462643383279502884197169399375105820974944592';
const y = '2718281828459045235360287471352662497757247093699959574966967627';

function multiply(x, y) {
	let nx = x.length;
	let ny = y.length;
	if (nx === 1 && ny === 1) {
		return String(Number(x) * Number(y));
	}

	// Pad 0 in the front when x or/and y is odd number
	while (nx % 2 === 1 || ny % 2 === 1 || nx !== ny) {
		if (nx > ny) {
			y = '0' + y;
			ny++;
		} else if (nx < ny) {
			x = '0' + x;
			nx++;
		} else {
			x = '0' + x;
			y = '0' + y;
			nx++;
			ny++;
		}
	}

	let n = x.length;
	let mid = n / 2;
	let a = x.slice(0, mid);
	let b = x.slice(mid);
	let c = y.slice(0, mid);
	let d = y.slice(mid);

	let ac = multiply(a, c);
	let bd = multiply(b, d);
	// Gauss's trick
	let temp = multiply(bigInt(a).add(b).toString(), bigInt(c).add(d).toString());
	let adbc = bigInt(temp).minus(ac).minus(bd).toString();

	return add(ac, bd, adbc, n);
}

function add(ac, bd, adbc, n) {
	let halfn = n / 2;
	while (n >= 1) {
		ac += '0';
		n--;
	}

	while (halfn >= 1) {
		adbc += '0';
		halfn--;
	}

	return bigInt(ac).add(adbc).add(bd).toString();
}

let result = multiply(x, y);
console.log(result);

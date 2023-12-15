'use strict'

let x = [ 11653, 19783, 19241, 16531, 12737, 14363 ];
let q = 2;
let factor = 1;

out: while (1)
{
	debugger;
	let div = true;
	for (let i = 0; i < x.length; i++)
	{
		if(x[i] % q != 0)
		{
			div = false;
			break;
		}
	}

	if (div == true)
	{
		for (let i = 0; i < x.length; i++)
		{
			x[i] /= q;
		}
		factor *= q;
		continue;
	}

	q++;

	for (let i = 0; i < x.length; i++)
	{
		if (q >= x[i])
			break out;

	}

	if (q % 10 == 0)
		console.log(q);
}

console.log(x, factor);

console.log(x.reduce((a, c)=>a * c) * factor)

// 33865167419 too low

let a = 3725;
let b = 115952;

// 2

let c = 87330;
let d = c + a;
let e = 0

console.log(d, c, e)

// 4

e = c + b;
c = e + c;
d = c + a;

console.log(d, c, e)

// 6

e = e + b;
c = e + c;
d = c + a;

console.log(d, c, e)


// 202300
for (let i = 8; i <= 202300; i+=2)
{
	e = e + b;
	c = e + c;
	d = c + a;
}

console.log(d)

// 594805224635525 too high
// 594811105091925 xxxxxx
// 593174122420825
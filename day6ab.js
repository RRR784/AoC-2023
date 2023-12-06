let go = () => 
{
	let dx;
	let speed = 0;
	let acc = 1; // +1 mm/ms^2
	let result = [];
	for (let i = 0; i < time.length; i++)
	{
		result.push([]);
		let t = time[i];
		let d = distance[i];
		for (let j = 0; j <= t; j++)
		{
			//dx = 0.5 * j * j
			let v = j;
			let t2 = t - j;
			let dx = v * t2;
			if (dx > d)
			{
				result[i].push([j, dx]);
			}
		}
	}
	//console.log(result.map(el=>el.length));
	console.log(result.map(el=>el.length).reduce((a, c)=>a*c));
}

//Time:        46     85     75     82
//Distance:   208   1412   1257   1410
let time = [46857582];
//time = [71530];
let distance = [208141212571410];
//distance = [940200];

go();
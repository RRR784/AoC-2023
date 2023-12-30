let go = () => {
	data = data.split("\n").map(el=>el.split(""));
	// data.forEach(el=>console.log(el.join("")));

	let data2 = [];
	let poses = [];
	let counts = [1];

	let pos;
	for(let y = 0; y < data.length; y++)
	{
		data2[y] = [];
		for(let x = 0; x < data[0].length; x++)	
		{
			data2[y][x] = 0;
			if (data[y][x] == "S")
			{
				pos = [x, y];
				data[y][x] = ".";
				data2[y][x] = 1;
			}
		}
	}
	poses.push(pos);

	let i = 0;
	while(1)
	{
		while(poses.length)
		{
			let cur_pos = poses.shift();
			let x = cur_pos[0];
			let y = cur_pos[1];
			if (x-1 >= 0 && data[y][x-1] == ".")
			{
				data2[y][x-1] = "O"
			}
			if (y-1 >= 0 && data[y-1][x] == ".")
			{
				data2[y-1][x] = "O"
			}
			if (x+1 < data[0].length && data[y][x+1] == ".")
			{
				data2[y][x+1] = "O"
			}
			if (y+1 < data.length && data[y+1][x] == ".")
			{
				data2[y+1][x] = "O"
			}
		}

		// console.log()
		// data2.forEach(el=>console.log(el.join("")));

		for(let y = 0; y < data.length; y++)
		{
			for(let x = 0; x < data[0].length; x++)	
			{
				if (data2[y][x] == "O")
				{
					data2[y][x] = "_"
					poses.push([x, y])
				}
			}
		}

		console.log(poses.length, counts[i-2])

		if (i == 64)
			break;

		counts.push(poses.length);
		i++;
	}

	//
	//console.log(pos)
	console.log(poses.length)
	counts.forEach((el, ix)=>console.log(ix, el))
}

let data00 = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

let data = `...................................................................................................................................
.#..#.......#....#.......#.#.....#......#..#.#.........#..............#............#......#........#...##........#..#.....#........
..#......#.###....#........#..#....##..#................#................#...........#..........##.#.#....#....#.....#....#...##.#.
.......#....#..#..#...#........#.....#.............##.....#.............#.#.........##......##.#.......#...#...#...........#.##.##.
....#...#......#.#.##.....#.#..##..#..........#.#..##.....................#............#....##............#......#.........#....#..
......#...#..##...#...#.....#......##.#......#..##.#..##.....................#.......##......##.......##.......#..#.....#.....#....
.#...#...#....#.......#..#.#...##.....#..#..##.....#........................#....#............#....#.....#.....#.#...#...........#.
..#..........#..###............#...###.##..#..#....##.........#...................##.#.......#......#......#.........#.............
..................#.#.#...#..#..#..#.#............##............................#......................###...#.....##.........#....
............#....................#...........#.....................#.#........#..#.....#...#...#......#.#.#...#.......#......##....
..##.#........#..#...#........#..#...#..#....#.#..................................#..#.............#..#.#..#....##...........##.#..
.....##.#......#..###.............#.#....##..................#......#..##...............#....#.....#..........#........#...........
...#.#.......##......##.#.###..##.........#.....#...................#...#................#.##....#..........#.#.......#.#......#...
.#..#.#.....#.....##...#.............#....#...............#...##..........#...............................#......#.....##..........
........#................#..##......#....###..#...........#.#.......#....#..................##...#.................#.#.....#...#...
..#..#......#.#.#.......................#.#...................#.....##.#..............#...........#....#.....#....#...##..#........
...#.#....#.##.......#..........#............#..............#.#.#.##........#.................#.#....#....##....#......#......#....
.#.....#...#.#.#.#......#.#.#......#.#.#............#....#........#........#............#.............#.#..###....#..##.....#......
..#.......#..#....#......#..#....#.................#....#.......#...#....#.....................#.##............##...............##.
.#...##.....#..#..#.....#............#.#..............#.......#.....#..#..#.#..#.........#.##....#...###..###.....#.....#.....##.#.
.....#.....#.#....##.#.....#.....#.....................##.....#.................#..............#.#..#.#......#.......#.....#.......
.....#.#.....#........................................##....#............#......#..............#..................#..##.#.......#..
.............#.#...##..............#....................#..........#..#...#.#.#..............#...#....##.....#.........#....#.##...
.......#.........#....###..............................#......##..........#....#................#....#.#.........#....#.......#....
..#...#....#.........#..............##...........#..#.#....#....#.##....#...........................#..............#....#....###...
.........###.......#...........#....#.........#..#...##...............#........#..##............#.#..#....#...#.#.......#......##..
....#.....##..#................#........................#......#.....#...#.....##..............#......#..###.......#.......#.#.#...
..##.#.....#..................................##.....#...##.....#.##.....#.#.......................#....#....##..........#.....#...
...#.#..#.......#.......#.#...##..................#.##....#....#........#.#......#.#...#...........#......#....#.#..#.....#.#....#.
.#......#........#.#.#.......#...........#....#....#.....#....##............#.....................#...............#....#...#.#.....
...##..............###.#....#..#........#..#..#.......#.##.....#.....#..#......#...##..##............#....##......#.#.##...#.......
........#...#............##............##......#..###.......................##..#.#.....#...........#.#.#.......#.#........#.#.#...
.............##........#....##.................##..#..............................#.#.....#..#...................#...............#.
....#....#.....#.......##.###..........#...##.....##...#........#...................#....#.##.............#.#....#.#.....#.....#...
....#...##.......#...##.................#..##............##....##.....#...........#.#.#................#..#..#...#.............#...
....##...........#...####.........#.............#..##............................#....##.#...#...............#...#...#....#........
...................#...##............#....#.#....#..........#.#......###...................#.#...#........##......#....#.........#.
....#..#...#..##.....#..#.......#...#..#.........#.#..###...........#..#..##...#.......#.....#....#...................#.........#..
..#.........#....#..#.............#...#...#.........#...#..........#...#...#.....##........................#.......##...#........#.
...#.....#...#.....#.............##...........#..#.##....#.#..............###.#.##.....#..........##...............#....#...#..##..
..##..............#.#..........#..##.#.#.......#......##...#.#.....##....#....#.#....#......#.......#..............##.........#..#.
.......###.####................#...........##....#......##...#.............###...........#......#...#.#...........#.........#......
...#.#......#..#............#.#.....#......#...........#...............#.#.....#............#.......#....................#....#....
......#....#..................#...................##..........#....#.#.......................#...................##......#.#..#....
.....##........#..........#.....#.........#....##.....###..........#..#.....#....#.......#....#.....................#.......#......
.#......#...#.............#..............................##..#.#..##....#..............#.#......#............................#.....
......##.....................#..............##..#...................##....#............#...#...#..#..#...............##..........#.
.##.#..#.....#........##.......##.............##.......#.#..........#........##.....#..#.#........#..#.....##........#.#..#........
.#..###...............#...##........##......#.#..##..#....#.......##..#.....##.....#..........#.#..#....#.............#........#...
...#......##..........#..#..##.##.....#....#.#...............##.......#.#.............#.............##..#.#.............#........#.
............................#......#....#...##.......#..##.....#.............##...####..#.....#......#.#.##........................
........#.#.......#...#..#.....#.........#.......#...#....#...#...##...#...#........#..#..........##.#.............................
........................#..........#..#....##........#.........##...........##..........#.#.#.#...#.....#.#..............#...#..#..
...#..#..........##...#...###..............##......#...........##.##..#...#.......#....#......#...........#.#...............#......
...##...........#..........##...#..#.#.......#....#.#.#.......#.......#.....#........#.......#.......#.#........#............#.....
.#............#....##........#........####.#..##......#......#..#.......#........#...#....#......#....#.....#......#...............
.....#...........#..........#.....#..#..#...#...............#.......#.......#.#............#....#...#..............................
.#................#....#..............##...#....#...##.#..##.........................#................##.#........##...............
.#...........#..#.#.....##.........##..#.#.#....#....#......##..........#.....................#.....#.......##...##..............#.
.#........#.##.#..#.#...###.#..........#....#......#..............................#..#.#.##...#..#...#.....#...##...#...#..........
............#.#.....#.####......#......##...#.#.........#..#........#..........#....#.#..##.#.#.#..............#...#..#..#.......#.
........#..#..#.....#..#....#.##...................#...#....##..#.#..#...##..#...#...................#......#...#...#.##...........
.......#............##...#.#....#..#........#.........##...............#...#..#...........#..#...#.......#......#..........#.......
............#...........#.#....#....#..##.........#.#..#................#.#.#.......#..#.....##........................###.........
.....#..#...#.....#.#......#..##......#....##...#..#....#............#.........#......#.....#..#....#.##...........#.##............
.................................................................S.................................................................
........#...............#..........#.#.......##...#...#.......#.#..........#.#.....#.....##.......#.......#...#.......#..#.........
...........#.........#...#.............#......#..#.#.#.#...................#...#...#.......#...#........#.#........#....#...#......
.......##...........#................#...#..#..........#....#.#.#...###...#.............##..#....#.#...#.........#.......###.......
............#...........##..#........#....##.....#............#..........#...#....#..#.......##.......#...#...#......##..#.........
..........#....#.............#...#.....#....#.....#..#..#.......#....#..#.............#..#...........#..##...#....#.#.#............
..............#.......#.......#..#......#..............#...........#.##..###..####...#..................#.#..#..#..#.#..........##.
.#...........#...#.......#..#.....#.....#....##......#..........#..#..#.........#...#..#...........................................
...#...........#.#.#.....#.#.#...##..#...#.....#..........#.....#.......#.........#.....#.#...#.....#......#.........##.........#..
...................##.........#.....#..#...#.##...#..........##........#.................#...#..#....#.......#...............#.....
....................#..##.......#.......#......#..................#.#.....#...####.....#............#...#...#.###................#.
.......................#...#.....#.......#..#..#.......#..............#.....#.#....#..#..#...................#...............#.....
.....#...................#.......#.....##......#..#.#..#...............#...#............#.....#..........#.#..#...#.............#..
...................#.........#..........#.....##..#....#......#........#.....#....##.........#.........#....#..................#...
......#...............#.#.................#.#..##..#....##........#..........#...#...##......#..........#......#........#........#.
..#.#.......................#.....#.#..........####.................#.....#....#...##.#.....##.#...........................##......
.........#........................#...........#...#.##..................#.#.......##...#.#..#..............#...................#.#.
..##.#..#.#..........#..#..#..#....#...........##.#.....##.#..#.#.......................#...#.....#..#.................###..##.....
.#..#.#...............#..........................#.......##..#....#......#.....#...#....#.......#....##..#......................##.
.....#........#.............#..#.........#....#.#.#....##.......#.#.......#............................#..................#.##.#...
....#.##.#..............#......#..#....#...............#...###..........#.#......##.#...#.#.#.#.#........#.........#.....#....##...
.....#.#.#..#.............#..............#...#...#..##..#....#..#.....#.#.....#...#..........##..........#.............#..#..#.....
..#...#..##.....#............#..#.#......#..#....#....#.....................#.....#.................#.##.........#......#..........
.......#..#.##..#..#................##.................#..#........#........#...#.....#...........#.............#....#..........##.
.......#.......................#......#..........##...#.#......#..##........#.....#......#....#................##...#..............
.....#.....##....#............#.#........#............#.#......#.........#....#.............##..#..#...............#...#.#...##.##.
...#....#.##.........#..................#.........#......#.....##.###....#.#...#...#.##...#..................#.....#....#.#...#....
.....##.........#.....#...........#...........#.........#.........#.#..##.#.......##.........##............##.......#....#.........
....................#...........#........#.#....#........#.........#.....#...#...#....#..........#........#.#......#........#......
..............#..#................#.......#....#.#.........#......#.......#.....................................#.....##..#........
......#...#.#...#............................#........#..#...........................#...#.##..........................#.#.........
...........#..##.#...#...#.......................#..#.....................#.............#..#.............#.#.#..#.#..#.............
.......#............................#.....#.#..#.#..#.#..............#.............#..#....................#........#.......#....#.
.#...##..###.#..#....#.....#.#...............#.............#......#....#....#...#........#............#.##.....#....#...#........#.
.....##........#..#......#.#.##...........#............#.......#...#...#............#.....#.................#........#.#..#.#......
...#.....#.#..#......#.##.................#.#..#.......##.........................##...............#...#...#......#......##........
..#....#.......#.#...#....#..###.................#...#...#.##........#..#.#..#...#...#................#.....#.....#.#....#.##..##..
......#.....#.#.#.........................#..#.#...#...#................#....#...#...#..#.................#....##.......#.#..#.....
..#...........#.......#....................#.....#...#.#...............#.#....##...#...............#....#........#.#.##.##..#.#.#..
.#...#.............#..###.......#...........#.......................#....###..#..#..............#....#..#....#......##..#.#........
..................#.............#.................#.........##....##..#.............#...........#...............#...#........#.#...
..#.....###.#.#.....#.#.............#......................#....#.....#............#..............#..#...........#..............#..
.##......#..#..##.......#..##......#...............#...#.............#.##...#...............#........#...#..#.................#....
...#.#...##.#..#...##.#.#..........#...#.........#.#......#..#.......#........#..#...........#.................###.................
.......................##......#..............................#.........#....#..................#..#...#..#.......#.......##.......
....#...#.....#.............#...#.................#.#...#..........##....#..##.................#......#..#............##...........
.........#..........#......#.......#.......................##.##..............................#....##.........#.....###........#.#.
....#.#.#.............#.....#..............#........#.................#..#..............#...........#.....#........#..##...........
......##.#......#....#..#.......###.......#.............#.........#...#....#..#....................#.......#.##.#.##.....##....#...
..#.....#.....##..#.....#...#....#....#.#..............#.#....##.......#.#.#..........................#.#.#.#.##..........#..#.....
...............#.#.###.......###.#...........#........#...###............#..#.......#...##.......##...#........#...................
.....#.........#.#.#..............##.........##............##...#...#...................#..###..........#..#..#.#...#..#...........
........#......#........##.#.....#.#...#....#...#.............#.........#.#.......#.....#.......##...#....#.........#.....#..#.....
.##......#..........#......#............#.....................##...#..............#...............##.............##...#.#..........
...#..#..#.#..#......#.......##.......#.....#................#...................#............#.........#.........#.........##.##..
....#...#........##.#........#..#.#.....#.........................##.#.............#...#.#..........#..#...........................
.........#..#..#.....##.......##......#..#...#..............#....................##...#......##......#...#.#........##.............
..#....#..#..#.#......#......#...................#.##........#.#.....#.............##.....#.......................##...........#...
.#.#..#........#.....#..#...........#.##....................................#...........##..................#...........##.........
..........#..#.............#..#......#..##.##.....#...#.........#.............................#.#...#....................#.....#...
.#..........#..#.#.#.#..#..#..#....#..#.......#........##..................#..#.#....#......#.......#.##.......#.#......###........
............#........#....#..#.#...#..##..#..#..#........................#....##......##........#.....##.....#.......#.......###.#.
...#.#........................#......#..............#...............................#.#..#..###...................#.....#..........
..#....#.....#......#.#.....#..##......#..#..##.....#.....#.....................#............#..#...#.#..##....##..#...#.......#...
.#..#.................................#....#.....#.....................#...#...#.#.........#.#...#..#.....#...................#....
...................................................................................................................................`;

go();
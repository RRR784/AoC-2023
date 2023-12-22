
let all_founds = [];

let bfs = (map, x, y) => 
{

	let h = map.length;
	let w = map[0].length;

	let map2 = [];
	for (let j = 0; j < h; j++)
	{
		map2[j] = [];
		for (let i = 0; i < w; i++)
		{
			map2[j].push(Infinity);
		}
	}

	let queue=[];

	map2[y][x] = 0;

	let founds = [];

	let do_bfs = (xs, ys, count) => 
	{

		if (count + 1 < map2[ys][xs])
		{
			map2[ys][xs] = count + 1
		}
		else
		{
			return
		}

		if (xs - 1 >= 0)
			queue.push([xs - 1, ys, count+1]);
		if (ys - 1 >= 0)
			queue.push([xs, ys - 1, count+1]);
		if (xs + 1 < w)
			queue.push([xs + 1, ys, count+1]);
		if (ys + 1 < h)
			queue.push([xs, ys + 1, count+1]);
	}

	if (x - 1 >= 0)
		queue.push([x - 1, y, 0]);
	if (y - 1 >= 0)
		queue.push([x, y - 1, 0]);
	if (x + 1 < w)
		queue.push([x + 1, y, 0]);
	if (y + 1 < h)
		queue.push([x, y + 1, 0]);


	while(queue.length)
	{
		let next = queue.shift();
		do_bfs(...next);
	}

	//map2.forEach(el=>console.log(el.join("")));
	//console.log(founds);
	//all_founds.push(...founds);

	for (let y = 0; y < h; y++)
	{
		for (let x = 0; x < w; x++)
		{
			if (map[y][x] == "#")
			{
				debugger;
				founds.push(Number(map2[y][x]))
			}
		}
	}
	console.log(founds);
	
	console.log(map2.map(el => el.map(el2=>String(el2).padStart(2, "_")).join(",")));

	// for(let i = 0; i < map2.length; i++)
	// {
	// 	console.log(map2[i].join(","))
	// }

	all_founds.push(...founds);
}



let go = () => 
{
	data = data.split("\n").map(el=>el.split(""));
	for(let i = 0; i < data.length; i++)
	{
		let empty = true;
		for(let j = 0; j < data[0].length; j++)
		{
			if (data[i][j] != ".")
			{
				empty = false;
				break;
			}
		}
		if (empty)
		{
			data.splice(i, 0, [])
			for(let j = 0; j < data[0].length; j++)
			{
				data[i].push(".")
			}
			i++;
		}
	}
	for(let i = 0; i < data[0].length; i++)
	{
		let empty = true;
		for(let j = 0; j < data.length; j++)
		{
			if (data[j][i] != ".")
			{
				empty = false;
				break;
			}
		}
		if (empty)
		{
			for(let j = 0; j < data.length; j++)
			{
				data[j].splice(i, 0, ".")
			}
			i++;
		}
	}

	for(let j = 0; j < data.length; j++)
	{
		for(let i = 0; i < data[0].length; i++)
		{
			if (data[j][i] == "#")
			{
				bfs(data, i, j);
			}
		}
	}

	console.log(all_founds.reduce((a, c) => a + c) / 2);

}

let data2 = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

let data = `..............................#.........................#.......................#..............................#.........................#..
....#.....#...................................#.............................................................................................
.....................................#..................................#...................................................................
...................................................#....................................................................#...................
...............................................................#..................#...............................#.........................
...............#.......................................#...................................#.....#.......#.........................#........
............................................................................................................................................
............................................................................#...............................................................
.......#.......................#....................#.......................................................................................
........................#..................#....................................................................#...........................
..#.......................................................#.........#....................#....................................#.............
..............#...........................................................#..........................................................#......
......................................#...........................................#..........................#..............................
.....................................................#.........#..........................................................................#.
#.......#....................................#.................................................#............................................
..............................#.......................................#..............#....................#..........#......................
....#...................................#...................................................................................................
....................................................................................................#.......................................
.....................#...........#...............................................#..................................................#.......
...............................................#.........#..................................................#..................#............
..........................................................................#...............#........................#........................
.................#.......................................................................................................#..................
......................................................................................#..................#..............................#...
.............#...................................................................................#..........................................
#...........................#..........#....................................................................................................
.........#........................................................................#...............................#.........................
.....................#.........................#.....................................................#....................#......#..........
.....................................................................#......................................................................
................................#.....................................................................................................#.....
...............#..........................................#.................#................#..............................................
....................................#...........................#...........................................#...............................
.......#...................#................#.......................................#..............................#......................#.
......................#.................................................#................................................#..................
....................................................#......................................#............#...................................
.............#........................#..........................................................#.............#............................
...................#..............................................................#.........................................................
.........................................................#..................#..........#....................................................
........................#.....................#..............................................#.........................................#....
.................................................................#.........................................#...................#............
...................................................#........#.....................................#......................#..................
.........#....................#.......#................................................................#............#.......................
#.............................................................................#.....................................................#.......
..................#.......#.................................................................................................................
.............#........................................................#........................#................#..........#..............#.
.....................................................#......................................................................................
.......#...............#.................#......................#................#..........................................................
...................................#.....................................................#............................#.....................
............................................................................................................................................
...............................#........................................#.........................#.........................................
.....#.........#...............................#...................#.....................................................................#..
............................................................................................................................................
..........#......................................................................#..........................................................
.........................................#.............................................#......#...................#...................#.....
........................#.....#........................................................................#....................................
...................................................#.....#...................#..............................................................
....................................................................#...............#....................................#........#.........
...........................#..............................................................#.................................................
...#........................................#.........#.......................................................#..............#..............
..........#....................................................#................#...........................................................
..................................#..................................................................................#...............#......
.................#..........................................................................................................................
............................................................................................................................................
............................#.............#................................#.........................#.....................#................
.........#.........................................#............#.........................#............................................#....
....#................................................................#.........................#..............#.............................
...................#......................................#.................................................................................
..............................#......#..............................................#..............#................#.......................
.............................................................................#..............................................................
.......#.........................................................................................................................#..........
..............#............#....................#...................#............#.......#.................................#................
................................#......................#................................................#.................................#.
............................................................................................................................................
.#......................#......................................#...............................................#............................
........................................................................#............................#......................................
..................................................#..........................#..........................................#.......#...........
.........................................#..........................................#....................#..............................#...
......#...............#.................................#...................................................................................
....................................#.......................................................................................................
...............................................................#................#........#.........................#..........#.............
..#........#.....#..........#...................#...................................................#.......................................
.......................................#...........................#...........................................#............................
.............................................................................#..............................................................
.......................#..................................#............#...............#.......#.....................................#......
............................................................................................................................................
............#.....#................................#...........#...................................................#............#...........
...........................................#..............................................#.................................................
..................................#..............................................#.....................#....................................
..................................................................#.........................................................................
...#..........................#............................................#................................................................
.......................................................#..........................................#........#........#.......................
.......................................#.................................................................................#......#...........
.................................................#..........#.........#.......................#.............................................
............................................................................................................................................
....#...........#........................................................................................#.......#...........#..............
......................#...........#.......#....................#..............#.....#.......................................................
.........#...............................................................................#..................................................
..................................................#.........................................................................................
...................#......................................#...........................................#...........................#......#..
.............#..........#.....................#....................#........................................................................
...............................................................................#.....#.....#.................#......#.......................
...#.........................#...................................................................#........................#.................
............................................................................................................................................
.......#.........#..........................................#...............................................................................
.................................#..............................................................................................#...........
........................................................................#..............#.......#..................#........................#
.#...................................#......#......#........................................................................................
............................................................................................................................................
.............#................#............................................................#..............#.................................
......#.....................................................#.......................#................#...............................#......
...................#..............................................#.......................................................#.................
....................................#.....................................#.................................................................
........................................................................................................#.......#...........................
....#.....................................#...............#...................#...............#.........................................#...
.....................................................................................#......................................................
....................................................#...........#......................................................#............#.......
........................#...................................................................................#...............................
............................................................................#.....#.........#......................#........................
...#.....#.....#.......................#....................................................................................................
............................................................................................................................................
......................................................................#.....................................................................
......................................................................................#............#..........................#.............
.....#.............#.........................................................#................#.............................................
..............................#..........#............#.....#...........................................................#.............#.....
........................................................................#................#..................................................
..................................................................................#.........................................................
......................#.............#....................#........................................................#.........................
.................#................................#.............#.............#.............................................................
............................................................................................................................................
...#..........................#.............#....................................................#.......#...............#.........#........
........#...........#.................#..................................................................................................#..
..............#.................................#.....#..........................................................#..........................
...........................................................#......#.........................................................................
............................#..................................................#.....................................#......................
...................................................#.......................................#................................................
.#................#................#...............................................#...........................................#.....#......
.............#....................................................................................................#.........................
.........................#...........................................#.....#......................#..........#..............................
........................................#...................#...........................................#...................................
...#......#............................................................................#....................................................
...............................................#.......................................................................#....................`;

go();
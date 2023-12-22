'use strict';

// find two adjacent identical columns or rows (part 1)

let go = () => {
	data = data.replaceAll("#", 1).replaceAll(".", 0)
	data = data.split("\n\n").map(el=>el.split("\n"))
	let data_t = [];
	for (let z = 0; z < data.length; z++){
		data_t[z] = [];
		for (let x = 0; x < data[z][0].length; x++){
			data_t[z][x] = [""];
		}
		for (let y = 0; y < data[z].length; y++){
			for (let x = 0; x < data[z][y].length; x++){
				data_t[z][x] += data[z][y][x];
			}
		}
	}

	data = data.map(el=>el.map(el2=>parseInt(el2, 3)))
	data_t = data_t.map(el=>el.map(el2=>parseInt(el2, 3)))

	// radix 10 -> 63
	// radix 2 -> 85
	// radix 3 -> OK

	let sums = [];

	let data_mirror = [];
	for (let z = 0; z < data.length; z++){
		data_mirror[z] = [];
		for (let y = 0; y < data[z].length; y++)
		{
			let sum_a = 0;
			let sum_b = 0;
			for(let a = y, b = y+1; a >= 0 && b < data[z].length; a--, b++)
			{
				sum_a += data[z][a];
				sum_b += data[z][b];
				data_mirror[z][y] = sum_a - sum_b;
			}
			if (data_mirror[z][y] === 0)
			{
				sums.push(100 * (y + 1));
				//sums.push([0, z, y + 1]);

			}
		}
	}

	let data_t_mirror = [];
	for (let z = 0; z < data_t.length; z++){
		data_t_mirror[z] = [];
		for (let y = 0; y < data_t[z].length; y++)
		{
			let sum_a = 0;
			let sum_b = 0;
			for(let a = y, b = y+1; a >= 0 && b < data_t[z].length; a--, b++)
			{
				sum_a += data_t[z][a];
				sum_b += data_t[z][b];
				data_t_mirror[z][y] = sum_a - sum_b;
			}
			if (data_t_mirror[z][y] === 0)
			{
				sums.push(y + 1);
				//sums.push([1, z, y + 1]);
			}
		}
	}
	
	//console.log(data.length);
	//sums.sort((a, b)=>b[1] - a[1])
	//sums.forEach((el, ix)=>(console.log(ix, el)))

	console.log(sums.reduce((a, c)=>a+c));
}

// 31664 too high
// 31765

let data2 = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

let data = `#..#.##.#..
###.####.##
###.####.##
###.####.##
###.####.##
#..#.##.#..
.#..#..#..#
..#.####.#.
####....###
..#......#.
.#.........
#...#..#...
####....###
.##......##
#...####...
###.#..#.##
#.########.

..#....#.
..######.
..###.##.
####..###
...####..
###.##.##
##.####.#
...#..#..
..######.

.##......##...#
..########....#
##.#....#.####.
.#...##...#..#.
.##.####.##..##
#.###..###.##.#
....#..#.......
.....##........
##..#..#..####.
...#.##.#......
.##########..##
#.##....##.##.#
.#..####..#..#.

####..#.#####
.#.#.#.#.##..
..#.##....#.#
#...#..##....
###.####.#.#.
..#....#.#..#
..#....#.#..#
###.####.#.#.
#...#..##....
..#.##....#.#
.#.#.#.#.###.
####..#.#####
####..#.#####

.##.####.##.#
#..#.##.#..##
...#.##.#....
#..#....#..#.
#..#....#..#.
...#.##.#....
#..#.##.#..##
.##.####.##.#
.##########.#
####....####.
#.#......#.#.
.##.####.##..
..####.###..#

...#..##..#
#....####..
.#.##.##.##
.#.##.##.##
#....####..
...#..##..#
##.##....#.
####.####.#
#.#..####..

...#..##..#..
..#..####..#.
...###..###..
..##.####.##.
..##......##.
....######...
..##.....###.
######..#####
.....#..#....
##.#.#..#.#.#
...#......#..
....##..##...
..#.######.#.
##.#.####.#.#
...##.##.##..
##.#..##..#.#
..####..####.

#.#..##..#.##
.##.#..#.##..
##..####..###
.#..#..#..#..
..#.#....#...
.#.#.##.#.#..
##..####..###

#.#..#.#.#.
##.....#..#
#.#.####..#
...#...###.
##....###..
#.#.#.....#
.##..#..###
.##..#..###
#.#.#.....#
##....###..
...#...###.
#.######..#
##.....#..#
#.#..#.#.#.
#.#..#.#.#.

##.##.#.######.
....##.........
......##.####.#
....####......#
..##.#.#.#..#.#
.###...#.####.#
###.#.##......#
....###..#..#..
...##.##.#..#.#
..##.##.##..##.
..#..#.#.#..#.#
##.#..###....##
..##..#........
..#.#..........
##.#.#.#..##..#
#####..........
....#.....##...

#....##......##..
########.##.#####
#.##.##..##..##.#
#....#.######.#..
.#..#.##.##.##.#.
.#..#.##....##.#.
.####..##..##..##
.#..#.#.####.#.#.
#.##.##...#..##.#
#######.#..#.####
##..###.#..#.###.
#....##.####.##..
.#..#...#..#...#.

....#..##
..#.#..##
..#.#.##.
..#.#..#.
.......#.
#.....#.#
.#.######
.####..#.
.####..#.
.#.######
#.....#.#
.......#.
..#.#..#.
..#.#.##.
..#.#..##
....#..##
.##.###.#

#.##..#..####
..#..###.#.#.
.##.#.#..##.#
#...#..###...
#...#..###...
.##.#.#..##.#
..#..###.#.#.
#.##..#..####
###.#.###..##
.#.#....###.#
##..##....##.
##..##....###
.#.#....###.#
###.#.###..##
#.##..#..####
..#..###.#.#.
.##.#.#..##.#

####.#.........
####.##..#..#..
....##.#..##..#
.....#..#....#.
.##.#...#....#.
########..##..#
#..###...#..#..
.##.......###..
#..###.###..###
#..#.#.#..##..#
....##..##..##.
.##.##.#..##..#
####.#...####..

#.#.######.
.##.#....#.
##.########
.##.#.##.#.
.##.#.##.#.
##.########
.##.#....#.
#.#.######.
...#..##..#
.#..#..#.#.
.##.#....#.

###...##..##...##
##.#..........#.#
###.#.##..##.#..#
..#...######...#.
..##.##....##.##.
####.#.####.#.###
...#.#.#..#.#.#..
..##.##....##.##.
####..##..##..###
...##..#..#..##..
..###...##...###.

##.##....##...#
.####....####..
#####....####..
#...####.#.....
#..##..####...#
#..##......##..
.##...##..#..##
#.#...#.#.#..##
..##.#..####...
..##.#..####...
#.#...#.#.#..##
.##...##..#..##
#..##......##..
#..##..####...#
#...####.#.....
#####....####..
.####....####..

..#########..
#...##...#..#
#...#.#......
.##..##..#...
.##....##...#
..#..##.##..#
..#..##.##..#
.##....##...#
.##..##..#...
#...#.#......
#...##...#..#
..#########..
.#.......####
#.#.##.#....#
....###......
.......##...#
.......##.#.#

#..#.#..####..#.#
###.#.#......#.#.
..####..#..#..###
###.#.#.#..#.#.#.
..##..#......#..#
...#..######.#..#
##.#..#.#..#.#..#
.##....######....
.####...####...##
#######......####
##....##.##.##...
#.####...##...###
#.####...##...###

....#..
###.##.
#.###..
.#.#.##
.#.#.##
#.###..
###.##.
....#.#
.#.#..#
.#.#..#
....#.#

##..######.#.#.
##..######.#.##
..##...#..#.#.#
#....#..###.#..
#.##.#.#.####.#
.#..#.##.#...#.
..##..##.##..#.
#....###...####
#.##.######....
#.##.#.#..#.#.#
##..##.##.#####

.####...#.#..#.
.##.#..##.##..#
.####..##.##..#
.####...#.#..#.
###.#.#.###....
#.#..#.###..###
#.#..##..#.##..
....#..#..#.##.
#.#.#..#.##.#.#
#.#.#..#.##.#.#
....#..#..#.##.
#.#..##..#.##..
#.#..#.###..###
###.#.#.###....
.####...#.#..#.

##.....
##.....
#..####
#..#.#.
#.#..#.
.#..##.
.#..##.
#.#..#.
#..#.#.
#..#.##
##.....

###.#.###......
.##..#.....#...
.#.#..#.#...###
##.###.#####...
#....#......###
#...####.#..#..
....###.###.#..
#.####.##.##.##
#.####..#.##.##
....###.###.#..
#...####.#..#..
#....#......###
##.###.#####...

#..##.#..####..#.
#...#.#..####..#.
..#.......##.....
.#####..........#
##..#............
.#.#.#..........#
##..##..........#
.##.#.##########.
.#.#....#....#...
##.##.###.##.###.
##.#.####....####
.#.#.##.######.##
###.#.#.######.#.
.#.#.#.########.#
##.##.#.##..##.#.

###.##.#..#.#
..####..###..
###...#..##.#
##.#..##.#.##
##.#..##.#.##
###...#..##.#
..####..###..
###.##.#..#.#
##.##.#.#..#.
..##..##.....
...#..##.....
........##..#
##...#.#.#..#
.##.##.#.#.#.
###...###..#.
###.##.##..#.
##.#....#.#..

#..#...####
#..##.#####
.#.....####
##..#.#####
#..#.##....
.#.####....
#.##.##....
.###.#.####
#..#.##....
##...##....
#...##.....
..##..##..#
..#........
#.##.##....
.##.#.#####

#.#...##.##.#
..#..####..##
#####....##..
#####....##..
.....####..##
#.#...##.##.#
#.#####......
.#.##.#######
##..#.#.####.
###.##..#..#.
....##..####.
##.##........
#..#..###..##
#.##..#..##..
#####..##..##

####.#.#.#..###
.#..#.##..#..#.
##.##.#.##....#
#..##.#.#.....#
#..###..#....#.
#..###..#....#.
#..##.#.#.....#
##.##.#.##....#
.#..#.##..#..#.
####.#.#.##.###
..#.#.#.##.#...
..#.#.#.##.#...
####.#.#.##.###
.#..#.##..#..#.
##.##.#.##....#

#.#...#.##..#.#
....###..####.#
.###.#.#####...
.###.#.#####...
....###..####.#
#.#...#.###.#.#
...#..#.#.#....
..###....#.#.#.
##..##.#....###
##..##.#....###
..###....#.#.#.
...#..#.#.#....
#.#...#.###.#.#
....###..####.#
.###.#.#####...

##.#.#...#..####.
..#.###...#......
...###....#.#..#.
..####..#.##....#
##..#....##.####.
##.#....#...#..#.
###.....##.##..##
##.####.#.###..##
..##..#...#.####.
......#.#.##....#
##.#..#..#.#.##.#
.....#.#...##..##
....###....#....#
#.#.###..##.####.
##.######...####.

.####..#.##
.#####.####
.#.###.####
.####..#.##
.#......#.#
..#...#..##
#..###.##..
##..#..####
#####.#.#..
###..#.####
.###.#....#
.###.#....#
###..#.####
#####.#.#..
##..#..####

...#######.##...#
..#.#..#.#.#####.
##..####..#...##.
##..####..#...##.
..#.#..#.#.#####.
...#######.###..#
..#.#...#..#..#.#
..#.##.....#.##..
##.##..##..##..##
.....#####...#.#.
..#.###.#.##.##..
..#...##.##..##.#
..#..#.##...###..

#..#.#.###...##
#.##...#.###..#
.#.############
.##.....#...###
##.....#...#.#.
...##....#.#..#
..#.....#.#.#..
..#.....#.#.#..
..###....#.#..#
##.....#...#.#.
.##.....#...###
.#.############
#.##...#.###..#
#..#.#.###...##
#..#.#.###...##

.#.##.#....####..
#......#.########
###..####...##...
#..###.###......#
.##..##....#..#..
.#....#.#.#....#.
#.####.#....##...

##.##..##..
##.##..##..
...#.######
##..##..##.
.#.....#...
.#.######.#
.##....##.#
.##....##.#
.#.######..
.#.....#...
##..##..##.
...#.######
##.##..##..

..##...#..#....#.
..#.....##.....#.
..#..##.##.##..#.
..#...##..##...#.
#####..#..#..####
..#..#......#..#.
...##........##..
####..##..##..###
..#..#.####.#..#.

...##....#.
.....#.#..#
....#...#.#
########...
..####.##..
.#####...##
###.###.##.
###.###.##.
.###.#...##
..####.##..
########...
....#...#.#
.....#.#..#
...##....#.
##..#.#####
.......##.#
.......##.#

.#...#...###.#.##
##...#####.#.##..
.####....##.###..
##.#..##.###..#..
#.##.##.##....##.
#.###..#...##..##
..##..#######..##
..##..#######..##
#.###..#...##..##
#.##.##.##....##.
##.#..##.###..#..
.####....##.####.
##...#####.#.##..
.#...#...###.#.##
.#...#...###.#.##
##...#####.#.##..
.####....##.####.

#####....##
##.##.##.##
..#.#.#..#.
..#..####..
..###.##.##
...#.####.#
####......#
##.#.#..#.#
####......#
###.######.
...#..##..#
##.........
..##..##..#
....#.##.#.
####.#..#.#

#.######.######
.##....##.####.
.#..##..#.####.
##..##..###..##
#..#..#..######
##..##..##....#
###....########
.#.####.#......
#.#....########
###....###....#
##.####.##....#

##########..#..
.######.####...
.#.##.#.###.###
.######...#.#..
#..##..#.#....#
##....##.##.###
#..##..#.###..#
#..##..#.#.###.
#..##..#.#.###.
#..##..#.###..#
##....##.##.###
#..##..#.#....#
.######...###..
.#.##.#.###.###
.######.####...

...#####.##.#####
...#####.##.#####
...#..#.#..#.#..#
#...#..#....#..#.
####.####..####.#
#.#....#.##.#....
##.#...######.#.#

#####..####
###.###....
.......####
....#######
..#.###....
.#.#..#....
.######....
#....#..##.
.#..###....
.###.##....
#####.#####
#.#....####
###.#.#....
..##.#.....
.#..#..####

..#..#.
#####.#
..#.##.
#####..
..###.#
......#
##..#..
###..##
######.
#####..
###..##

......#...##.#.
#####.##.####..
...#.#.####.##.
...#.#.####.##.
#####.##.#####.
......#...##.#.
##.#.#.##..#..#
...#..#.#....#.
#...##.#.##..#.
.#...#..#.#####
.....###.##.##.
.....###.##.##.
.#...#..#.#####

..#.##.#..#.#
##...........
##.##.#....#.
..#.....##...
...#.##....##
..###.#....#.
##.#..######.
....###...###
##.####.##.##
####..#....#.
.....#......#

.##.##.####.#
##..####..###
.#..###.##.##
##.#..#.##.#.
#.##.#.####.#
.##.....##...
####.........
.###.###..###
.#...#..##..#
..#....#..#..
###.#.#....#.
.#..####..###
##..####..###

.##....#.##
.##.#.#.###
#####.##.##
....###.#..
.##..#..#..
#.###..#...
#..#.###...
.##..#..###
######.....

###..##..##..
..##.###....#
#..#..#.#..#.
..###.#..##..
.#...##.#..#.
.#...##.#..#.
..###.#..##..
#..#..#.#..#.
..##.###....#
.##..##..##..
..##.........
..##.##.#..#.
##.#...######
....#########
....#...#..#.

.#.#..#.#...#
..##..##....#
..##..##....#
.#.#..#.#..##
##..##..###..
............#
#.##..##.##..
.#.#..#.#..#.
#..####..#.#.
..#....#...##
.#......#.##.

.#...#.##
#..#.##..
#..#..###
#..#...##
######.##
#####....
#..##.#..
.##...#..
######.##
.##....##
....#####
....##...
.##.##...
.......##
#######..
.##.#.#..
######.##

.####..##..##
.#..#.####.#.
.####.#..#.##
#....#.##.#..
#....#....#..
.####.####..#
..##........#
..##..#..#..#
.#..#......#.
#....######..
######.##.###

###..###..#....
.##..##.....##.
##.##.###.#.##.
........#......
#.#..#.#..#####
.#.##.#.#...##.
..####....#.##.
##....###.#....
..#..#...######
..#..#...#.....
..#..#..##..##.
...##...##.#..#
.######.#......
#########.####.
.#.##.#.##.####
##.##.##.......
##....##.##.##.

######..#
...#.###.
.#.....##
.#.....##
...#.##..
######..#
######..#

...#.#...#...
...#.#...#...
###.###.#.##.
....#.####.##
.....##..#..#
##..#..##..##
....##....##.
..##......###
##...#...#..#
#....#.##....
#....#.#.....

###..#.#..#
...#.##..##
##..#..##..
##.#....##.
###..#...##
..##..###..
..#.....#..
...##.##..#
..####..##.
.....#.##..
..###.#.#..
..#.#.#..##
..#.#.#..##
..###.#.#..
....##.##..

.....##..#.
#..#.#...##
....###..##
.....####..
.##.##.#.##
.....#.###.
.....#....#
#..##...###
####...####
####.#....#
######..###
#..##.##.##
#####..####
#####..#..#
#####..#.##

#.....###.#
#.###...#..
#.###...#..
#..#..###.#
##.##.#..#.
#####.#...#
.#.###.####
#.##.###...
..#..#..#..
.#...##.#..
.#...##.#..
..#..#..#..
#.##.###...
.#.###.####
#####.#...#
##.##.#..#.
#..#..###.#

...#..#.#..
##.##....##
..#..##.###
.....#.#.##
..##...####
##.....#..#
####..#.##.
...#.###...
##...#..###
###.###.#.#
##..##.##..
..#...#.#.#
..#..##..#.
..#.#..#...
..#.#..#...
..#...#..#.
..#...#.#.#

....#..#.#..##.
####.#.#....###
#..#.###.#...#.
.##.####.####..
.......#.....##
#..#..##..#.#..
####....##..#.#
....##....##.#.
####.#.#...####
#..#.#.####.###
#######.#.#####
####.#..###..##
####.#..###..##
#######.#.#####
#..#.#.########
####.#.#...####
....##....##.#.

.#..##....#.###
#..##.#..##.#..
##.##.#..##.#..
.#..##....#.###
###.###.##.#..#
.#..##.##..###.
##.#.##.####...
##.#.##.####...
.#..##.##..###.
###.###.##.#..#
.#..##....#.###
##.##.#..##.#..
#..##.#..##.#..
.#..##....#.###
#.#..###..###.#
#.###.#..#.##.#
.##..#.#...#..#

..#......
...#.....
..#.#..##
...###.##
...###.##
..#.#..##
...#.....
..#......
##.#####.
##...#..#
.#..#....
##.#...##
###.##.#.
...###..#
......#..
.....#..#
...##..#.

...#...#..##..#.#
......#..###...##
#.##.####.####.##
.######.#....#...
...###.##..#....#
...###.##..#.....
.######.#....#...
#.##.####.####.##
......#..###...##
...#...#..##..#.#
....#...##..###.#
..#.###.##......#
..#.###.##......#

###.####....#
...##.#.#..#.
###..#...##..
..#.#########
.###.#..#..#.
#.#..........
.#.##.#.####.
....###..##..
..#.#..#....#
..#.#..#....#
....###..##..
.#.##.#.####.
###..........

##..#...###..
.####.#..#.##
..##...#..###
..##....###..
........#####
##..####.....
#######......
#....###...##
#######.#####
#######.###..
..##..###..##
######.......
..##...###.##
.####.##...##
..##....##...
#.##.#.....##
.#..#.#.#####

#####.#.#
#.#.##...
#.#.##...
#####.#.#
##.######
###..##.#
...####..
..#.###..
..#.##...

....##.###.
####.......
#..#.....#.
....#.####.
#..####.###
#..##...#.#
#..##.#.#.#

####..###...###
######.....##..
######.#.#..#.#
######.##.#.##.
#####....#...#.
.....#.##.###..
....#..####.##.
#######.##.....
#####.##.#.#.#.
......#..#..#..
####.#..#.##...
....#....#....#
..........##...
####..###....#.
#..#####.#.....

.#.##...#......
#.#..#..#......
....#.#..######
.#..#.#..######
#.#..#..#......
.#.##...#......
..##.#.#.#.##.#
#...#..#.#....#
..#.#.#.##.##.#

######.#.##.#..
....####.#.#.#.
##.#.#..#.###..
..###.#....###.
..#..#.....##.#
##.#.###....#.#
..##.#.#.......
...##..####.##.
...####..#.##..
###.#####.###..
#########.###..
...####..#.##..
...##..####.##.
..##.#.#.......
##.#.###....#.#

.#.######...#.###
...#....#...##...
##.#....#.###.#..
#.#.####.#.#.####
#..........#...##
..#.####.#..###.#
#..........#.#...
#...#..#...#..##.
###..##..######.#
#.##....##.##.###
.##.####.##.#.#.#
.....##.....#..##
#..#.##.#..#.##.#
#..#.##.#..#.##.#
.....##.....#..##

##..#####.#.#
####...#.#.##
####...#.#.##
##..#######.#
..##..#######
##..#........
##.###....#.#
##....####.#.
..###...#####
###.#####.###
...#.####.#..
##.##...#...#
..#..##....##
...##...###.#
..##.#...#.#.
##.###.#..##.
####..##..#..

.##.###.#.##.#..#
.##...#..##.#####
####...#...#..##.
####.......######
#.##.##.###.#.##.
....##.####..####
......#..########
.....#.###..#.##.
.##.#..#######..#
.##......###..##.
.....###.##.##..#
####....#..#.#..#
####...#.#.#.....
#..#....#..######
....##.##.###.##.
#..###.#...##.##.
.##.#...#########

..####...#.#..#
########.......
#......##.##.##
##....##..#.##.
.#.##.#.....###
#.####.###.####
#.####.#####..#
##....###.#.##.
........###.###
#########...#..
#########......

########.####
#.#..#.#.....
...##....####
###..###.#..#
.#.##.#.#.##.
#......###.##
########.....
##.##.##..##.
###..###.####

#######...#....
.##..#..##.#..#
#..######.#####
#..#...#.##...#
.....#..##...##
.##.#....#..#.#
.....##.#....##
.##...#...#...#
.##...#...#...#
.....##.#....##
.##.#....#..#.#
.....#..##..###
#..#...#.##...#
#..######.#####
.##..#..##.#..#

.###...
##....#
##.#..#
.###...
...####
.#..#..
##....#
#####.#
.##..##
...##.#
.#.....
.#.....
...##.#
.##..##
#####.#
##....#
.#..#..

#..#....#..##
#..#....#..##
.#........#.#
.#.##..##.#..
.##.#..#.#..#
..#.#..#.#..#
#####..#####.
#.########.#.
.#.##..##.#.#

#.##..##.
....#....
....#....
#.#...##.
.##.###..
##..#..##
##..#..##

.##...##...
##.##....##
#..########
#..########
#####....##
.##...##...
....##..##.
..#..#..#..
#..########
#.#........
.###..##..#
#...######.
..#..####..

#..#...#.###...#.
#....###.#..#..##
..###.##.#...#...
..##.####..#..###
.#..###...##.####
#..####.##.##.#.#
##.####.##.##.#.#
.#..###...##.####
..##.####..#..###
..###.##.#...#...
#....###.#..#..##
#..#...#.###...#.
#..#...#.###...#.
#....###.#..#..##
..###.##.#...#...
..##.####..#..###
.#..###...##.####

##.....#.
##.....#.
.....##.#
##...#.##
#........
.#.....##
...##....
.##.#....
.#....#.#
.#....#.#
.##.#....
...##....
.#.....##
#........
##...#..#
.....##.#
##.....#.

##.#..##.#..#.##.
.#.##.#.#.##.#.#.
##.#####..##..###
#.#.####.####.###
###.#.#.#.##.#.#.
...###..#.##.#..#
#..#.###.#..#.###
#..#.###.#..#.###
...###..#.##.#..#
###.#.#.#.##.#.#.
..#.####.####.###

##..#......##
##.#.#.....#.
#.#####.##.##
#.#####.##.##
##.#.#.....#.
##..#......##
#..#...##..#.
#..##...##...
..###.#.#.##.
..###.#.#.##.
#..##...##...
#..#...##..#.
##..#.#....##
##.#.#.....#.
#.#####.##.##

.##..####..##.###
##.#..##..#.##.##
##.#......#.#####
.##..####..##.###
..#.##..##.#..#..
##.##.##..#.#####
#.##..##..##.#...

#.##..#..##....
.#.##.#.#######
...#...#.#..###
...##.####...##
#.##.#.##.#####
#.##.#.########
...##.####...##
...#...#.#..###
.#.##.#.#######
#.##..#..##....
##...####.###..

#.####..##..#
.....#.######
.#.#.#.#.####
##...##.#.##.
##.##...#.##.
..###..#.#..#
#####.#.##..#
..##..#..####
.##......#..#
.###.....#..#
..##..#..####

.##...#.####....#
#..#..#.#....###.
.#..####.##.#####
#..###.##..#.#..#
.##.#######..####
.##.#######..####
#..###.##..#.#..#

###.##.#..#.#.###
###.##.#..#.#.###
.##.##..###..##..
...#.####.##.##.#
####.#.#..#.##...
....####....#...#
..###.##.#.#...##

#####...##.##
#..##.##..##.
....##..#...#
#.#####....#.
....#....##..
#..#..#...#..
.##....######
.##.###..####
#..#.#...####
........##.##
.##.####..#..
.##..##.###.#
.##..##.###.#

...#.....##...#.#
...#.#.###....#..
..##.###......#.#
..##.###......#.#
...#.#.###....#..
...#.....##...#.#
#...#..##.#...#..
.####.######.....
###.##....#.....#
..##.#.###...#...
####..#...#..##..
..#.#####.###..##
##..#...#....#...
#######...###.#..
#######...###.#..
##..#...#....#...
..#######.###..##

####.#####.##.###
..#..###..#.#####
.#.#.####.##.#..#
#.####..#....#..#
.....#.#.#.###..#
##..#.####.#..##.
..#....#..####..#
.####.#####.#.##.
.####.#####.#.##.
..#....#..####..#
##..#.####.#..##.
.....#.#.#.###..#
#.####..#....#..#

#...####.
...#.##.#
.#..#..#.
#####..##
.####..##
.#..#..#.
...#.##.#
#...####.
#...#..#.
#.#.####.
#.#######

..##..#
###....
....##.
..##..#
....##.
...####
##..##.
###..#.
..#.##.
...#..#
..##..#
...#..#
##.####
####..#
..##..#

###....#...##..
..####..##....#
.####..#.######
####.#.#.#.##.#
#####..####..##
.###.####......
#.#..#.##.#..#.
#######..#.##.#
..#..###.##..##
.#.###.....##..
#...#....######
.###..#.#......
...##.##.#.##.#
...##.##.#.##.#
.####.#.#......
#...#....######
.#.###.....##..

#.#.###..#..#
.##.###.#....
#.###.#......
....##....##.
#.#.#..#.####
...#.#....##.
.#.##.#.#####
...##.#.#####
...#.#....##.

..#.##.#..##..#
#..#..######..#
##..#..###.#..#
###...##...#..#
##.########....
###...#.##.####
..#...##.#..##.

.##..##..##..
####..#..#..#
#..#..#..##.#
.##.#......#.
#######..####
####...##...#
.##....##....
#..#...##...#
.##.##....##.
####.#.##.#.#
....#..##..#.

.##.###
.##.###
.######
##...##
#..#.#.
.##....
.##....
#.#....
...###.
...###.
#.#.#..
.##....
.##....
#..#.#.
##...##`;

go();
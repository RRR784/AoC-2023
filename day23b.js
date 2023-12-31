let go = () => {
	data = data
		.replaceAll(">", ".")
		.replaceAll("<", ".")
		.replaceAll("^", ".")
		.replaceAll("v", ".");
	data = data.split("\n").map(el=>el.split(""));

	let pos = [1, 0]; // starting position, heading south

	let end = [data[0].length - 2, data.length - 1];

	let copy_map = src => {
		let temp = [];
		for (let y = 0; y < src.length; y++)
		{
			temp[y] = [];
			for(let x = 0; x < src[0].length; x++)
			{
				temp[y][x] = src[y][x];
			}
		}
		return temp;
	}

	let print_map = map => {
		map.forEach(el=>console.log(el.join("")));
	}

	let costs = [];

	let take_step = (map, pos, cost) => {

		while(1)
		{
			let x = pos[0];
			let y = pos[1];
			if (y == end[1] && x == end[0])
			{
				costs.push(cost);
				return;
				//print_map(map);
				//console.log(cost+1)
			}

			map[y][x] = "O"
			let x0 = x-1;
			let x1 = x+1;
			let y0 = y-1;
			let y1 = y+1;
			let steps = [];
			if (x0 >= 0 && map[y][x0] == ".") // left
			{
				steps.push([x0, y]);
			}
			// if (y0 >= 0 && map[y0][x] == ".") // up
			// {
			// 	steps.push([x, y0]);	
			// }
			// if (x1 < data[0].length && map[y][x1] == ".") // right
			// {
			// 	steps.push([x1, y]);
			// }
			// if (y1 < data.length && map[y1][x] == ".") // down
			// {
			// 	steps.push([x, y1]);
			// }

			if (steps.length == 0)
			{
				return
			}
			else if (steps.length == 1)
			{
				cost++;
				pos = steps[0];
				continue
			}
			else
			{
				steps.forEach(el=>take_step(copy_map(map), el, cost+1))
				return;
			}
		}
	};

	take_step(copy_map(data), pos, 0)

	console.log(costs);

	let max = 0;
	costs.forEach(el=>max=el>max?el:max);
	console.log(max);

}

let data = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`;

let data00 = `#.###########################################################################################################################################
#.#...#...#...#...#...#.........#.......#...#.......#...###...###...#...#...#...###...#...#...#...#.....###...#...###...#.....#...#...#...###
#.#.#.#.#.#.#.#.#.#.#.#.#######.#.#####.#.#.#.#####.#.#.###.#.###.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.#.###.###.#.#.#.###.#.#.###.#.#.#.#.#.#.###
#.#.#.#.#.#.#.#.#.#.#...#.......#.....#.#.#.#.....#...#...#.#.#...#.#.#...#.#.#...#.#.#.#.#.#.#.#.#.#...#...#.#.#...#.#.#...#.#.#...#...#...#
#.#.#.#.#v#.#.#.#.#.#####.###########.#.#.#.#####.#######.#.#.#.###.#.#####.#.###.#.#.#.#.#.#.#.#.#.#.###.###.#.###.#.#.###.#.#.###########.#
#...#...#.>.#...#...#.....#...#...#...#...#...#...#.......#.#...#...#.#.....#...#.#.#...#.#.#.#.#...#...#...#.#.#...#.#.###.#.#.#...........#
#########v###########.#####.#.#.#.#.#########.#.###.#######.#####.###.#.#######.#.#.#####.#.#.#.#######.###.#.#.#.###.#.###.#.#.#.###########
#...#...#.#...........#...#.#.#.#.#.......#...#...#.#...###.#.....###.#.#...###.#.#.....#.#.#.#.#.......#...#...#...#.#...#.#.#.#.#...#...###
#.#.#.#.#.#.###########.#.#.#.#.#.#######.#.#####.#.#.#.###.#.#######.#.#.#.###.#.#####.#.#.#.#.#.#######.#########.#.###.#.#.#.#.#.#.#.#.###
#.#...#...#...#...###...#...#.#.#.###...#.#.#...#.#.#.#.#...#...>.>.#.#.#.#.#...#.#...#.#.#.#.#.#.#...###.....#####.#.#...#.#.#.#...#...#...#
#.###########.#.#.###.#######.#.#.###.#.#.#.#.#.#.#.#.#.#.#######v#.#.#.#.#.#.###.#.#.#.#.#.#.#.#.#.#.#######.#####.#.#.###.#.#.###########.#
#.........###.#.#...#...#.....#.#.....#.#.#...#.#.#.#.#.#...#.....#...#.#.#.#...#.#.#.#.#.#.#.#.#.#.#.>.>...#.....#...#.....#...#...#.......#
#########.###.#.###.###.#.#####.#######.#.#####.#.#.#.#.###.#.#########.#.#.###.#.#.#.#.#.#.#.#.#.#.###v###.#####.###############.#.#.#######
#####...#.#...#...#...#.#.#...#.......#.#.....#.#.#...#.#...#.#...###...#.#.#...#...#.#.#.#.#...#.#...#...#...#...###...#...###...#.#.......#
#####.#.#.#.#####.###.#.#.#.#.#######.#.#####.#.#.#####.#.###.#.#.###.###.#.#.#######.#.#.#.#####.###.###.###.#.#####.#.#.#.###.###.#######.#
#.....#...#.......###.#.#...#.#.>.>...#.......#...#...#.#...#...#...#.....#.#.#...###...#.#.#.....#...###...#...#.....#...#.....###...#.....#
#.###################.#.#####.#.#v#################.#.#.###.#######.#######.#.#.#.#######.#.#.#####.#######.#####.###################.#.#####
#...........#.........#.#.....#.#...#...###...###...#.#.#...###...#.....#...#...#.......#.#.#.#...#.#.....#.....#...#.............#...#.....#
###########.#.#########.#.#####.###.#.#.###.#.###.###.#.#.#####.#.#####.#.#############.#.#.#.#.#.#.#.###.#####.###.#.###########.#.#######.#
#...........#.....#...#.#.#...#.#...#.#.....#.....#...#.#.#...#.#.......#.>.>.....#.....#.#.#.#.#...#.#...#...#...#.#.#...........#...#.....#
#.###############.#.#.#.#.#.#.#.#.###.#############.###.#.#.#.#.###########v#####.#.#####.#.#.#.#####.#.###.#.###.#.#.#.#############.#.#####
#.........#.....#.#.#.#.#...#...#.....#.....#.....#...#...#.#...#...###...#.....#.#.....#...#...#...#.#.#...#.....#...#.............#.#.....#
#########.#.###.#.#.#.#.###############.###.#.###.###.#####.#####.#.###.#.#####.#.#####.#########.#.#.#.#.#########################.#.#####.#
#.........#.#...#...#...###.....#...###...#.#...#.....#.....#...#.#.....#.#.....#...#...#...###...#...#.#.........#...###...........#...#...#
#.#########.#.#############.###.#.#.#####.#.###.#######.#####.#.#.#######.#.#######.#.###.#.###.#######.#########.#.#.###.#############.#.###
#.......#...#.#...#.....#...#...#.#.#...#.#.....#...###.......#...#.......#.......#...#...#...#.......#.........#...#.#...#...........#.#...#
#######.#.###.#.#.#.###.#.###.###.#.#.#.#.#######.#.###############.#############.#####.#####.#######.#########.#####.#.###.#########.#.###.#
#.......#...#.#.#.#...#.#...#.###.#.#.#.#.###...#.#.....###...#.....#...###.......#...#...#...#...###.#.......#.#.....#.....#.........#.....#
#.#########.#.#.#.###.#.###.#.###.#.#.#.#v###.#.#.#####.###.#.#.#####.#.###.#######.#.###.#.###.#.###.#.#####.#.#.###########v###############
#.........#.#.#.#.#...#...#.#...#.#.#.#.>.>...#.#.#.....#...#.#.......#.#...#...###.#...#.#...#.#...#...#.....#...#...#...#.>.#...#...#...###
#########.#.#.#.#.#.#####.#.###.#.#.#.###v#####.#.#.#####.###.#########.#.###.#.###.###.#.###.#.###.#####.#########.#.#.#.#.#v#.#.#.#.#.#.###
#.........#.#...#.#...###.#.###.#.#...#...###...#.#.#...#...#.#...#.....#...#.#.###.#...#...#.#.#...#...#...###...#.#.#.#.#.#...#.#.#...#...#
#.#########.#####.###.###.#.###.#.#####.#####.###.#.#.#.###.#.#.#.#v#######v#.#.###.#.#####.#.#.#.###.#.###v###.#.#.#.#.#.#.#####.#.#######.#
#.#...#...#.#...#.#...#...#.#...#.#...#.....#.....#.#.#...#.#.#.#.>.>...#.>.>.#...#.#.#...#.#.#.#.#...#...>.>...#.#.#.#.#...###...#.#.......#
#.#.#v#.#.#.#.#.#.#.###.###.#.###.#.#.#####.#######.#.###.#.#.#.###v###.#.#v#####.#.#.#.#.#.#.#.#.#.#######v#####.#.#.#.#######.###.#.#######
#.#.#.>.#.#...#.#...#...#...#.....#.#.#...#.......#.#...#.#.#.#.#...#...#.#.#...#.#.#.#.#.#.#.#.#.#.#.....#.....#...#.#.###...#...#.#.#...###
#.#.#v###.#####.#####.###.#########.#.#.#.#######.#.###.#.#.#.#.#.###.###.#.#.#.#.#.#.#.#.#.#.#.#.#.#.###.#####.#####.#.###.#.###.#.#.#.#.###
#...#...#.......#...#...#...#.......#...#.....#...#.....#...#...#...#.....#...#.#.#.#.#.#...#.#.#.#.#...#.....#.#.....#...#.#.....#.#...#...#
#######.#########.#.###.###.#.###############.#.###################.###########.#.#.#.#.#####.#.#.#.###.#####.#.#.#######.#.#######.#######.#
#.......#.........#...#.#...#.............#...#...#.....###...#...#...#.........#...#...#.....#.#...###.....#.#.#.....#...#.#.......#.....#.#
#.#######.###########.#.#.###############.#.#####.#.###.###.#.#.#.###.#.#################.#####.###########.#.#.#####.#.###.#.#######.###.#.#
#.......#.#.....#.....#...#...#...#.....#.#.......#...#.###.#.#.#...#.#...#...#...#...###.....#.#...........#.#.....#.#.#...#.#.....#...#.#.#
#######.#.#.###.#.#########.#.#.#.#.###.#.###########.#.###.#.#.###.#.###.#.#.#.#.#.#.#######.#.#.###########.#####.#.#.#.###.#.###.###.#.#.#
#.......#.#...#.#.#.....#...#...#...###...#...#.......#.....#.#...#...###...#...#...#.......#...#...........#.......#...#.....#...#.#...#.#.#
#.#######.###.#.#.#.###.#.#################.#.#.#############.###.#########################.###############.#####################.#.#.###.#.#
#...#.....#...#...#.#...#...................#.#.............#...#.#...###...#...............#...#...........###...###...#.........#...#...#.#
###.#.#####.#######.#.#######################.#############.###.#.#.#.###.#.#.###############.#.#.#############.#.###.#.#.#############.###.#
###...#...#.....###.#.#...#...#...........#...#.............###.#...#...#.#...#.....#.........#.#...............#.#...#.#.......#...###.....#
#######.#.#####.###.#.#.#.#.#.#.#########.#.###.###############.#######.#.#####.###.#.#########.#################.#.###.#######.#.#.#########
#####...#.......#...#.#.#.#.#.#.........#...###.............###.......#.#.#...#...#.#...#.......#...........#.....#...#.....###...#.....#...#
#####.###########.###.#.#.#.#.#########.###################.#########.#.#.#.#.###.#.###.#.#######.#########.#.#######.#####.###########.#.#.#
#.....#.....#...#...#.#.#.#.#.#...#.....###...#.....#.......#...#...#...#...#.....#.#...#.......#.........#...#...#...#.....#.......#...#.#.#
#.#####.###.#.#.###.#.#.#.#.#.#.#.#v#######.#.#.###.#.#######.#.#.#.###############.#.#########.#########.#####.#.#.###.#####.#####.#.###.#.#
#.......###.#.#...#.#.#.#.#.#.#.#.>.>.#####.#.#.#...#...#####.#.#.#.###...#...#...#...###.....#.#.....#...#...#.#.#...#.#...#...#...#.....#.#
###########.#.###.#.#.#.#.#.#.#.###v#.#####.#.#.#.#####v#####.#.#.#.###.#.#.#.#.#.#######.###.#.#.###.#v###.#.#.#.###.#.#.#.###v#.#########.#
#...........#...#.#.#.#.#.#.#.#.#...#...#...#.#.#.....>.>.###.#.#.#...#.#.#.#.#.#...#.....###...#...#.>.>.#.#.#.#.#...#.#.#...>.#...#...#...#
#.#############.#.#.#.#.#.#.#.#.#.#####.#.###.#.#######v#.###.#.#.###.#.#.#.#.#.###.#.#############.###v#.#.#.#.#.#.###.#.#####v###.#.#.#.###
#...........#...#.#.#.#.#.#.#...#...###.#.###...#.......#...#.#.#.#...#.#.#.#.#.#...#.....#...#...#.#...#...#...#.#.###...###...###...#...###
###########v#.###.#.#.#.#.#.#######.###.#.#######.#########.#.#.#.#.###.#.#.#.#.#.#######v#.#.#.#.#.#.###########.#.#########.###############
#.......###.>.###.#.#.#.#.#.###...#...#.#.......#.........#.#.#.#.#...#.#.#.#.#.#...#...>.>.#.#.#.#.#...#...#...#...#####...#.#...#...#.....#
#.#####.###v#####.#.#.#.#.#.###.#.###.#.#######.#########.#.#.#.#.###.#.#.#.#.#.###.#.###v###.#.#.#.###.#.#.#.#.#########.#.#.#.#.#.#.#.###.#
#.#...#.....#...#...#...#.#.#...#.....#.........#...#.....#.#.#...#...#.#.#.#.#.#...#.#...###.#.#.#...#...#...#...#.......#.#...#...#...#...#
#.#.#.#######.#.#########.#.#.###################.#.#.#####.#.#####.###.#.#.#.#.#.###.#.#####.#.#.###.###########.#.#######.#############.###
#.#.#.#.......#.........#...#.....#...........#...#.#.....#.#.#.....#...#.#.#.#.#.#...#.....#...#.#...#...........#.#.....#...............###
#.#.#.#.###############.#########.#.#########.#.###.#####.#.#.#.#####.###.#.#.#.#.#.#######.#####.#.###.###########.#.###.###################
#...#.#.#.............#...#.......#.#.........#...#.......#...#.......#...#.#.#.#.#.#.......#...#...###.....#...###...#...#.................#
#####.#.#.###########.###.#.#######.#.###########.#####################.###.#.#.#.#.#.#######.#.###########.#.#.#######.###.###############.#
#.....#.#.........###.....#...#.....#...........#.....#...###.......#...#...#...#...#.........#.#...........#.#.......#.....#.......#.......#
#.#####.#########.###########.#.###############.#####.#.#.###.#####.#.###.#####################.#.###########.#######.#######.#####.#.#######
#.....#.#.........#.....#...#...#...............#####...#.....#.....#...#.#.....................#.............#.......###.....#...#...#.....#
#####.#.#.#########.###.#.#.#####.#############################.#######.#.#.###################################.#########.#####.#.#####.###.#
#...#...#.........#.#...#.#.#...#...............#...............###...#...#.......#.....#...#...#...#.........#.....#.....#...#.#.......#...#
#.#.#############.#.#.###.#.#.#.###############.#.#################.#.###########.#.###.#.#.#.#.#.#.#.#######.#####.#.#####.#.#.#########.###
#.#.............#...#...#.#.#.#.#...#...........#...................#.#.....#.....#.#...#.#.#.#.#.#.#.......#.......#.....#.#...#.....#...###
#.#############.#######.#.#.#.#.#.#.#.###############################.#.###.#.#####.#.###.#.#.#.#.#.#######.#############.#.#####.###.#.#####
#.............#...#.....#.#.#.#.#.#.#.#.........#...............#.....#...#.#.......#.....#...#.#.#.###.....#...###...###...#.....###...#####
#############.###.#.#####.#.#.#.#.#.#.#.#######.#.#############.#.#######.#.###################.#.#.###.#####.#.###.#.#######v###############
#.............###...#...#.#...#...#.#...#.......#.....#...#...#...#...###.#.#...#...###...#.....#.#...#.....#.#.#...#...#...>.#.............#
#.###################.#.#.#########.#####.###########.#.#.#.#.#####.#.###.#.#.#.#.#.###.#.#.#####.###.#####.#.#.#.#####.#.###v#.###########.#
#.....#...#...#...###.#.#...#.......#...#.#...###...#...#...#...#...#...#.#.#.#.#.#.....#...#...#...#.#...#.#.#.#...#...#.###...#...........#
#####.#.#.#.#.#.#.###.#.###.#.#######.#.#v#.#.###.#.###########.#.#####.#.#.#.#.#.###########.#.###.#.#.#.#v#.#.###.#.###.#######.###########
#.....#.#...#.#.#.....#.#...#.#.....#.#.>.>.#...#.#.#...........#.#.....#.#.#.#.#.......#...#.#.#...#.#.#.>.>.#.....#.....#.......#...#...###
#.#####.#####.#.#######.#.###.#.###.#.###v#####.#.#.#v###########.#.#####.#.#.#.#######.#.#.#.#.#.###.#.###v###############.#######.#.#.#.###
#...#...#.....#.......#...#...#.#...#.#...###...#.#.>.>...#.....#.#...###.#.#.#.#...###...#.#.#...###.#...#.#.......###...#.....#...#.#.#.###
###.#.###.###########.#####.###.#.###.#.#####.###.###v###.#.###.#.###.###.#.#.#.#.#.#######.#.#######.###.#.#.#####.###.#.#####.#.###.#.#.###
#...#.#...#...###...#.....#...#.#.....#.#...#...#...#...#...#...#.#...#...#.#.#.#.#.#.....#.#.......#.#...#.#.#.....#...#.......#.#...#.#...#
#.###.#.###.#v###.#.#####.###.#.#######.#.#.###.###.###.#####.###.#.###.###.#.#.#.#.#.###.#.#######.#.#.###.#.#.#####.###########.#.###.###.#
#...#.#...#.#.>...#.......#...#.###...#...#...#.#...###.....#...#.#...#.#...#.#.#.#.#...#...#...#...#...#...#.#.#...#.....#.......#...#.#...#
###.#.###.#.#v#############.###.###.#.#######.#.#.#########.###.#.###.#.#.###.#.#.#.###v#####.#.#.#######.###.#.#.#.#####.#.#########.#.#.###
#...#.###...#...........###.#...#...#.......#.#...#.........###...#...#.#...#.#.#.#...>.>.#...#.#.......#...#.#...#.....#.#.#.........#.#.###
#.###.#################.###.#.###.#########.#.#####.###############.###.###.#.#.#.#####v#.#.###.#######.###.#.#########.#.#.#.#########.#.###
#.....#...#.........#...#...#...#.........#.#.#.....#.....#####...#...#.###.#.#.#.#...#.#.#...#.#...#...#...#.#.........#...#...#...#...#...#
#######.#.#.#######.#.###.#####.#########.#.#.#.#####.###.#####.#.###.#.###.#.#.#.#.#.#.#.###.#.#.#.#.###.###.#.###############.#.#.#.#####.#
#####...#.#...#...#...###.......###.......#...#.....#.###...#...#.#...#...#.#.#.#.#.#...#.....#...#.#.###.....#.........#...###...#.#.#.....#
#####.###.###.#.#.#################.###############.#.#####.#.###.#.#####.#.#.#.#.#.###############.#.#################.#.#.#######.#.#.#####
###...#...###...#.....#.....#.....#.............#...#.###...#.#...#.......#...#.#.#.#.............#...#...###...#.......#.#.#...#...#.#.....#
###.###.#############.#.###.#.###.#############.#.###.###.###.#.###############.#.#.#.###########.#####.#.###.#.#.#######.#.#.#.#.###.#####.#
#...#...###.....#.....#.#...#...#.#...........#.#...#.#...#...#...#.....#.....#...#...#.........#.#.....#.....#...#.....#.#.#.#.#.....#...#.#
#.###.#####.###.#v#####.#.#####.#.#.#########.#.###.#.#.###.#####.#.###.#.###.#########.#######.#.#.###############.###.#.#.#.#.#######v#.#.#
#...#.....#.#...#.>.....#.#...#.#.#.#...#####...###...#.....#...#...#...#.#...#...#...#.......#...#...............#...#...#.#.#.#...#.>.#.#.#
###.#####.#.#.###v#######.#.#.#.#.#.#.#.#####################.#.#####.###.#.###.#.#.#.#######.###################.###.#####.#.#.#.#.#.#v#.#.#
#...#...#...#.#...###.....#.#.#.#.#...#.....#...#...#.......#.#.#...#...#.#...#.#...#.........#...###...........#.#...###...#.#...#...#.#...#
#.###.#.#####.#.#####.#####.#.#.#.#########.#.#.#.#.#.#####.#.#.#.#.###.#.###.#.###############.#.###.#########.#.#.#####.###.#########.#####
#.....#...#...#.#.....#.....#.#.#...###.....#.#.#.#.#...#...#.#...#.....#.#...#.................#...#.....#...#...#.....#.....#.....###...###
#########.#.###.#.#####.#####.#.###.###.#####.#.#.#.###.#.###.###########.#.#######################.#####.#.#.#########.#######.###.#####.###
#.........#.#...#...#...#.....#.#...#...#...#.#...#.###.#.#...#.....#...#.#.###...###...#...........#...#...#.......#...#...###...#.#...#...#
#.#########.#.#####.#.###.#####.#.###.###.#.#.#####.###.#.#.###.###.#.#.#.#.###.#.###.#.#v###########.#.###########.#.###.#.#####.#.#.#.###.#
#.......###.#.....#.#.#...#.....#...#.....#.#.#.....#...#.#.....#...#.#.#.#.#...#.#...#.>.>.#...#...#.#.###...###...#...#.#.......#...#.#...#
#######.###.#####.#.#.#.###.#######.#######.#.#.#####.###.#######.###.#.#.#.#.###.#.#####v#.#.#.#.#.#.#.###.#.###v#####.#.#############.#.###
#.......#...#.....#.#.#...#.#...###...#.....#.#.#...#.#...#...###.###.#.#.#...###...#...#.#.#.#.#.#.#.#.#...#...>.>.#...#.............#.#.###
#.#######.###.#####.#.###.#.#.#.#####.#v#####.#.#.#.#.#.###.#.###v###.#.#.###########.#.#.#.#.#.#.#.#.#.#.#######v#.#.###############.#.#.###
#.......#.....#####.#.###...#.#.#...#.>.>...#.#.#.#.#.#.#...#...>.>.#.#...###...###...#...#...#.#.#...#...#...#...#.#...#.............#...###
#######.###########.#.#######.#.#.#.###v###.#.#.#.#.#.#.#.#######v#.#.#######.#.###.###########.#.#########.#.#.###.###.#.###################
#.....#.........#...#.#...#...#.#.#.#...###.#.#.#.#...#...###.....#...#.......#.....#.........#...#.........#...###.#...#.#.....#...#.......#
#.###.#########.#.###.#.#.#.###.#.#.#.#####.#.#.#.###########.#########.#############.#######.#####.###############.#.###.#.###.#.#.#.#####.#
#...#...........#.....#.#.#...#.#.#.#.....#.#.#.#.###...#...#.........#.#...#.........#.......#...#.#.......#...###...###...###...#...#.....#
###.###################.#.###.#.#.#.#####.#.#.#.#.###.#.#.#.#########.#.#.#.#.#########.#######.#.#.#.#####.#.#.#######################.#####
###.........#...#...###.#.....#.#.#.......#...#.#.#...#...#.###...#...#.#.#.#.#.......#.#...#...#.#...#.....#.#.#...#...###...#.........#####
###########.#.#.#.#.###.#######.#.#############.#.#.#######.###.#.#.###.#.#.#.#.#####.#.#.#.#.###.#####.#####.#.#.#.#.#.###.#.#.#############
#.....#.....#.#...#...#...#...#.#...........###...#.......#...#.#.#...#...#.#.#.....#...#.#.#.#...#...#.......#.#.#...#.#...#.#.............#
#.###.#.#####.#######.###.#.#.#.###########.#############.###.#.#.###.#####.#.#####.#####.#.#.#.###.#.#########.#.#####.#.###.#############.#
#...#...#...#...#.....#...#.#.#...#.......#...#...........###.#.#.....#...#.#.#.....#...#.#.#.#.###.#.#...#.....#.#.....#...#...........#...#
###.#####.#.###.#.#####.###.#.###.#.#####.###.#.#############.#.#######.#.#.#.#.#####.#.#.#.#.#.###.#.#.#.#v#####.#.#######.###########.#.###
#...#...#.#...#.#.#...#.....#...#.#.#...#.....#.......#.....#...###...#.#.#...#.....#.#...#.#.#...#.#.#.#.>.>.#...#.#.....#...........#...###
#.###.#.#.###.#.#.#.#.#########.#.#.#.#.#############.#.###.#######.#.#.#.#########.#.#####.#.###.#.#.#.#####.#.###.#.###.###########.#######
#...#.#...#...#.#.#.#.#.........#...#.#...#...#.....#...#...#.....#.#...#...#...#...#.###...#...#.#.#...###...#.#...#.#...###.........#...###
###.#.#####.###.#.#.#.#.#############.###.#.#.#.###.#####.###.###.#.#######.#.#.#.###.###.#####.#.#.#######.###.#.###.#.#####.#########.#.###
###.#...###.....#...#.#.#.....###...#.#...#.#.#...#.#.....###...#.#...#.....#.#.#...#...#...#...#.#.......#...#.#...#.#.#...#.........#.#.###
###.###.#############.#.#.###.###.#.#.#.###.#.###.#.#.#########.#.###.#.#####.#.###v###.###.#.###.#######.###.#.###.#.#.#.#.#########.#.#.###
###...#...#...........#...###.....#...#.#...#.###.#.#.......###.#.#...#.#...#.#.#.>.>.#.#...#...#.#.....#...#...###.#.#.#.#.###.......#.#.###
#####.###.#.###########################.#.###.###.#.#######.###.#.#.###.#.#.#.#.#.###.#.#.#####.#.#.###.###.#######.#.#.#.#.###.#######.#.###
#####.....#...........#...###...........#...#.#...#.#.......#...#.#.###.#.#...#.#...#.#.#.....#.#...###...#.#.......#.#...#...#...#...#.#...#
#####################.#.#.###v#############.#.#.###.#.#######.###.#.###.#.#####.###.#.#.#####.#.#########.#.#.#######.#######.###.#.#.#.###.#
#.....................#.#.#.>.>.###...#...#.#.#.#...#.....#...#...#...#.#.#.....#...#.#.#.....#...#.....#...#.......#.###.....#...#.#.#.#...#
#.#####################.#.#.###.###.#.#.#.#.#.#.#.#######v#.###.#####.#.#.#.#####.###.#.#.#######.#.###.###########.#.###.#####v###.#.#.#.###
#...#.....#...........#.#.#.#...#...#.#.#.#.#.#.#.#.....>.>.#...#...#.#.#.#.....#.###.#.#.......#...#...#...........#...#.....>.#...#.#.#.###
###.#.###.#.#########.#.#.#.#.###.###.#.#.#.#.#.#.#.#########.###.#.#.#.#.#####.#.###.#.#######.#####.###.#############.#######v#.###.#.#.###
#...#.#...#.#.........#.#.#.#.#...###.#.#.#.#.#.#.#.........#...#.#.#.#.#.#.....#...#.#.#.......#.....###...#.....#...#.#.......#...#.#.#.###
#.###.#.###.#.#########.#.#.#.#.#####.#.#.#.#.#.#.#########.###.#.#.#.#.#.#.#######.#.#.#.#######.#########.#.###.#.#.#.#.#########.#.#.#.###
#.....#.....#...........#...#...#####...#...#...#...........###...#...#...#.........#...#.........#########...###...#...#...........#...#...#
###########################################################################################################################################.#`;

go();
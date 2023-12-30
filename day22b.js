'use strict'

let go = () => {
	data = data.split("\n").map(el=>el.split("~").map(el2=>el2.split(",").map(el3=>Number(el3))))

	// find limits

	let max_x = 0;
	let max_y = 0;
	let max_z = 0;
	for(let i = 0; i < data.length; i++)
	{
		let p0 = data[i][0];
		let p1 = data[i][1];
		let x0 = p0[0];
		let y0 = p0[1];
		let z0 = p0[2];
		let x1 = p1[0];
		let y1 = p1[1];
		let z1 = p1[2];
		if (x0 > max_x)
			max_x = x0;
		if (y0 > max_y)
			max_y = y0;
		if (z0 > max_z)
			max_z = z0;
		if (x1 > max_x)
			max_x = x1;
		if (y1 > max_y)
			max_y = y1;
		if (z1 > max_z)
			max_z = z1;
	}
	// console.log(max_x, max_y, max_z);

	// generate the empty grid

	let grid = [];
	for(let z = 0; z <= max_z; z++)
	{
		grid[z] = [];
		for(let y = 0; y <= max_y; y++)
		{
			grid[z][y] = [];
			for(let x = 0; x <= max_x; x++)
			{
				grid[z][y][x] = '.';
			}
		}
	}

	// place the blocks in the grid

	for(let i = 0; i < data.length; i++)
	{
		let p0 = data[i][0];
		let p1 = data[i][1];
		let x0 = p0[0];
		let y0 = p0[1];
		let z0 = p0[2];
		let x1 = p1[0];
		let y1 = p1[1];
		let z1 = p1[2];
		for(let z = z0; z <= z1; z++)
		{
			for(let y = y0; y <= y1; y++)
			{
				for(let x = x0; x <= x1; x++)
				{
					grid[z][y][x] = i;
				}
			}
		}
	}

	// drop blocks

	let drop_block = (ix, z) => {
		let p0 = data[ix][0];
		let p1 = data[ix][1];

		let x0 = p0[0];
		let y0 = p0[1];
		let z0 = p0[2];
		let x1 = p1[0];
		let y1 = p1[1];
		let z1 = p1[2];

		let dropped = false;

		while(1)
		{
			for(let y = y0; y <= y1; y++)
			{
				for(let x = x0; x <= x1; x++)
				{
					if(grid[z-1][y][x] != '.')
						return dropped;
				}
			}

			let h = Math.abs(z1 - z0);
			p0[2]--;
			p1[2]--;

			for(let y = y0; y <= y1; y++)
			{
				for(let x = x0; x <= x1; x++)
				{
					grid[z-1][y][x] = ix
					grid[z+h][y][x] = '.'
					
				}
			}

			z--;
			dropped = true;
			if (z == 1)
				return dropped;
		}
	}

	let done = new Set();
	for(let z = 2; z <= max_z; z++) // only a block that starts on 2 could possibly fall to 1
	{
		for(let y = 0; y <= max_y; y++)
		{
			for(let x = 0; x <= max_x; x++)
			{	
				let ix = grid[z][y][x];
				if(ix != '.' && !done.has(ix))
				{
					if(Math.min(data[ix][0][2], data[ix][1][2]) == z){
						drop_block(ix, z);
					}
				}
				done.add(ix);
			}
		}
	}

	// visualize x-z
	if (0)
	{
		for(let z = max_z; z >= 0; z--)
		{
			let str = "";
			for(let x = 0; x <= max_x; x++)
			{
				let temp = '.'
				for(let y = 0; y <= max_y; y++)
				{	
					if(grid[z][y][x] != '.')
					{
						temp = grid[z][y][x];
						break;
					}
				}
				str += temp;
			}
			console.log(str);
		}

		console.log();

		// visualize y-z

		for(let z = max_z; z >= 0; z--)
		{
			let str = "";
			for(let y = 0; y <= max_y; y++)
			{
				let temp = '.'
				for(let x = 0; x <= max_x; x++)
				{	
					if(grid[z][y][x] != '.')
					{
						temp = grid[z][y][x];
						break;
					}
				}
				str += temp;
			}
			console.log(str);
		}
	}

	// check for blocks supported by more than one other block

	let multi_support = new Set();
	let single_support = new Set();

	let check_supports_below = (ix, z) => {
		let p0 = data[ix][0];
		let p1 = data[ix][1];

		let x0 = p0[0];
		let y0 = p0[1];
		let z0 = p0[2];
		let x1 = p1[0];
		let y1 = p1[1];
		let z1 = p1[2];

		let supports = new Set();
		for(let y = y0; y <= y1; y++)
		{
			for(let x = x0; x <= x1; x++)
			{
				let support_ix = grid[z-1][y][x];
				if(support_ix != '.')
					supports.add(support_ix)
			}
		}
		if (supports.size == 0)
		{
			throw new Error("wtf");
		}
		else if (supports.size == 1)
		{
			supports.forEach(el=>single_support.add(el));
		}
		else
		{
			supports.forEach(el=>multi_support.add(el));
		}
	}

	let done2 = new Set();
	for(let z = 2; z <= max_z; z++) // only a block that starts on 2 could possibly fall to 1
	{
		for(let y = 0; y <= max_y; y++)
		{
			for(let x = 0; x <= max_x; x++)
			{	
				let ix = grid[z][y][x];
				if(ix != '.' && !done2.has(ix))
				{
					if(Math.min(data[ix][0][2], data[ix][1][2]) == z){
						check_supports_below(ix, z)
					}
				}
				done2.add(ix);
			}
		}
	}

	// console.log(multi_support);
	// console.log(single_support);

	// check for isolated blocks resting on top of other blocks

	let isolated_blocks = new Set();

	let check_supports_above = (ix, z) => {
		let p0 = data[ix][0];
		let p1 = data[ix][1];

		let x0 = p0[0];
		let y0 = p0[1];
		let z0 = p0[2];
		let x1 = p1[0];
		let y1 = p1[1];
		let z1 = p1[2];

		let supports = new Set();
		for(let y = y0; y <= y1; y++)
		{
			for(let x = x0; x <= x1; x++)
			{
				let support_ix = grid[z+1][y][x];
				if(support_ix != '.')
					return;
			}
		}
		isolated_blocks.add(ix);
	}

	let done3 = new Set();
	for(let z = max_z-1; z >= 0 ; z--)
	{
		for(let x = 0; x <= max_x; x++)
		{
			for(let y = 0; y <= max_y; y++)
			{	
				let ix = grid[z][y][x];
				if(ix != '.' && !done3.has(ix))
				{
					if(Math.max(data[ix][0][2], data[ix][1][2]) == z){
						check_supports_above(ix, z)
					}
				}
				done3.add(ix);
			}
		}
	}

	// console.log(isolated_blocks);

	single_support.forEach(el=>multi_support.delete(el));

	console.log(multi_support.size + isolated_blocks.size)

	let dropped_bricks = {};

	let count_drops = (ix) => {

		// copy the grid
		let grid2 = [];
		for(let z = 0; z <= max_z; z++)
		{
			grid2[z] = [];
			for(let y = 0; y <= max_y; y++)
			{
				grid2[z][y] = [];
				for(let x = 0; x <= max_x; x++)
				{
					grid2[z][y][x] = grid[z][y][x];
				}
			}
		}

		// visualize x-z
		let print_grid = () => {
			for(let z = max_z; z >= 0; z--)
			{
				let str = "";
				for(let x = 0; x <= max_x; x++)
				{
					let temp = '.'
					for(let y = 0; y <= max_y; y++)
					{	
						if(grid2[z][y][x] != '.')
						{
							temp = grid2[z][y][x];
							break;
						}
					}
					str += temp;
				}
				console.log(str);
			}

			console.log();

			// visualize y-z

			for(let z = max_z; z >= 0; z--)
			{
				let str = "";
				for(let y = 0; y <= max_y; y++)
				{
					let temp = '.'
					for(let x = 0; x <= max_x; x++)
					{	
						if(grid2[z][y][x] != '.')
						{
							temp = grid2[z][y][x];
							break;
						}
					}
					str += temp;
				}
				console.log(str);
			}
		}

		// copy the data

		let data2 = [];
		data.forEach(el=>data2.push(
			[
				[...el[0]],
				[...el[1]]
			]
		));

		// delete a single support block

		let delete_block = ix => {
			let p0 = data2[ix][0];
			let p1 = data2[ix][1];
			let x0 = p0[0];
			let y0 = p0[1];
			let z0 = p0[2];
			let x1 = p1[0];
			let y1 = p1[1];
			let z1 = p1[2];
			for(let z = z0; z <= z1; z++)
			{
				for(let y = y0; y <= y1; y++)
				{
					for(let x = x0; x <= x1; x++)
					{
						grid2[z][y][x] = '.';
					}
				}
			}
		}

		delete_block(ix);

		// count how many other blocks will drop

		let do_drop = () => {
			let drop_block2 = (ix, z) => {
				let p0 = data2[ix][0];
				let p1 = data2[ix][1];

				let x0 = p0[0];
				let y0 = p0[1];
				let z0 = p0[2];
				let x1 = p1[0];
				let y1 = p1[1];
				let z1 = p1[2];

				let dropped = false;

				while(1)
				{
					for(let y = y0; y <= y1; y++)
					{
						for(let x = x0; x <= x1; x++)
						{
							if(grid2[z-1][y][x] != '.')
								return;
						}
					}

					let h = Math.abs(z1 - z0);
					p0[2]--;
					p1[2]--;

					for(let y = y0; y <= y1; y++)
					{
						for(let x = x0; x <= x1; x++)
						{
							grid2[z-1][y][x] = ix
							grid2[z+h][y][x] = '.'
							
						}
					}

					z--;

					if (!dropped)
					{
						dropped_bricks[ix] = dropped_bricks[ix] || 0;
						dropped_bricks[ix]++;
						dropped = true;
					}
					if (z == 1)
						return;
				}
			}

			let done4 = new Set();
			for(let z = 2; z <= max_z; z++) // only a block that starts on 2 could possibly fall to 1
			{
				for(let x = 0; x <= max_x; x++)
				{
					for(let y = 0; y <= max_y; y++)
					{	
						let ix = grid2[z][y][x];
						if(ix != '.' && !done4.has(ix))
						{
							if(Math.min(data2[ix][0][2], data2[ix][1][2]) == z){
								drop_block2(ix, z);
							}
						}
						done4.add(ix);
					}
				}
			}
		}

		do_drop();
	};

	single_support.forEach(el=>count_drops(el));

	console.log(Object.values(dropped_bricks).reduce((a, c)=>a+c));

}

let data00 = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`;

let data = `4,2,286~6,2,286
1,0,143~1,1,143
5,0,21~7,0,21
2,2,22~4,2,22
7,3,162~7,5,162
1,4,146~1,4,148
7,5,9~7,8,9
6,6,245~6,8,245
2,8,106~2,9,106
7,4,219~8,4,219
5,2,132~7,2,132
5,8,14~6,8,14
6,0,303~9,0,303
2,3,275~2,4,275
9,1,63~9,4,63
0,2,232~0,5,232
0,3,314~1,3,314
8,5,79~8,5,80
7,2,56~7,3,56
1,0,140~1,2,140
7,2,138~8,2,138
7,3,152~7,6,152
9,7,103~9,9,103
7,1,228~7,3,228
0,0,285~2,0,285
0,4,288~0,5,288
7,4,287~7,6,287
1,7,5~1,9,5
5,1,28~5,1,29
7,1,26~7,3,26
5,0,241~7,0,241
8,4,306~8,6,306
7,2,87~7,4,87
1,1,154~4,1,154
5,1,187~5,2,187
0,0,131~0,2,131
3,4,138~3,6,138
8,1,300~8,4,300
7,4,239~7,7,239
3,8,250~5,8,250
0,9,160~3,9,160
1,7,328~4,7,328
0,0,197~0,2,197
7,6,126~7,8,126
1,9,237~3,9,237
7,3,317~8,3,317
0,1,306~0,2,306
7,2,252~8,2,252
4,1,227~6,1,227
9,1,311~9,4,311
4,2,106~4,2,107
1,9,141~3,9,141
2,6,321~3,6,321
8,5,114~8,5,114
2,1,71~5,1,71
8,9,51~8,9,51
0,3,166~0,5,166
1,1,199~1,2,199
3,9,69~5,9,69
2,4,225~5,4,225
9,5,67~9,7,67
6,5,139~8,5,139
5,0,78~6,0,78
2,5,317~3,5,317
5,3,54~7,3,54
3,2,135~3,2,137
5,4,104~7,4,104
7,8,58~9,8,58
2,3,127~3,3,127
1,6,223~3,6,223
2,9,281~3,9,281
6,5,68~6,7,68
4,0,52~5,0,52
1,2,197~1,4,197
8,0,46~8,0,47
8,6,90~8,9,90
7,3,44~9,3,44
7,2,57~9,2,57
5,9,292~7,9,292
4,6,55~7,6,55
2,1,5~2,2,5
2,1,312~5,1,312
9,4,33~9,4,33
2,6,154~2,9,154
0,6,98~0,9,98
2,0,92~3,0,92
1,7,284~4,7,284
1,2,94~1,4,94
4,9,37~7,9,37
8,9,197~8,9,200
4,2,252~4,4,252
1,6,51~1,8,51
2,0,151~2,3,151
2,2,283~4,2,283
1,3,273~3,3,273
3,2,184~3,3,184
6,3,229~6,4,229
2,5,187~2,5,189
8,0,230~8,2,230
6,7,100~6,8,100
3,0,165~3,2,165
4,4,257~6,4,257
2,2,94~2,4,94
3,2,266~3,5,266
7,3,292~8,3,292
0,3,313~0,5,313
7,1,168~9,1,168
5,4,243~5,6,243
5,6,19~8,6,19
3,8,292~3,9,292
6,0,4~8,0,4
7,7,282~8,7,282
9,1,188~9,1,189
4,9,92~7,9,92
7,4,8~9,4,8
5,6,113~7,6,113
3,0,55~3,2,55
3,4,234~5,4,234
3,6,316~6,6,316
4,0,139~4,1,139
1,9,329~4,9,329
0,9,192~3,9,192
2,5,164~2,8,164
3,3,247~3,3,249
1,6,43~3,6,43
9,0,293~9,3,293
4,8,158~4,9,158
0,6,15~2,6,15
2,3,180~4,3,180
6,1,55~6,3,55
5,2,85~5,3,85
9,2,153~9,3,153
8,8,120~9,8,120
4,6,120~4,7,120
6,1,187~9,1,187
0,9,117~4,9,117
3,3,186~5,3,186
2,1,229~4,1,229
3,8,298~6,8,298
1,5,290~1,7,290
3,8,184~5,8,184
2,5,93~2,8,93
4,4,164~4,4,167
2,1,263~4,1,263
1,5,232~3,5,232
2,3,30~4,3,30
4,6,294~4,8,294
0,3,186~2,3,186
3,5,108~3,7,108
3,6,84~5,6,84
5,3,306~5,5,306
0,2,263~2,2,263
2,3,40~4,3,40
6,4,328~6,8,328
9,3,107~9,5,107
7,2,35~7,5,35
4,3,187~6,3,187
8,4,104~9,4,104
6,4,65~8,4,65
7,6,248~9,6,248
4,4,162~6,4,162
4,4,217~7,4,217
7,9,47~9,9,47
6,8,5~9,8,5
6,6,252~9,6,252
6,3,98~8,3,98
6,6,302~8,6,302
4,6,126~4,8,126
8,2,217~8,5,217
5,5,103~5,7,103
2,1,20~2,1,20
2,7,63~4,7,63
5,1,206~5,2,206
2,5,283~2,6,283
4,2,232~6,2,232
1,5,294~1,7,294
3,0,315~3,3,315
8,4,102~8,6,102
0,2,303~0,5,303
6,3,135~6,5,135
0,6,271~0,8,271
4,6,92~4,8,92
1,0,207~2,0,207
1,3,125~1,6,125
0,8,240~2,8,240
6,6,267~8,6,267
2,6,286~2,6,289
7,0,90~7,3,90
6,5,26~8,5,26
8,5,242~8,5,242
3,1,251~6,1,251
7,7,77~7,9,77
1,8,271~1,9,271
5,4,220~5,4,221
8,7,135~8,8,135
3,5,275~6,5,275
1,7,90~3,7,90
5,8,70~6,8,70
9,4,130~9,6,130
7,7,70~7,7,72
4,2,260~4,4,260
9,7,309~9,8,309
9,3,250~9,4,250
4,9,136~7,9,136
1,0,46~4,0,46
4,8,193~4,8,196
3,1,308~5,1,308
6,9,232~6,9,235
6,5,3~6,7,3
8,8,136~8,9,136
6,2,200~9,2,200
5,7,267~5,9,267
5,6,107~7,6,107
1,4,62~1,6,62
2,2,284~2,3,284
2,2,299~2,5,299
1,8,149~3,8,149
7,5,48~7,7,48
0,3,329~3,3,329
0,6,272~0,8,272
2,2,316~3,2,316
1,0,233~3,0,233
7,3,41~9,3,41
4,5,52~6,5,52
0,3,147~0,6,147
3,0,162~3,3,162
5,7,325~5,9,325
2,1,73~2,3,73
3,2,144~3,2,146
5,3,190~7,3,190
1,6,188~1,9,188
9,4,110~9,6,110
5,7,311~7,7,311
3,1,245~3,3,245
5,5,183~5,6,183
0,2,6~0,2,6
0,2,214~2,2,214
2,4,12~2,6,12
5,5,308~5,7,308
5,2,159~5,4,159
9,1,7~9,3,7
0,0,222~0,3,222
5,6,171~7,6,171
0,1,278~2,1,278
6,1,71~6,2,71
6,5,268~7,5,268
0,5,90~3,5,90
6,5,6~9,5,6
2,0,154~3,0,154
9,1,59~9,2,59
4,8,42~7,8,42
1,5,244~1,8,244
1,7,327~4,7,327
4,5,79~6,5,79
4,9,8~5,9,8
5,8,103~7,8,103
0,2,9~2,2,9
1,0,236~4,0,236
0,9,158~2,9,158
5,7,52~8,7,52
7,7,235~7,7,236
4,4,39~6,4,39
5,9,283~7,9,283
7,7,315~7,9,315
4,1,224~4,3,224
6,5,84~8,5,84
6,3,181~8,3,181
7,6,27~9,6,27
0,7,197~0,7,198
4,1,306~4,3,306
3,5,141~3,8,141
6,4,51~6,4,55
5,7,162~7,7,162
3,4,111~5,4,111
1,6,54~4,6,54
4,0,181~4,3,181
4,4,256~5,4,256
0,1,137~3,1,137
1,0,149~1,3,149
5,4,150~5,6,150
0,0,277~0,3,277
0,6,195~0,9,195
0,0,83~0,3,83
5,3,201~5,4,201
5,5,119~5,7,119
7,5,324~7,7,324
3,2,77~3,2,77
5,8,332~6,8,332
3,4,72~5,4,72
2,7,69~4,7,69
1,7,72~3,7,72
1,8,201~4,8,201
5,2,144~8,2,144
1,3,38~3,3,38
5,5,56~5,7,56
1,1,228~4,1,228
4,5,65~4,6,65
2,1,65~4,1,65
9,7,288~9,9,288
7,8,156~7,9,156
6,2,1~6,4,1
7,7,181~8,7,181
9,5,116~9,8,116
3,9,157~6,9,157
5,6,263~8,6,263
7,4,138~7,5,138
0,2,268~2,2,268
7,1,143~9,1,143
7,2,168~9,2,168
6,5,161~6,8,161
6,3,305~7,3,305
3,6,164~3,7,164
3,8,12~3,8,14
7,7,49~9,7,49
2,8,11~3,8,11
2,3,241~2,6,241
1,5,206~1,5,208
5,0,174~5,2,174
3,3,93~3,5,93
0,1,319~3,1,319
1,4,127~1,5,127
4,2,160~6,2,160
6,1,3~8,1,3
2,3,79~4,3,79
4,7,41~5,7,41
8,8,234~9,8,234
6,6,260~6,7,260
4,4,5~4,6,5
5,7,12~5,9,12
6,4,95~6,5,95
3,1,242~5,1,242
5,9,318~7,9,318
8,3,16~8,4,16
7,1,282~7,3,282
1,2,210~1,4,210
1,0,146~1,2,146
2,0,303~5,0,303
4,2,154~4,2,155
1,1,46~1,5,46
9,7,64~9,9,64
6,8,58~6,9,58
0,1,228~0,4,228
1,4,145~1,6,145
6,7,222~8,7,222
5,5,92~7,5,92
4,3,37~4,7,37
7,7,134~7,9,134
5,4,260~7,4,260
7,3,32~7,6,32
7,5,232~7,7,232
8,5,267~9,5,267
6,9,280~6,9,281
6,5,121~6,8,121
5,2,34~5,3,34
9,6,78~9,7,78
8,6,233~8,8,233
5,9,195~8,9,195
3,7,49~5,7,49
5,3,336~5,5,336
8,3,237~8,5,237
5,8,282~9,8,282
0,3,198~0,3,201
7,1,72~7,4,72
6,5,41~6,8,41
8,5,325~8,8,325
4,6,66~5,6,66
1,3,66~1,5,66
5,0,37~8,0,37
4,1,78~4,4,78
0,0,208~0,2,208
4,6,155~4,8,155
8,3,249~9,3,249
0,4,1~0,6,1
5,0,254~8,0,254
0,3,202~2,3,202
0,8,152~0,9,152
9,0,146~9,4,146
0,7,179~2,7,179
3,4,260~3,6,260
7,4,86~7,7,86
4,5,22~4,7,22
1,7,180~4,7,180
6,4,5~6,4,6
4,7,152~4,7,153
3,2,141~3,4,141
5,5,155~5,6,155
3,7,68~3,9,68
5,0,194~6,0,194
0,4,302~3,4,302
9,6,30~9,6,33
1,5,64~1,6,64
5,2,265~5,4,265
6,3,48~6,5,48
6,4,287~6,6,287
1,1,99~3,1,99
8,4,112~8,6,112
9,8,93~9,8,96
0,6,185~3,6,185
4,5,157~4,5,157
4,4,191~6,4,191
6,1,96~6,3,96
2,5,191~2,5,193
8,7,93~8,7,95
5,3,321~5,4,321
1,2,217~2,2,217
3,7,297~5,7,297
3,8,328~5,8,328
4,9,111~5,9,111
0,2,206~0,4,206
9,6,203~9,8,203
7,0,69~7,1,69
4,7,224~5,7,224
0,2,195~0,5,195
5,2,108~5,4,108
1,2,30~3,2,30
5,1,32~5,3,32
0,3,269~2,3,269
3,5,196~3,7,196
1,7,301~1,9,301
3,6,322~3,9,322
1,4,63~3,4,63
3,9,18~5,9,18
4,6,205~5,6,205
5,5,94~5,7,94
6,4,188~6,4,190
9,1,285~9,4,285
4,8,192~6,8,192
5,9,159~6,9,159
6,2,166~8,2,166
4,0,81~4,2,81
0,2,219~2,2,219
0,5,14~0,5,16
4,0,228~4,0,230
5,1,229~5,3,229
3,9,167~6,9,167
6,7,177~9,7,177
3,2,209~3,4,209
2,7,89~5,7,89
5,3,138~6,3,138
0,0,49~2,0,49
2,4,125~3,4,125
4,6,68~5,6,68
3,9,105~3,9,108
5,1,297~8,1,297
7,8,46~9,8,46
2,4,34~2,6,34
2,3,277~3,3,277
3,1,75~5,1,75
5,5,266~5,8,266
6,3,2~6,5,2
4,5,71~7,5,71
4,3,331~4,3,331
6,1,268~9,1,268
2,3,291~2,6,291
6,6,210~8,6,210
0,1,14~2,1,14
1,2,290~3,2,290
4,0,253~4,2,253
2,3,183~2,6,183
5,6,261~5,7,261
1,6,127~1,8,127
1,8,185~4,8,185
0,0,314~0,2,314
5,0,260~8,0,260
6,5,255~6,6,255
6,9,271~6,9,272
7,0,74~7,2,74
3,3,156~3,6,156
2,9,324~5,9,324
8,1,6~8,1,8
5,2,304~5,4,304
6,5,303~9,5,303
3,2,13~3,3,13
7,3,240~9,3,240
1,2,188~3,2,188
0,9,102~3,9,102
8,1,61~8,3,61
5,7,216~7,7,216
4,5,144~6,5,144
0,5,28~0,5,29
0,2,106~2,2,106
1,4,304~1,4,305
3,1,50~5,1,50
2,9,323~5,9,323
2,4,79~4,4,79
8,3,246~8,5,246
9,0,307~9,2,307
5,0,157~5,1,157
1,3,163~1,5,163
2,0,76~2,2,76
5,0,83~5,1,83
4,6,150~4,8,150
7,6,325~7,7,325
3,7,39~7,7,39
8,0,282~8,3,282
1,4,133~2,4,133
1,8,69~3,8,69
7,3,58~7,5,58
6,6,239~6,8,239
1,8,48~2,8,48
2,2,143~2,2,146
5,3,133~7,3,133
7,1,101~9,1,101
6,7,146~8,7,146
2,2,311~4,2,311
3,8,159~3,8,161
3,5,230~3,7,230
9,5,306~9,7,306
7,0,290~7,3,290
5,5,315~7,5,315
2,8,95~2,8,97
6,5,271~9,5,271
6,7,223~6,9,223
0,8,196~0,8,196
4,4,320~4,7,320
3,5,78~5,5,78
6,3,106~6,4,106
4,4,248~7,4,248
5,1,19~5,4,19
1,6,59~4,6,59
6,6,110~8,6,110
2,0,206~2,2,206
7,4,140~7,4,142
0,5,315~0,7,315
6,0,269~8,0,269
1,1,47~1,3,47
4,0,243~4,2,243
4,4,251~6,4,251
9,9,104~9,9,107
9,6,112~9,6,114
0,2,312~0,5,312
3,4,98~5,4,98
4,6,303~7,6,303
4,6,125~4,9,125
9,7,55~9,9,55
6,4,331~9,4,331
3,4,65~3,6,65
7,0,140~7,2,140
9,3,176~9,5,176
5,9,133~7,9,133
7,6,105~7,8,105
9,3,257~9,4,257
0,2,159~3,2,159
3,5,40~5,5,40
0,1,102~0,3,102
7,6,108~7,8,108
5,7,32~9,7,32
1,4,251~3,4,251
6,1,30~7,1,30
3,1,158~3,4,158
3,4,128~3,4,131
1,0,26~3,0,26
7,8,276~9,8,276
1,8,243~2,8,243
4,0,226~6,0,226
0,1,231~2,1,231
4,6,182~7,6,182
6,3,131~8,3,131
1,3,133~4,3,133
2,5,160~2,8,160
0,1,236~0,4,236
2,2,252~2,4,252
0,4,27~0,7,27
0,4,9~0,6,9
2,5,297~2,7,297
5,8,329~5,9,329
0,4,52~0,7,52
4,0,162~6,0,162
2,7,16~2,9,16
6,6,185~7,6,185
7,1,64~7,4,64
1,7,9~2,7,9
4,5,184~4,6,184
5,0,18~5,2,18
8,6,83~9,6,83
6,4,122~6,5,122
5,4,84~6,4,84
4,3,14~7,3,14
9,1,51~9,3,51
1,5,72~4,5,72
4,8,183~6,8,183
5,0,63~5,2,63
0,2,266~0,4,266
2,2,19~3,2,19
5,2,36~5,2,38
7,7,261~9,7,261
6,7,302~8,7,302
5,6,117~5,7,117
5,5,66~7,5,66
3,7,270~5,7,270
0,6,17~0,8,17
2,0,100~2,2,100
3,1,309~3,4,309
6,5,16~6,8,16
1,4,257~1,5,257
5,7,211~7,7,211
2,4,259~2,5,259
5,1,232~7,1,232
4,7,271~4,7,273
7,3,257~7,5,257
7,2,223~7,5,223
8,5,279~8,7,279
4,6,38~4,7,38
6,7,275~6,9,275
3,4,101~5,4,101
2,0,317~4,0,317
0,2,164~0,3,164
5,3,163~5,4,163
7,8,277~8,8,277
6,4,213~6,7,213
3,0,159~6,0,159
8,0,234~8,0,236
1,5,33~2,5,33
8,3,320~8,3,320
0,7,14~2,7,14
7,9,48~9,9,48
4,4,7~4,6,7
6,5,323~6,8,323
9,7,33~9,9,33
4,1,185~4,2,185
6,4,185~8,4,185
5,6,109~5,9,109
2,2,286~2,4,286
9,4,35~9,4,37
8,7,9~8,9,9
2,7,295~4,7,295
4,0,183~4,1,183
0,3,224~0,3,226
7,0,36~7,4,36
7,7,44~7,9,44
2,4,197~2,4,200
0,1,54~1,1,54
4,3,193~6,3,193
3,0,21~3,2,21
3,8,199~4,8,199
1,7,49~1,9,49
4,2,151~5,2,151
6,0,165~6,2,165
8,8,35~9,8,35
1,4,256~1,7,256
6,4,44~6,5,44
0,2,162~2,2,162
3,8,191~5,8,191
1,3,162~1,5,162
9,0,214~9,0,217
2,3,234~2,5,234
0,8,266~2,8,266
7,1,245~7,3,245
3,3,6~3,6,6
2,0,302~5,0,302
8,7,33~8,8,33
1,9,294~3,9,294
5,7,194~5,9,194
4,2,44~6,2,44
3,0,166~5,0,166
3,8,180~5,8,180
6,1,226~6,4,226
8,0,67~8,0,68
5,0,253~5,2,253
7,7,312~8,7,312
2,0,301~2,3,301
1,4,149~3,4,149
2,2,142~2,6,142
4,0,40~4,1,40
2,6,99~2,8,99
4,0,152~5,0,152
5,9,5~8,9,5
5,3,15~8,3,15
3,6,10~3,9,10
5,3,69~5,5,69
8,2,7~8,4,7
6,8,225~8,8,225
9,2,11~9,4,11
6,3,287~9,3,287
4,5,75~6,5,75
7,7,290~9,7,290
7,1,167~7,2,167
7,3,236~7,5,236
7,2,135~7,4,135
2,9,289~4,9,289
7,1,162~8,1,162
6,9,4~9,9,4
2,0,28~4,0,28
0,2,148~0,3,148
4,7,70~4,9,70
8,4,144~8,6,144
4,2,189~4,2,192
5,2,288~6,2,288
3,3,95~3,6,95
5,6,231~6,6,231
5,5,63~7,5,63
8,2,239~8,5,239
6,2,98~6,2,98
3,1,134~3,3,134
7,5,227~7,7,227
8,2,67~8,3,67
3,4,30~4,4,30
8,3,180~8,7,180
2,1,314~2,1,316
4,2,230~6,2,230
4,8,278~6,8,278
8,4,270~8,6,270
5,0,240~5,3,240
9,5,190~9,7,190
6,6,140~6,6,141
3,7,98~4,7,98
7,4,143~7,4,144
2,8,72~2,9,72
1,8,157~3,8,157
0,7,122~0,7,125
9,2,149~9,3,149
3,3,57~5,3,57
9,4,204~9,6,204
0,0,156~3,0,156
5,5,173~5,8,173
7,4,91~7,4,91
2,2,204~5,2,204
5,6,196~7,6,196
8,4,245~8,6,245
5,7,235~6,7,235
5,7,254~7,7,254
7,3,225~9,3,225
7,0,94~7,0,97
3,8,142~3,8,145
4,1,136~4,4,136
4,7,149~4,8,149
9,7,278~9,9,278
2,2,11~5,2,11
0,4,306~1,4,306
1,8,241~1,9,241
7,5,254~8,5,254
7,5,307~8,5,307
6,3,81~6,5,81
2,6,166~2,7,166
6,5,45~6,6,45
9,3,292~9,6,292
8,0,240~8,2,240
5,1,3~5,3,3
7,4,168~7,7,168
6,0,184~6,3,184
6,3,91~8,3,91
0,4,49~2,4,49
7,0,142~7,0,145
4,2,138~4,4,138
6,6,4~8,6,4
1,1,3~1,1,4
2,1,287~5,1,287
1,2,319~3,2,319
5,1,149~7,1,149
2,7,190~2,9,190
3,8,147~5,8,147
2,5,236~2,5,238
6,4,50~6,6,50
9,2,208~9,3,208
0,1,10~2,1,10
5,3,109~8,3,109
1,1,102~3,1,102
6,5,54~9,5,54
7,2,70~7,4,70
1,4,121~3,4,121
2,9,321~4,9,321
7,1,161~9,1,161
3,4,46~3,6,46
0,0,130~0,1,130
5,5,242~7,5,242
7,3,40~8,3,40
0,0,163~2,0,163
1,7,195~1,9,195
4,9,166~7,9,166
5,8,56~6,8,56
7,6,128~9,6,128
8,5,238~8,5,238
3,0,182~3,3,182
7,3,289~9,3,289
6,5,116~7,5,116
2,3,61~2,5,61
2,2,182~2,3,182
4,1,198~5,1,198
3,0,319~5,0,319
6,0,44~7,0,44
5,7,2~5,9,2
8,0,64~8,3,64
0,5,136~2,5,136
3,9,89~5,9,89
6,6,160~8,6,160
3,2,89~3,4,89
0,8,2~0,9,2
8,7,269~8,9,269
1,9,239~3,9,239
5,3,232~5,4,232
2,5,60~2,7,60
9,3,174~9,6,174
4,3,105~4,4,105
2,8,187~4,8,187
2,3,302~2,3,305
8,5,24~8,6,24
2,2,267~4,2,267
0,8,261~3,8,261
4,2,280~7,2,280
0,6,120~0,9,120
6,2,141~8,2,141
4,2,146~4,5,146
8,8,290~9,8,290
4,0,190~6,0,190
5,6,207~7,6,207
6,9,86~7,9,86
8,6,84~8,9,84
0,5,235~0,7,235
9,1,309~9,4,309
0,0,15~0,2,15
6,0,266~6,1,266
5,2,226~5,3,226
7,4,286~9,4,286
0,4,124~2,4,124
1,4,8~3,4,8
5,7,5~5,7,7
6,1,74~6,4,74
4,4,115~6,4,115
0,0,3~0,2,3
1,4,255~3,4,255
0,2,25~0,5,25
1,6,159~3,6,159
4,4,269~4,4,272
4,6,21~8,6,21
8,8,34~8,9,34
3,1,210~3,1,213
9,4,269~9,7,269
3,3,250~3,4,250
6,2,95~8,2,95
7,0,67~7,2,67
9,6,254~9,6,254
7,4,187~9,4,187
5,0,43~7,0,43
0,1,52~0,3,52
4,5,325~6,5,325
2,6,169~3,6,169
0,8,64~0,9,64
8,9,170~8,9,173
6,6,159~6,7,159
5,2,223~5,5,223
5,6,333~5,8,333
2,7,228~4,7,228
9,0,191~9,1,191
3,9,255~6,9,255
3,1,248~6,1,248
2,6,117~4,6,117
1,0,239~2,0,239
0,9,61~1,9,61
9,3,55~9,5,55
8,5,231~9,5,231
7,7,66~9,7,66
6,7,98~7,7,98
1,1,209~1,3,209
3,0,193~5,0,193
5,5,43~7,5,43
5,5,267~7,5,267
1,1,156~1,1,158
8,6,149~8,8,149
3,3,15~3,5,15
3,3,124~3,5,124
5,5,321~7,5,321
3,1,74~3,2,74
0,4,148~0,6,148
1,0,196~3,0,196
0,1,6~0,1,7
2,7,243~4,7,243
2,0,18~2,1,18
8,3,57~8,6,57
1,7,8~2,7,8
3,8,110~5,8,110
2,6,39~5,6,39
6,6,238~6,8,238
7,7,138~7,9,138
6,6,230~8,6,230
1,5,155~1,7,155
3,8,258~3,9,258
4,3,266~4,4,266
3,0,25~6,0,25
5,5,90~5,7,90
4,3,149~4,5,149
1,6,18~1,9,18
4,0,279~6,0,279
1,1,188~3,1,188
2,8,57~4,8,57
8,8,10~8,9,10
2,4,46~2,6,46
3,9,234~4,9,234
4,0,49~4,3,49
4,1,278~7,1,278
1,2,61~3,2,61
0,2,95~0,6,95
3,9,327~3,9,328
6,0,2~7,0,2
6,2,240~6,4,240
8,3,268~8,3,270
6,0,172~8,0,172
9,4,147~9,7,147
9,3,210~9,4,210
6,3,33~7,3,33
8,2,203~8,4,203
6,7,55~6,8,55
3,7,58~4,7,58
9,5,85~9,6,85
3,3,267~3,6,267
5,1,318~5,4,318
6,6,98~8,6,98
5,2,198~5,6,198
2,4,48~3,4,48
3,6,309~4,6,309
4,6,48~4,9,48
8,2,52~8,4,52
7,8,158~7,9,158
2,4,107~5,4,107
8,2,170~8,4,170
2,6,64~2,9,64
0,5,196~0,5,198
5,1,111~5,3,111
5,0,289~5,3,289
5,3,315~8,3,315
0,0,308~0,2,308
6,4,198~6,6,198
4,3,80~6,3,80
5,7,250~6,7,250
5,1,146~8,1,146
3,5,194~3,8,194
2,1,86~5,1,86
2,3,36~4,3,36
2,5,154~5,5,154
2,7,21~2,8,21
4,3,253~7,3,253
5,9,42~5,9,44
6,3,92~6,3,94
4,5,254~4,7,254
6,6,330~6,8,330
2,2,173~4,2,173
4,1,330~4,3,330
5,6,248~5,9,248
6,8,206~8,8,206
9,0,54~9,1,54
2,8,105~2,9,105
6,2,137~7,2,137
2,4,141~2,5,141
5,4,245~5,6,245
1,2,160~1,3,160
4,7,96~6,7,96
3,1,104~3,3,104
1,9,120~1,9,122
2,5,2~4,5,2
3,5,268~3,5,270
6,0,277~6,2,277
1,9,172~1,9,175
7,1,145~8,1,145
5,1,132~7,1,132
5,7,35~5,9,35
1,3,277~1,5,277
6,5,117~6,8,117
7,7,257~7,8,257
5,3,22~7,3,22
5,4,328~5,6,328
1,6,318~4,6,318
4,9,271~5,9,271
5,5,22~5,8,22
0,4,307~0,5,307
8,7,147~8,9,147
9,2,157~9,3,157
5,4,21~5,4,23
3,9,293~3,9,293
7,5,67~7,7,67
6,2,201~9,2,201
9,5,307~9,6,307
4,6,86~4,9,86
6,6,173~9,6,173
7,2,206~9,2,206
5,9,268~8,9,268
3,9,114~5,9,114
4,9,286~5,9,286
5,3,239~7,3,239
0,7,263~0,9,263
5,2,13~5,4,13
3,0,90~3,2,90
0,4,92~3,4,92
8,3,132~8,5,132
2,5,290~5,5,290
1,7,60~1,9,60
7,5,145~7,7,145
6,3,165~8,3,165
3,2,264~3,4,264
3,3,170~3,5,170
5,4,1~5,6,1
4,0,14~4,2,14
7,0,160~7,3,160
5,2,199~7,2,199
4,4,263~7,4,263
7,9,85~9,9,85
8,6,225~8,7,225
0,1,129~0,4,129
3,5,147~6,5,147
6,7,165~6,9,165
0,0,105~0,2,105
9,0,211~9,2,211
4,3,179~4,6,179
9,7,2~9,9,2
3,0,42~5,0,42
0,4,140~3,4,140
4,7,176~6,7,176
2,8,263~3,8,263
3,4,186~6,4,186
2,6,115~5,6,115
1,3,205~1,5,205
3,8,44~3,9,44
7,7,165~8,7,165
1,2,291~1,3,291
0,3,290~1,3,290
0,6,16~0,7,16
4,3,112~4,6,112
7,8,289~7,9,289
0,6,10~1,6,10
5,1,4~5,2,4
5,2,324~5,4,324
2,1,149~2,2,149
5,1,7~7,1,7
6,2,321~7,2,321
6,2,274~6,5,274
9,1,6~9,3,6
4,6,284~6,6,284
6,0,27~6,1,27
3,9,279~5,9,279
6,6,119~8,6,119
4,1,59~4,3,59
1,8,152~3,8,152
5,1,53~5,4,53
8,4,161~8,6,161
9,4,274~9,5,274
4,0,206~4,2,206
6,4,193~6,6,193
0,5,314~2,5,314
4,8,101~6,8,101
1,4,234~1,5,234
2,5,149~2,6,149
7,4,323~7,6,323
3,6,103~3,8,103
9,7,52~9,9,52
4,1,270~5,1,270
7,7,89~9,7,89
9,7,90~9,9,90
1,4,260~1,7,260
1,6,148~3,6,148
1,7,55~1,8,55
0,8,204~2,8,204
9,4,29~9,6,29
6,4,300~6,7,300
5,9,40~6,9,40
3,8,301~5,8,301
1,7,236~4,7,236
1,3,39~1,3,41
1,7,239~1,8,239
4,0,149~4,2,149
4,7,233~7,7,233
6,6,99~8,6,99
0,5,98~0,5,101
3,3,60~4,3,60
1,7,58~1,7,59
2,0,265~2,1,265
8,5,34~8,7,34
8,2,151~8,4,151
4,1,33~4,4,33
7,8,274~8,8,274
3,0,206~3,4,206
5,6,218~5,8,218
7,6,129~7,9,129
2,5,186~3,5,186
5,0,155~6,0,155
1,6,225~4,6,225
5,1,112~6,1,112
6,7,30~8,7,30
1,1,229~1,2,229
4,0,45~5,0,45
2,6,45~4,6,45
4,4,218~4,6,218
2,5,134~2,8,134
4,3,303~6,3,303
9,1,283~9,3,283
7,1,193~7,5,193
6,3,49~9,3,49
1,1,208~3,1,208
4,2,104~4,5,104
3,7,51~3,7,52
5,1,48~5,3,48
9,4,149~9,6,149
7,4,251~8,4,251
0,4,86~3,4,86
0,0,204~0,3,204
4,1,264~8,1,264
6,6,201~9,6,201
1,1,22~3,1,22
6,6,58~6,7,58
6,6,54~6,8,54
3,0,58~3,0,61
5,4,25~5,6,25
5,3,214~8,3,214
4,7,64~4,9,64
3,2,59~3,4,59
5,1,201~5,2,201
6,2,155~9,2,155
6,3,260~7,3,260
4,1,39~4,3,39
5,8,186~5,8,189
3,1,168~3,5,168
0,7,182~3,7,182
1,2,101~3,2,101
8,7,166~8,9,166
6,6,240~6,8,240
5,5,10~5,7,10
3,9,15~6,9,15
7,1,319~7,5,319
1,0,161~4,0,161
9,7,99~9,9,99
0,1,50~2,1,50
7,7,78~8,7,78
1,2,10~1,3,10
6,9,1~8,9,1
7,1,39~7,1,42
1,3,34~3,3,34
2,0,17~4,0,17
3,3,31~5,3,31
2,2,248~4,2,248
0,4,126~0,4,128
1,5,133~3,5,133
1,0,142~1,0,142
6,4,165~6,4,165
2,0,84~4,0,84
3,2,258~3,4,258
6,0,187~9,0,187
4,6,186~7,6,186
8,3,153~8,4,153
1,6,9~3,6,9
3,6,320~3,9,320
2,5,242~4,5,242
3,3,84~3,5,84
1,3,207~1,4,207
5,9,72~5,9,75
7,9,12~9,9,12
5,5,200~8,5,200
0,9,142~2,9,142
0,6,150~0,9,150
3,2,27~3,5,27
0,3,81~3,3,81
4,0,112~7,0,112
6,1,252~9,1,252
4,6,100~5,6,100
4,7,43~4,8,43
4,5,53~6,5,53
6,5,234~8,5,234
1,9,171~4,9,171
9,4,151~9,6,151
9,1,296~9,1,298
9,0,162~9,1,162
2,0,201~4,0,201
7,4,29~7,7,29
1,6,130~1,8,130
9,3,66~9,4,66
3,7,100~3,9,100
5,3,213~5,4,213
4,9,168~6,9,168
0,5,4~0,5,6
6,0,232~8,0,232
0,5,286~2,5,286
1,7,74~1,7,77
3,3,188~3,3,191
8,2,58~8,3,58
0,4,233~0,7,233
3,0,209~6,0,209
7,2,3~7,2,3
5,1,195~6,1,195
1,5,288~3,5,288
7,2,244~7,5,244
0,6,55~0,8,55
3,7,158~6,7,158
4,4,297~4,6,297
7,1,97~7,3,97
6,2,46~8,2,46
1,4,150~2,4,150
8,7,264~8,7,266
3,1,261~3,2,261
4,5,321~4,7,321
2,2,14~2,2,16
1,7,300~4,7,300
3,3,24~7,3,24
2,2,195~4,2,195
6,7,253~6,9,253
7,5,11~7,5,14
0,1,108~2,1,108
8,4,231~8,4,234
5,9,49~8,9,49
1,7,3~5,7,3
6,6,34~6,8,34
0,0,282~2,0,282
1,5,44~1,6,44
3,4,147~5,4,147
4,1,221~4,4,221
6,0,168~6,2,168
0,4,58~0,4,60
3,3,143~5,3,143
6,5,220~8,5,220
4,0,254~4,2,254
3,5,135~3,7,135
4,9,287~6,9,287
3,6,56~3,8,56
1,5,293~1,8,293
2,6,306~4,6,306
7,6,271~7,9,271
4,3,236~4,5,236
5,3,4~5,5,4
0,7,78~2,7,78
3,2,161~3,4,161
1,8,262~1,8,264
3,8,290~4,8,290
1,0,281~1,2,281
3,4,82~3,6,82
1,1,2~4,1,2
6,7,132~8,7,132
5,7,300~5,7,303
3,7,256~5,7,256
4,6,281~4,9,281
6,5,298~6,6,298
3,9,232~5,9,232
0,7,2~0,7,5
4,2,186~6,2,186
5,1,82~5,4,82
4,1,47~4,2,47
7,4,277~9,4,277
5,0,29~7,0,29
1,2,198~1,4,198
8,4,289~9,4,289
0,4,194~4,4,194
7,7,75~9,7,75
5,0,77~5,2,77
1,5,301~3,5,301
1,6,149~1,7,149
0,2,97~0,5,97
5,1,158~8,1,158
7,6,118~7,9,118
2,3,330~2,3,333
7,1,99~7,1,100
1,5,144~1,8,144
4,1,284~4,3,284
0,9,52~3,9,52
4,3,191~6,3,191
8,0,302~8,2,302
6,3,38~8,3,38
6,1,194~6,3,194
5,0,133~5,2,133
1,0,2~2,0,2
1,8,200~3,8,200
5,4,253~7,4,253
2,7,292~5,7,292
5,7,221~6,7,221
3,2,54~6,2,54
7,6,154~7,9,154
0,3,55~0,5,55
3,4,3~3,4,5
6,3,269~6,5,269
1,3,142~1,6,142
9,2,30~9,5,30
6,9,226~9,9,226
3,1,236~3,5,236
2,7,325~3,7,325
4,6,204~6,6,204
0,4,310~0,5,310
0,6,56~0,8,56
6,0,93~8,0,93
9,3,14~9,3,17
0,0,315~1,0,315
6,9,256~9,9,256
0,8,268~1,8,268
1,6,53~1,8,53
4,7,225~4,7,225
2,2,339~2,5,339
4,6,119~4,7,119
8,1,105~9,1,105
8,6,183~9,6,183
0,8,99~0,9,99
5,3,36~5,3,38
7,9,286~9,9,286
2,6,239~2,8,239
4,4,177~4,8,177
0,3,11~0,7,11
3,7,138~3,9,138
5,8,220~5,8,221
2,3,31~2,5,31
9,7,285~9,8,285
2,6,244~3,6,244
3,6,295~6,6,295
9,1,243~9,3,243
0,2,288~2,2,288
6,1,291~6,3,291
0,4,118~3,4,118
4,1,62~7,1,62
6,1,198~8,1,198
9,3,253~9,3,256
7,7,81~8,7,81
1,3,287~3,3,287
0,7,81~0,7,83
1,6,302~1,8,302
4,0,196~4,0,199
4,4,324~4,6,324
5,4,210~5,7,210
3,7,287~3,9,287
5,5,312~5,7,312
2,3,257~2,5,257
8,6,60~9,6,60
9,0,152~9,2,152
8,2,228~8,4,228
5,7,124~7,7,124
2,8,19~4,8,19
9,9,291~9,9,292
0,0,132~1,0,132
7,1,28~9,1,28
5,7,212~5,9,212
0,4,267~0,4,268
1,4,65~1,4,65
3,0,237~3,0,239
7,4,115~7,7,115
2,1,211~2,3,211
1,6,282~4,6,282
1,3,130~1,5,130
0,1,262~2,1,262
3,6,102~4,6,102
7,8,204~9,8,204
6,7,276~8,7,276
4,9,277~6,9,277
2,9,145~3,9,145
7,2,250~7,4,250
6,9,169~6,9,171
0,4,229~0,4,231
8,1,171~8,1,172
5,0,169~7,0,169
5,0,110~5,2,110
6,3,223~6,5,223
5,7,47~7,7,47
4,3,277~6,3,277
4,1,26~6,1,26
4,6,124~7,6,124
6,5,322~8,5,322
0,7,292~0,9,292
5,2,171~7,2,171
1,5,152~3,5,152
3,7,54~5,7,54
5,6,280~5,8,280
7,9,167~9,9,167
1,1,282~3,1,282
1,0,256~4,0,256
3,6,41~3,8,41
7,2,5~9,2,5
9,6,191~9,7,191
6,0,157~6,1,157
0,2,223~0,3,223
2,7,163~3,7,163
2,3,83~4,3,83
5,8,124~6,8,124
3,7,244~3,7,244
5,0,225~5,3,225
1,1,97~1,2,97
2,0,231~5,0,231
5,0,24~5,1,24
2,1,45~5,1,45
9,1,102~9,2,102
6,4,215~7,4,215
7,4,67~7,4,67
6,0,257~6,2,257
5,2,169~7,2,169
6,5,61~6,7,61
2,3,130~6,3,130
6,2,93~8,2,93
1,3,270~3,3,270
2,1,212~2,2,212
1,5,106~4,5,106
6,8,166~6,8,168
5,5,301~8,5,301
7,5,224~9,5,224
0,3,276~1,3,276
4,0,88~4,4,88
5,3,314~5,6,314
7,1,305~9,1,305
7,2,293~7,3,293
7,0,308~7,2,308
6,7,187~9,7,187
6,4,183~8,4,183
6,9,93~6,9,96
1,2,266~1,3,266
8,1,318~8,3,318
2,7,178~5,7,178
4,6,62~4,8,62
7,8,189~8,8,189
0,4,18~0,5,18
7,8,36~7,8,38
7,7,58~9,7,58
6,5,228~9,5,228
7,5,284~7,8,284
2,4,308~5,4,308
9,7,148~9,7,150
2,5,309~2,7,309
1,0,11~1,2,11
7,0,188~7,0,188
4,9,236~4,9,236
1,1,111~3,1,111
1,8,9~1,9,9
6,2,304~8,2,304
6,3,150~9,3,150
3,3,305~3,5,305
9,9,7~9,9,8
1,8,295~4,8,295
3,3,327~5,3,327
9,6,250~9,6,250
4,5,327~5,5,327
0,5,73~2,5,73
8,5,77~8,7,77
5,2,307~5,3,307
2,3,335~2,3,337
7,2,281~8,2,281
6,8,126~6,8,129
9,7,61~9,9,61
1,3,89~1,5,89
8,2,97~8,4,97
4,3,334~7,3,334
6,8,61~6,8,63
7,4,206~8,4,206
4,2,15~6,2,15
5,0,76~5,3,76
6,9,7~8,9,7
3,4,113~3,4,115
7,7,237~7,8,237
4,7,242~7,7,242
9,2,280~9,4,280
8,3,265~8,6,265
0,2,99~2,2,99
4,6,97~6,6,97
4,2,156~6,2,156
3,1,185~3,2,185
1,7,286~1,7,288
4,8,51~4,8,53
7,6,280~8,6,280
5,7,259~7,7,259
8,0,94~8,0,96
8,6,282~8,6,284
4,2,300~4,4,300
6,8,119~8,8,119
2,6,221~5,6,221
9,7,101~9,8,101
2,1,15~4,1,15
4,5,158~4,6,158
1,9,155~3,9,155
0,2,23~2,2,23
0,4,144~2,4,144
7,6,33~7,9,33
7,4,88~7,5,88
8,1,295~8,4,295
5,5,142~8,5,142
2,4,143~4,4,143
9,4,213~9,4,215
5,1,267~5,2,267
1,8,7~1,9,7
2,3,307~2,3,308
5,1,131~5,3,131
4,1,42~4,3,42
2,1,260~2,3,260
4,0,315~4,2,315
1,3,143~1,3,143
9,5,81~9,7,81
0,1,134~0,3,134
6,5,138~6,6,138
4,8,152~4,8,154
8,4,310~9,4,310
2,7,251~5,7,251
6,3,252~8,3,252
4,7,287~4,7,289
8,6,186~8,8,186
9,2,62~9,4,62
9,3,50~9,6,50
2,8,46~3,8,46
8,5,249~8,5,251
2,0,27~3,0,27
2,4,74~5,4,74
4,1,209~4,3,209
3,8,67~5,8,67
5,1,68~7,1,68
4,9,229~6,9,229
5,9,132~7,9,132
1,3,42~1,5,42
0,2,85~2,2,85
7,9,287~8,9,287
6,0,45~8,0,45
6,9,173~6,9,176
0,9,291~2,9,291
3,2,196~3,4,196
7,4,10~8,4,10
1,2,171~3,2,171`;

go();
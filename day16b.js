'use strict';

let go_do = (beams) => {

	let data2 = [];
	for (let i = 0; i < data.length; i++)
	{
		data2[i] = [];
		for (let j = 0; j < data[0].length; j++)
		{
			data2[i][j] = 0;
		}
	}

	// 1000 ->
	// 0100 <-
	// 0010 ^
	// 0001 v

	data2[beams[0][1]][beams[0][0]] |= 0b1000;

	debugger;
	let escape = 0;
	while(beams.length)
	{
		let new_beams = [];
		for(let i = 0; i < beams.length; i++)
		{
			let beam = beams[i]
			let apparatus = data[beam[1]][beam[0]]
			if (apparatus == "\\")
			{
				if (beam[2] == 1 && beam[3] == 0)
				{
					beam[2] = 0;
					beam[3] = 1;
				}
				else if (beam[2] == -1 && beam[3] == 0)
				{
					beam[2] = 0;
					beam[3] = -1;
				}
				else if (beam[2] == 0 && beam[3] == 1)
				{
					beam[2] = 1;
					beam[3] = 0;
				}
				else if (beam[2] == 0 && beam[3] == -1)
				{
					beam[2] = -1;
					beam[3] = 0;
				}
			}
			else if (apparatus == "/")
			{
				if (beam[2] == 1 && beam[3] == 0)
				{
					beam[2] = 0;
					beam[3] = -1;
				}
				else if (beam[2] == -1 && beam[3] == 0)
				{
					beam[2] = 0;
					beam[3] = 1;
				}
				else if (beam[2] == 0 && beam[3] == 1)
				{
					beam[2] = -1;
					beam[3] = 0;
				}
				else if (beam[2] == 0 && beam[3] == -1)
				{
					beam[2] = 1;
					beam[3] = 0;
				}
			}
			else if (apparatus == "-")
			{
				if (beam[2] == 1 && beam[3] == 0)
				{

				}
				else if (beam[2] == -1 && beam[3] == 0)
				{

				}
				else if (beam[2] == 0 && beam[3] == 1)
				{
					beam[2] = 1;
					beam[3] = 0;
					new_beams.push([beam[0], beam[1], -1, 0]);
				}
				else if (beam[2] == 0 && beam[3] == -1)
				{
					beam[2] = 1;
					beam[3] = 0;
					new_beams.push([beam[0], beam[1], -1, 0]);
				}
			}
			else if (apparatus == "|")
			{
				if (beam[2] == 1 && beam[3] == 0)
				{
					beam[2] = 0;
					beam[3] = 1;
					new_beams.push([beam[0], beam[1], 0, -1]);
				}
				else if (beam[2] == -1 && beam[3] == 0)
				{
					beam[2] = 0;
					beam[3] = 1;
					new_beams.push([beam[0], beam[1], 0, -1]);
				}
				else if (beam[2] == 0 && beam[3] == 1)
				{
	
				}
				else if (beam[2] == 0 && beam[3] == -1)
				{

				}
			}
		}

		beams = [...beams, ...new_beams];

		for(let i = 0; i < beams.length; i++)
		{
			beams[i][0] += beams[i][2];
			beams[i][1] += beams[i][3];
			if(
				beams[i][0] == -1 ||
				beams[i][0] == data[0].length ||
				beams[i][1] == -1 ||
				beams[i][1] == data.length
				)
			{
				beams.splice(i--, 1);
				continue;
			}
			else if (beams[i][2] == 1 && beams[i][3] == 0)
			{
				if (data2[beams[i][1]][beams[i][0]] & 0b1000)
				{
					beams.splice(i--, 1);
					continue
				}
				data2[beams[i][1]][beams[i][0]] |= 0b1000;
			}
			else if (beams[i][2] == -1 && beams[i][3] == 0)
			{
				if (data2[beams[i][1]][beams[i][0]] & 0b0100)
				{
					beams.splice(i--, 1);
					continue
				}
				data2[beams[i][1]][beams[i][0]] |= 0b0100;	
			}
			else if (beams[i][2] == 0 && beams[i][3] == -1)
			{
				if (data2[beams[i][1]][beams[i][0]] & 0b0010)
				{
					beams.splice(i--, 1);
					continue
				}
				data2[beams[i][1]][beams[i][0]] |= 0b0010;
			}
			else if (beams[i][2] == 0 && beams[i][3] == 1)
			{
				if (data2[beams[i][1]][beams[i][0]] & 0b0001)
				{
					beams.splice(i--, 1);
					continue
				}
				data2[beams[i][1]][beams[i][0]] |= 0b0001;
			}
			
		}
	}
	//data2.forEach(el=>console.log(el.join("")));
	let sum = 0;
	for (let i = 0; i < data.length; i++)
	{
		for (let j = 0; j < data[0].length; j++)
		{
			if (data2[i][j] > 0)
				sum++;
		}
	}
	//console.log(sum);
	return sum;
}

let go = () => 
{
	
	data = data.split("\n").map(el=>el.split(""));
	data.forEach(el=>console.log(el.join("")));

	let results = [];
	for (let y = 0; y < data.length; y++)
	{
		let beams = [[0, y, 1, 0]];
		results.push(go_do(beams));
		beams = [[data[0].length-1, y, -1, 0]];
		results.push(go_do(beams));
	}
	for (let x = 0; x < data.length; x++)
	{
		let beams = [[x, 0, 0, 1]];
		results.push(go_do(beams));
		beams = [[x, data.length-1, 0, -1]];
		results.push(go_do(beams));
	}


	let max = 0;
	results.forEach(el=>{
		if(el > max)
			max = el;
	})
	console.log(max);
}

let data2 = String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`;

let data = String.raw`\..\......-.....-..-./...........-......../.........................\........../.........\....../.........||..
|...../............|...\.............\.......\............/..............-.../.........\......\\....\.........
...............|...................../..|.....\.\....|.........../......................../-......-.....\-|...
..........-...................................-..\....\.......|.......|.-....|.../.../.......-.....\-.........
|................-......................-............./.......\.............\................................\
\|.............../........................\......|.|..............\.........-...-....-.....\...........-......
...............|..-............|..........|..|./-....|--.............-.../..........................\......|..
.....-|.............................\\...........-.........||......|....-..-.......-..............-\..........
...\....\......|.......\|.......|...........-.......-.....\......|..........|.........\.......\...............
...........\.../........|.|............\./.-\...././...........\...\............../-......//|...\.............
.............\......-...../.................|....../.................................--.-..............\......
..-..../....-............|................./................../......\...../......-................./........|
..\......\............................\..||....\......................-..................../.|..|.../../\...|.
..|.........\...../................/...............\......|..............\.........-..\.............../.....-.
....\.................\-......|.-..-..-..|...............-.-..\.......|...................../.................
............../...........-..\..|.................|......\..|.......\.-..-.../.......|....-..................\
........../.....-......./....-...\..................|....|../..|....../-.........|....../.........../..|\|/...
...............................-......\........................./............|..\..................|.....|...|
....\............|............/..................\-.......\...............|......................-.........|/.
-.......|...................\..\......|./............................//.|.....-.............|.........|...|...
............-...|.......-../\......../..........|.-.........................-.................................
............../.....-......|./..............................\.\../\..................-........................
...........................-...............................................|.......\................|.......\.
.-.........-...\...........|......./...|........|.........|-|.................\............/..................
....\....-...|--...-.|............../..-........\....................../\.................-........-..........
......|..................-......\|.......|........-....\..........|.............-.............\../....../.....
..............-.|.|.........-..........\............./-.....\............-..\..\..........|.......--..........
...........|.............-............|....-......\......./.....||-...........|.|-........./....|..|...-...../
..../.......-|..........|.................................-......\.................-...|...............-......
..|.|\.........................../.....................|.......-........../......-\..|...-..|....-..........-.
.../....\........-.....|...-...-.|....../.........../......|.............\...\...../...........|.\............
...............................\......\..-.\......................\................../....|\......|..........-
....|.................--............//....|.....|.....-..........-.......................................|....
........-.........................\....../...................|\..........|........|.................-...-.....
............-...../.-..........-.............\................/.......\...........|.......|............/..-../
.\.-............................/...././.........../............\......-......................................
.....-....-.-|......./...................../......../....../..........-.................-..............-|.....
.....\.-...-................../..-................|............././..........................-..../......\....
......-....\.........-.....|.........\.............../...............|...../.|.........../................\...
..|...\.............-....../.......................|.......-.............|....................../|............
...........|..............-........./...............................\................\/...|-.............-....
......-......\.....\...........|..................................-......./............................\......
....|...................../.....................................-/\..............-.............\\.............
.....|....-.........-.-..../...................../......................................./|......./....../....
../...................-\........../-..|..-..|........./................|...........-...............\..........
..\......./............\....\.......--...\...............-..\......-....................\.|....|..........\...
../........../.../|....|..|.............../..../.....-..-........................................\|../........
...\.................-...|..................|................//............\.........\........-/..............
..............\/..........................|........||...............|.....|....\....\...../...-.|./.....\.....
......\....................|......................-.\....-.......................-...../.|......./..../....\..
............................-......................|./..-|....\.-..|..........-.................\...\./|......
...................\............................../...................|.....-./...../...........-........\....
.....|.\.......|..-.......\.........................\......../......../.../.|.............-........../........
................./-................................................-/......\\............-.........|..-.......
.............\../.|.................................-.........|./.....................-........\\..\.....-....
\......../..............-/................\.............|...|.................................../..\..........
................./.......................\....-......................../...\.|..|.............................
/...........\........|..........\..........................\.......................-..../.......|........../..
.......-..|......./................\...................................|............../.\..........\....../...
......................./.|.................|........-|...............\.|...-..................|...|......./...
-.|.......-./.................\.....|.................................................|..\.........\..........
.|..-............/.|............/|-..........\..................-..../...............\......./../..\.-........
........\.-..\\.......\...../..|......-.-..\.....\/................................/..........-.....\|...../..
......./../../\...................-........./...-....\......\........................\............|...-.......
.-....|.....\......\.....|.|...../.........\..\....................|...........\...|....................../...
.............../...../.........|....../....-....................|.....................\.......|...|...........
....\........../--|............../..............-.....|....\....-.-................................./.....\...
........|....\.........../........|..|......|...................-..\.../......../............\.\...../........
../.....|............................/......................./.......\........\.........../...........\../.\..
....|..\...../.\.........................................................................\....................
/../.........................|||...........|...\-.\../......\..-............-.../.....-.|.....................
.................|...............|...................................................................-./......
...|../.....................\...................-......|/............................................\.//../..
|./........-........./....\...............|.........................|......|........|.\....../............../.
........\................|.|....................../............|......\.......................|.......-.......
-...........|.........|/......|/....................-..................-.....|....|./.........................
.........\..../..|..../...\.....|........-.....-..|../.-.........................|............................
........|.-/.....|.......|......././.........................-...............\......-.....|...................
.-...................|.......\..........................................\-../.................-............|..
..-..................../........../..........\.........................-.................-..../-.........|....
........\.........\...........-|......../...-........-............\\/...........|..|....../.../............\.\
................................\.....\.-..............-................./...................|..............-.
................\.|..\/......\.||................-.........|.....................\.|................-.........
...................-................\.............-|......./............|.-.............|..................|..
........|...|...-.\.............\..................|..-|.............\........\..-.....\....................-.
..../........./\.....-.......\..........|..|...-........................................|.....................
.-...-.....-\............-|../...\.........../....-............./..........|................................./
......\.....|.|\...../...|..............\...................-.................................\............\..
.........................|..-..............-...|........|......................-..............................
...../..\................/...............-......\.............|.......-.......|\............./.\..-...........
...../.\.......\.............\.......................................-...\.....//......\......................
.....-..\.../.-......|/../../........|...........-...\|..........-.............../.......|..\................/
............\.....\.../......\..............|....../........\./..-..\....\....-...............................
....................................-./................................\.............../............/\...../.-
..................-\...-..\....-......................-.....................-............-............./..\...
.......\..............\......-......|...|/......................................................\.|..|........
.........-|............./.............../..............-..................|...............\................/..
..............\.............\-......................\.../-|.................../...........|.............|.....
..............-......................../......--.................|-....\..|............./.....|.....\....-....
........|....../...................\....\.......-|.......\..........|...................................\.//..
.............|..........................-..........\......................-.......-......./............./.....
..-.\-................................../\...|....-\....|...............\........./.........../....|..\....../
....-....\...-../.......|...../...\........................-...................-.|........../../......|......\
..................\.|............................................./|..................--......................
....|../........./...-..-.........../.../......................\....../................\\.............-.../...
..\....|............|...................................../.....\.....|....\.|...................\............
..............\.......................\.........-............|./..../--|.........................-...-........
......................../...............................................................................\|/...
..............................................-..-...\........................|-....................\.........
........./..........-...../..........|................................\................................/......`;

go();
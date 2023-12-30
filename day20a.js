let go = () => {
	data = data.split("\n").map(el=>el.split(" -> "));

	let modules_ff = {};
	let modules_cj = {};
	let state_ff = {};
	let state_cj = {};

	let broadcaster;
	for (let i = 0; i < data.length; i++)
	{
		if (data[i][0][0] == "%" || data[i][0][0] == "&")
		{
			let original = data[i].shift();
			let destination = data[i].shift()
			data[i].push(...destination.split(", "));
			data[i].unshift(original.substring(1));
			data[i].unshift(original.substring(0, 1));
		}
		else if (data[i][0] == "broadcaster")
		{
			broadcaster = data.splice(i, 1);
			broadcaster = broadcaster[0][1].split(", ");
			i--;
		}
	}
	for (let i = 0; i < data.length; i++)
	{
		if (data[i][0] == "%")
		{
			modules_ff[data[i][1]] = data[i].slice(2);
			state_ff[data[i][1]] = false; // false == off
		}
		if (data[i][0] == "&")
		{
			modules_cj[data[i][1]] = data[i].slice(2);
			state_cj[data[i][1]] = {}; // false == low
		}
	}

	let ff_entries = Object.entries(modules_ff)
	let cj_entries = Object.entries(modules_cj)

	ff_entries.forEach(el => {
		let key = el[0];
		let values = el[1];
		values.forEach(el2 => {
			if (state_cj[el2])
				state_cj[el2][key] = false;
		});
	});
	cj_entries.forEach(el => {
		let key = el[0];
		let values = el[1];
		values.forEach(el2 => {
			if (state_cj[el2])
				state_cj[el2][key] = false;
		});
	});

	///////////////////////////////////////////////
	// begin processing

	let queue_rcvs = [];
	let queue_snds = [];
	let signals = [];

	let low_pulses = 0;
	let high_pulses = 0;
	let button_presses = 0;
	let stop_flag = false;

	let proc = () => {
		debugger;
		while (queue_rcvs.length)
		{
			let cur_rcvs = queue_rcvs.shift();
			let cur_snds = queue_snds.shift();
			let cur_signals = signals.shift();

			let next_rcvs = [];
			let next_snds = [];
			let next_signals = [];

			while(cur_rcvs.length)
			{
				let cur_rcv = cur_rcvs.shift();
				let cur_snd = cur_snds.shift();
				let cur_signal = cur_signals.shift();

				if (cur_signal)
				{
					high_pulses++
				}
				else
				{
					low_pulses++;
				}

				// handle flip-flop

				if(modules_ff[cur_rcv])
				{
					if(cur_signal) // high
					{
						// do nothing
					}
					else if(!cur_signal) // low
					{
						state_ff[cur_rcv] = !state_ff[cur_rcv]

						if (state_ff[cur_rcv]) // off->on
						{
							modules_ff[cur_rcv].forEach(el=>{
								next_rcvs.push(el);
								next_snds.push(cur_rcv);
								next_signals.push(true);
							})
						}
						else if (!state_ff[cur_rcv]) // on->off
						{
							modules_ff[cur_rcv].forEach(el=>{
								next_rcvs.push(el);
								next_snds.push(cur_rcv);
								next_signals.push(false);
							})
						}
					}
				}

				// handle conjunction

				else if(modules_cj[cur_rcv])
				{
					state_cj[cur_rcv][cur_snd] = cur_signal;
					let all_high = true;
					Object.values(state_cj[cur_rcv]).forEach(el=>all_high&=el)
					if (all_high)
					{
						modules_cj[cur_rcv].forEach(el=>{
							next_rcvs.push(el);
							next_snds.push(cur_rcv);
							next_signals.push(false);
						})
					}
					else if(!all_high)
					{
						modules_cj[cur_rcv].forEach(el=>{
							next_rcvs.push(el);
							next_snds.push(cur_rcv);
							next_signals.push(true);
						})
					}
				}
				else
				{
					//console.log(cur_rcv, cur_snd, cur_signal);
					if (cur_signal == false)
					{
						console.log(button_presses)
					}
				}
			}

			if(next_rcvs.length)
			{
				queue_rcvs.push(next_rcvs);
				queue_snds.push(next_snds);
				signals.push(next_signals);
			}

		}
	}

	let push_button = () => {
		queue_rcvs.push([...broadcaster])
		queue_snds.push(broadcaster.map(el=>'broadcaster'))
		signals.push(broadcaster.map(el=>false))
		low_pulses++;
		button_presses++;
		proc();
		// console.log(state_ff);
		// console.log(state_cj);
	}

	for (let i = 0; i < 1000; i++)
	{
		push_button();
		if(stop_flag)
			break;
	}

	console.log(low_pulses, high_pulses)
	console.log(low_pulses * high_pulses)

	


}

// % flip flop 
	// off default
	// ignore high pulse
	// flip on low pulse
	// if off->on send high pulse
	// of on->off send low pulse

// & conjunction
	// remembers the type of the input pulses
	// remembering low default
	// 1st update its memory
	// if remembering high for all input -> send low
	// otherwise send high

// broadcaster
	// sends same input pulse to all destination modules

// start with a single low pulse to the broadcaster

// pulses are handled in fifo order

///////////////////////////////////////////////

// example 1:

let data00 = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

// example 2:

let data0 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

// input data

let data = `%gv -> lq, pm
%rv -> jd, nh
%nh -> rs, jd
&vt -> tj
%zv -> pm, gv
%gh -> jd, vd
%hh -> bf, qm
%kx -> nf
%st -> pm, zc
%bh -> qm, pv
&sk -> tj
%hl -> nf, pn
%mt -> st, pm
&jd -> ts, gh, vd, dc, xc
%zm -> hm
%pv -> vv
%zf -> nf, cz
&xc -> tj
%bf -> qm
%ts -> sg
%ht -> ch, nf
%pb -> rv, jd
%nx -> fc
%mb -> mt
%mh -> jd, pb
%lc -> bh
%xg -> mb, pm
%vd -> dc
broadcaster -> gh, dl, xg, fb
%sg -> mh, jd
%qq -> ts, jd
%dl -> nf, sv
%vv -> sm, qm
%zc -> tb
%sr -> zv, pm
%dc -> gb
%cz -> nf, zm
%rs -> jd
%hm -> nf, hl
%gd -> sr
&qm -> lc, pv, nx, fb, kk
&tj -> rx
%gb -> qq, jd
%xf -> zf
%tb -> lg
%sm -> qm, hh
%fb -> dr, qm
%lq -> pm
&nf -> zm, dl, ch, xf, vt
&pm -> sk, zc, tb, gd, mb, xg
%pn -> nf, kx
%fc -> xb, qm
%ch -> xf
&kk -> tj
%lg -> pm, gd
%sv -> nf, ht
%xb -> qm, lc
%dr -> nx, qm`;

go();
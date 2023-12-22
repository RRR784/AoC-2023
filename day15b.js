let hash = (str) =>
{
	let current_value = 0;
	for(let i = 0; i < str.length; i++)
	{
		current_value += str.charCodeAt(i);
		current_value *= 17;
		current_value %= 256;
	}
	return current_value;
}

let go = () => 
{
	data = data.split(",")
	// console.log(data);

	let results = [];

	let hmap = {};

	let boxes = [];
	for(let i = 0; i < 256; i++)
	{
		boxes.push([[],[]]);
	}

	for(let i = 0; i < data.length; i++)
	{
		if(data[i].indexOf("-") > -1)
		{
			let temp = data[i].split("-")[0]
			hmap[temp] = hmap[temp] || {hash:hash(temp), operations:[]};
			hmap[temp].operations.push(-1);

			let box_num = hash(temp);

			let ix = boxes[box_num][0].indexOf(temp);
			if (ix > -1)
			{
				boxes[box_num][0].splice(ix, 1)
				boxes[box_num][1].splice(ix, 1)
			}
		}
		else
		{
			let temp = data[i].split("=")
			hmap[temp[0]] = hmap[temp[0]] || {hash:hash(temp[0]), operations:[]};
			hmap[temp[0]].operations.push(temp[1]);

			let box_num = hash(temp[0]);
			let op = temp[1];

			let ix = boxes[box_num][0].indexOf(temp[0]);
			if (ix > -1)
			{
				boxes[box_num][0].splice(ix, 1, temp[0])
				boxes[box_num][1].splice(ix, 1, temp[1])
			}
			else
			{
				boxes[box_num][0].push(temp[0])
				boxes[box_num][1].push(temp[1])
			}
		}
	}

	console.log(boxes);
	//console.log(hmap);
	//console.log(results.reduce((a, c)=>a+c));
	let sum = 0;
	for(let a = 0; a < boxes.length; a++)
	{
		for (let b = 0; b < boxes[a][1].length; b++)
		{
			let part1 = a + 1;
			let part2 = b + 1;
			let part3 = boxes[a][1][b];
			sum += part1 * part2 * part3;
		}
	}
	console.log(sum);
}

let data2 = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

let data = `vvn-,dpf=4,dlm-,pc=6,rrlt=5,slk=2,tql-,xt-,th=2,thls-,hjnq-,tspf-,sgtjx-,dpqgcl=9,gg-,cnqm-,rt-,gl-,zx-,lnkrn=7,cznn-,kkmr-,xnb=8,xspnr=2,npbks-,ts=7,tkr-,qzpm-,knbq=9,njm=1,jbcjh=5,sshtt=9,dpgfv-,cftg-,ltfj-,ndq=5,nxm=7,rgjh-,zz-,csz=1,jzf-,sc=8,tk=4,xpd=7,rm-,mqvhh-,cbmv-,dj-,clcq-,dr-,kjm=3,fcm-,hkc-,xxhr-,kkgx=6,tql=3,zsh=6,zdd=3,tk-,mmq=9,shjl-,zsb-,klb=7,zdd=1,qbmj-,dpf-,qp-,hqlt-,qmpjt=6,cqc=4,ntlms=5,dqtchc-,fshzch=7,lhsn-,djrn=8,hjbxlp=4,px-,dq-,tq-,kg-,bhhj-,fxn-,zsh=3,mg-,dgb=6,jzf=8,dq=8,rrxg=6,lhsn=1,gg=7,hjnq=8,fs=1,knq=9,ql-,lrx=7,sk=9,xsv-,fs=8,dgb-,lgd-,pnq=6,ffs-,cx-,cg=7,gx=5,qpv=1,jl-,knq-,tspf=2,bgn-,xgl=4,gtc=6,gt-,sshtt=1,qxvl-,kq=2,dn=2,bf-,rrlt=5,frjr=6,bqk-,gtc-,xlr-,tbl=4,knbq-,grqrv-,tz-,vb-,qp-,zzrcm-,cx=9,kqvc-,ndq=4,cd=5,jzgqb-,zmcq-,kjh-,brp-,zmk=7,ntlms=1,hkc=3,rcmz-,pdz=4,qk-,sshtt=2,kqr-,fpr-,vl=5,nsj-,hjnq=3,vv-,bsf-,pls=6,fd=2,jtnz-,nbvdv=1,knbq-,rrlt=2,rrj=5,stt=6,vm-,fnz-,xfvf-,mx=6,scx-,cm=4,xxhr=8,gfdshl-,fshzch-,jcc-,nmc-,qcp-,tljb-,hjbxlp-,tql=1,sccp-,ct=3,sfm=8,lr=5,dq-,dvh=7,jtd-,khgl=9,kn-,nxjn=6,fshzch-,rnjsmh=8,tjzlq-,jd=3,xfvf-,xqq=3,khgl-,zzrcm-,tqn-,hjdj=4,rm-,rm=1,spq-,fn=3,gtc-,dd-,pkt-,sccp=7,lvj-,trs=2,dk=7,ncn=1,cftg-,krb=6,xzfkcp-,xxhr-,xhjd-,xdcj-,slk=3,scgl-,zgl-,pb-,csz-,bqk=6,fpz=4,prn=9,bvz=2,cznn-,vd-,tspf=4,pxtsds-,slr=8,qxvl-,sfq=2,xlvscf=1,vb=7,slm-,ckc-,dj=3,hjgj-,gc-,rp=9,slr=2,jxg=6,qmpjt=5,cg-,mb-,thgf-,kjhqz-,tljb=2,xj-,tj-,clcq=2,shjl-,br-,qmpjt-,np-,nj-,rxr-,zmcq-,dgv=2,ffs-,hg=5,ncn-,gz-,kkgx-,cmnv=6,chg-,ns=6,kz=2,cmnv=9,ll=7,gg-,tqfdx=5,bqk-,fq-,km-,zg-,fs-,dgspc-,pcks-,jls-,gzh=1,rvh-,xklv=9,pzp-,pkt=9,src-,sbtp-,crr-,lrx=4,rs-,zmk-,fpz-,ckpm=9,ckv-,gg-,scx-,bmr=2,gg=2,zmk=9,rb=9,qpv=7,dt-,dj-,krb=8,kkdmss-,xsv=7,bcn=5,dhn-,tljb=6,zvg=7,nxjn-,bsf=1,thgf=5,bq-,cv=5,lnkrn=1,mhxkg=6,crr=7,ct-,scgl=9,vp-,fpz=6,qcp-,jxg=6,xxhr=7,kqr-,hrn=2,njm=1,kbpjjp=8,prn=1,tkx-,dh=1,tfnng=6,gg=5,dz=2,sjzhds-,dpgfv=9,hp=4,pdc=7,th-,tspf=8,kbpjjp-,tvh=4,fpkc=9,bnsm=4,vhr=9,cckp-,dz=2,xsv=7,gg=5,pb=5,zpk=6,lxg-,mqvhh=7,frjr-,kxx=4,ckpm=7,cjnhtt-,hxl-,tj-,jzg-,slk=6,hjnq-,pl=7,zx-,vgfh-,zkt=4,qfk=8,lrdz-,mvxz-,qk=1,qmpjt-,cbmv=5,dsnt-,cg-,zh=1,qcn=8,fnz=6,gx=9,gl=9,xqq-,pnq=2,rt-,kjm-,vk=2,dvh-,gtc=6,bcn-,gl=7,rzzr=6,blms=4,jxkm-,rrlt=7,nlh=3,hp=6,qpv-,fb=4,scc-,ms-,vvn=7,bqk-,jbqj=3,fb=8,rs-,gr=4,gg-,kkxs=8,krb=1,tfnng=2,slx-,thgf=3,sq-,ksl-,pdz-,vdmgt-,dhn-,dh=5,qcn=4,pxc=1,kjtcj-,kzsq-,bq-,tfnng=5,djjk-,bnsm=9,fk=9,jctsn=5,vzdf-,fd-,qxr=4,tg-,xt-,khgl=8,zvgp=5,mls-,gl=9,gf-,dxjgbx-,pn=9,lgl-,fcm=5,qxvl-,sfq-,pnq-,kf-,vxphg=1,csp=2,jp=8,qllxq-,kxx-,vkhvn-,lrx=4,gbmll-,dxjgbx=9,kjh=9,mr-,cmnv=8,scc-,blb-,ksbrz-,sccp=8,nfx-,jbcjh-,pnq=7,fz-,dz-,fnz-,zxf=9,mx-,xhc-,nkg=1,cd-,spq-,gfglr-,ck=2,pn=2,prn=1,fpz=1,cd-,slk=4,rrg-,chg-,dm-,chg=1,th=5,rrxg=2,xpd-,ffxcc-,lrx-,jc=6,kqjm-,zf=7,zd-,dm=3,zmcq=8,bcn=4,tqfdx=6,mg=2,kjhqz=6,dpqgcl-,nflrlh=3,qcn-,sshtt-,mp=5,sjzhds=2,dkk=9,klkd-,zz-,pkh=4,ll=3,zq-,jj-,rt=1,hq-,kbpjjp=3,hjbxlp=5,tbcl-,sztz=4,nxjn=1,sc=9,zgl=9,dj-,dr-,xlvscf=9,ls=4,sgtzqx-,zmk=5,dxcq-,fpkc=1,qxvl=8,cpm=6,gzgcn-,jl-,lph=4,qllxq-,fd=3,hfx-,ncn-,mvxz-,dfvp-,ljbs=3,dmhp=9,pdc=6,bbz-,npsqg-,sjv-,kr=3,fnr=6,qbmj-,fpkc=4,khgl=8,hgk=1,fxdj=7,kxx-,zvgp-,lbtl-,xt-,jj=4,nn=1,nxjn=5,zj=1,gbmll=9,vz=2,tglz=3,lph-,knvnq=1,jl-,lj-,brd-,xsv=4,rm-,ltfj=4,hd-,qrn-,jpx=5,rt=2,hdtk-,knvnq=3,qllxq=1,cftg-,md-,dvfqd-,qmpjt-,zmcq=3,slx-,fnr=6,dlm-,sshtt=6,jvd=3,nbvdv-,crr-,pcks-,dpgfv-,bs=5,fzdgj=6,qtt-,fb-,ckpm-,dbp=4,zsh-,cbmv=4,vv=3,kjhqz=9,zmk=7,frbnq=6,pbk-,sfq-,tq-,szx=4,jls=2,fc-,pdz-,hq-,ckc=2,fn=4,ctn=2,klpp-,kkdmss=7,bf=9,hqlt=3,qk=3,fvvz-,qtd=3,bcs-,dmhp-,ms-,thgf=3,bfkrj-,glx=9,xhc=6,rp-,dlm-,gt-,ppf-,gr=6,kqjm=7,gx-,tj=4,zlmp=4,jls=8,jk=3,cn-,rm=1,jj=6,qrn=9,sfm-,vm=3,mlk=1,fzq=7,rvtm=1,brd=1,gbmll=9,zd=1,gfglr-,mqvhh=1,knbq-,ffxcc-,gf=2,sjv=2,vp-,gzgcn=9,dn=2,mrl-,dhn-,cvmf-,fp=3,bhhj=1,gx-,rrlt-,tqfdx-,zpk=8,nxm-,np=9,vgfh=3,gbmll-,kjhqz=9,kbpjjp=9,klb=8,bch-,jxkm-,kvt-,gzh=3,dpqgcl-,zfccb-,xgl-,vz=7,gc-,knvnq=8,qg=9,mlk=6,dqkzpr-,bjh-,gz=3,ts-,jrpj-,kr=8,tljb-,pdz-,ggg-,tq-,ltfj=4,fpr=6,scx=2,qqs=9,gspn-,mmq-,qb=8,gc-,kq-,klb=5,hq=3,zh=2,rx-,klb-,gz=3,dpq=5,brp=3,njm=7,pxtsds-,cpm-,fvvz-,ffs=3,rb=5,jvd=9,qllxq-,nlh=2,cnqm=5,vhr-,pzp=1,npbks-,rp=3,xj=2,zlmp-,jzf-,tq=6,nkg=4,cjnhtt-,kqjm-,rjs=2,rghk-,ndq=2,lgl=8,bch=8,klb-,cftg=7,gc=3,klb=3,cpm-,nxs=1,dhn-,zmcq=7,qk=9,rm-,mkpkb-,zkt-,csp-,clrsv-,rgjh-,fvvz-,thgf-,zvz-,rp-,ft=8,qdb=5,zsh=3,tcn-,bgn-,kq-,nljq=1,stt=2,lz-,hdtk=7,zxf=8,dz-,jd-,xbg-,zvg-,jbcjh-,dm-,rb-,hbdpf-,zzrcm-,nljq=6,prn-,gtc=3,fn-,rrg=3,ggx-,dpf=6,zxf-,grqrv-,mmq=3,fp-,rb=3,qxr=6,cm-,tcn=9,tbcl=4,zfccb=7,br=1,ksbrz=3,jrpj-,dk=4,lph-,bq=4,ql=5,hfx-,sc=6,tb-,hjbxlp=4,sjv=4,ntlms-,qb=4,sjv=4,dxjgbx-,pn=1,dhn-,mb-,fl=8,jzf=8,rghk=3,cn=1,dd-,rrj-,nsj=8,bszppc-,tqvh-,dpq-,thgf-,zpk=9,dvfqd=9,fpr-,qtd-,pb-,sb-,xspnr-,lz=2,ccdd-,vkhvn=4,rvtm-,hg-,bktqlq=8,sgtjx=3,gl=3,fq-,cnqm=5,nxs=4,ml=9,qfk=6,ngv=5,dr=7,tbl-,bjl=5,hbxg-,gzgcn-,hjnq=7,jxg-,jc-,gl=6,knbq-,dpgfv=5,kpr=8,zsh-,zsb-,jl=9,zg=9,bf=1,ffs-,bfkrj=8,mjlktq-,slx-,pn-,tvh-,hp-,lxg-,prn-,trs=5,csz=9,qzpm-,mvxz=7,cpm=5,gf-,bqk=1,rrlt=1,mrl=5,fvvz-,rvh=4,csz=4,zmk=9,zg=9,lz-,scgl-,rvh-,cd-,zsl=6,zxf-,jc-,hbdpf-,xh=9,qtd-,tbl=4,xpd=4,dj=9,jzf-,scb-,jk=2,gzh-,gzz-,kqs-,npsqg-,zh-,ct=5,jbcjh-,dq-,fzbxr-,zdd=6,ksbrz=1,fs=5,rnsp=6,kg-,gspn=6,jxg=1,npsqg-,xtk-,qcp=2,gzz=8,gf=4,khgl=2,rx-,rvh=5,slk-,vv-,pmrs-,jtnz=2,jbqj=7,nxm=4,zx=5,sdchxz-,bvz-,frbnq-,dgspc-,cg-,hl-,qbmj=7,hh=9,qv-,qcn=4,vbl=9,ml-,pkt=6,th=8,hbdpf=3,knb=9,tl-,vp-,mqvhh-,zf-,dpgfv-,xhc-,fpr-,sshtt-,gl-,qcx-,gl=4,vz-,ggg=1,vhr-,scb=2,bjh=6,csz=8,nxjn-,cv=6,fxdj-,qcx=3,kqvc-,bnsm=8,kqr=6,njd-,dpf=9,vd-,dvfqd-,mlk-,cm=8,zz=4,mmq=1,rnsp=1,jbcjh=7,bh=5,bjl-,qfk-,zf-,pdc=5,dg-,nmc-,dn-,xdcj=2,fshzch-,slm-,kg=3,km-,rp-,bmr-,jvd-,slk=2,tq-,nxv=2,bn=3,zxf-,rnjsmh-,gzz=7,scb-,kr=2,xcz=3,mkpkb=4,mj-,cm-,zd=7,xj-,xj-,nbvdv-,mvxz-,ck=2,xpd=4,chg-,prn=8,klpp=9,hjgj-,ffs-,kckfh-,mjlktq-,vb-,fzq=7,mfd-,ljbs=4,gfglr=5,sfq=6,cbmv-,mcx-,gzgcn=6,fshzch=5,vkhvn-,xhjd=7,nlkb=5,bgn-,vm=1,khgl=4,xbg=2,zdd=2,jg-,tl=5,xbg-,xb=5,pc-,fpkc=8,vdmgt=5,tqfdx=3,jzgqb=5,nxm-,knvnq=2,bbz-,lbtl=4,jpx-,gbmll-,xzfkcp-,fpkc-,ck-,gfdshl-,sds-,fl-,xzfkcp=8,hjbxlp=8,zpk=2,xfvf=2,nxv=9,qzpm=9,qjps-,dlm-,tljb=3,cjnbx=8,cmnv=6,kjtcj-,zvg-,cbmv=4,dd-,gfdshl-,rvtm=3,lz=8,fpr=1,tk=3,kkdmss=1,hq=2,tdf-,jbcjh-,tfnng=2,zfb-,fvvz-,qxvl-,kpnl-,sztz=2,khgl-,qk-,cckp=4,nflrlh=4,lvj=8,rfm-,vzdf-,hqrrsc=9,kkmr=3,xhc=1,mfd=1,zdd-,zfb=8,xj=7,qtt-,zgk-,nsj=8,knq-,nxjn-,qfk=7,zzrcm=4,vl=4,lvp=7,fp=4,prn-,kn-,shjl=3,dd=4,qn=3,mjlktq-,dgv-,cf=4,nflrlh-,kq-,dfvp=6,fkzp=6,blb=5,ck=3,hrn=3,smj=2,mls=7,thls-,bb-,gbmll-,fpkc=5,sbtp-,fd-,frjr=5,bsf=8,knq-,dlm-,jmt=8,pzp=4,csp=9,pxtsds=1,lhsn=8,dz-,mg-,jdt=4,kjhqz-,sccp-,tq=3,hg=2,lvj=1,xhjd-,hqlt-,hknn-,hl-,sc=9,qp=8,tg-,rgjh=4,qdb=3,nxjn-,lz-,scb=8,kg-,sdchxz-,fb=5,qtt=5,bq-,tqvh-,cx-,mrl-,qqs=1,gfdshl=7,cckp-,mf-,zsb-,pmrs-,zdd-,xj=5,jvd-,rzzr=4,cjnbx-,jcc-,bq=3,bgx=3,rcmz=7,mr-,ccdd-,tcn=8,dkk-,qk=5,cznn=9,tglz=8,mksl-,jcc-,ggx-,thgf-,qjps-,sjzhds=8,tbl-,ppf=7,kjm-,jd=8,slx=1,xt-,rxr=3,lj-,sjv-,lz-,sc=5,tj-,vkhvn=4,hknn-,bmr=5,zvz=7,hxl=3,xdcj-,hjgj-,rgjh=1,bvz-,xpd=8,qtlhv=3,bq=4,zpbdc-,dj-,mjlktq=3,thgf-,sfq=8,dpq-,kqr-,ngm=1,bfkrj-,xgl-,ptch-,lrdz-,cmnv-,crt-,dg-,thls-,vm-,stt=7,nlkb-,gspn-,mj=9,zgk-,kjm=2,zlmp-,klb-,bhhj-,dh=1,bktqlq=9,ffs-,fl-,rn-,nxjn-,zbn-,fxdj=8,jcc-,fq-,dhn-,knbq-,scb-,sk-,frbnq-,zgk=6,fd-,vz=2,scx=3,tkx-,dgspc=9,tkr-,stt=2,qcn=7,ctn-,gzgcn=8,dgb-,fcm=7,ntlms-,bjh=4,xn=3,kkgx-,tcn-,crt-,crr=3,hg=6,pshlmt-,zfccb=1,vbl=8,zbn-,hjdj=8,bgn=1,mf-,vhr-,dt-,qqs=3,tcn=5,kg=1,fk=8,slm=6,mkpkb-,pkh-,bsf-,tb=3,hh-,rvtm-,kr=9,ksbrz=9,rm=2,zdd=5,gfglr=2,sbtp=5,jn=8,xrtf-,scgl-,qpv-,bfkrj-,zsh-,dbp=2,bcn-,kqvc-,mvxz=9,bb=2,scx-,fxn=6,bch-,jg=8,blh=7,fpr-,rfm-,fpz=9,qb-,sfq=6,xtk=7,pnq-,hkc-,lhk-,blh=7,pnq-,hd-,xrtf-,rgjh=7,ls=2,kjm-,mlk=7,klpp-,zzrcm-,vp-,zq=2,zlmp=7,kqs=3,csp-,mf-,fz=7,scx=5,zxf-,bch-,rn=7,dgspc-,nljq-,lr-,csp=5,xhc-,bqk=1,sds=8,tjzlq=7,cjnhtt-,klkd-,gzz-,kk-,jg-,bjh-,bnsm-,vb=3,dvh=9,kq-,xnkj=1,nmc=8,bvz-,kkmr-,pl-,crr=4,lhsn=5,qllxq=4,hxl-,tl-,zxf-,thgf=3,tk-,xj=5,pxc=4,jxkm-,rp=5,rvh-,bsf-,knvnq=6,tspf=6,spq-,tz-,np=1,jls-,blms-,dqtchc-,kzsq-,zvg-,fpr-,mkpkb=4,zsl-,rg=5,spq-,dn-,kr=9,mvxz=3,tk=7,dvh=7,jctsn-,lj-,kjh-,xb=2,gt-,npbks-,jls-,fvl=2,mf-,lph=6,dpq-,xnkj-,bgm=6,zj=1,tl-,lph-,gf-,pdz=9,vhj=6,gzgcn-,sds-,hqlt-,sccp=4,vvn=3,gg=2,jxkm=7,mvxz-,tspf=4,pls-,clrsv=9,lrx-,qbmj-,lgl=8,ncn=2,lgd-,stt=4,ffs-,kzsq-,kckfh-,br-,vl-,slm-,flnqg-,kkmr=9,bcn-,fxdj=8,qb=5,tkx-,zxf-,mr-,ksl-,jk-,jzg-,npsqg=6,blb-,fkzp=9,sztz=1,kg-,jg-,bjh=4,cckp-,xn-,zmcq=9,kqjm-,knvnq-,qv=4,scx-,xgl=9,kvt-,bch-,lph=7,knb=1,jbcjh=3,dpf-,jxkm-,mr=8,cf=8,zvg-,gf-,tql=6,fvl-,tspf-,mqvhh=8,vkhvn-,br-,rghk-,fzq-,rxr-,hjnq=2,fp-,vm-,fvl-,fxdj=7,zfb=8,pzp=7,nflrlh=7,tcn=2,pcks=5,vdmgt-,hdtk-,fpr=2,cg-,fs=9,blms-,gg-,bqk=3,qrn-,dgb=2,mr-,ccdd-,vd=7,gl=1,rrj=2,vkhvn=3,tj=4,sn-,pc=6,ljbs=5,qzpm=9,dvh=2,xrtf=9,nfx=1,jc-,mj-,fpkc=8,dgspc-,ggx=5,vbl-,rs-,blh=1,tqfdx=1,kqjm-,csz-,xg=6,rs=2,chg-,pkt-,xfvf-,jrpj=3,hkc-,vv-,fkzp=4,ns-,cv-,sq=7,pn=8,ljbs=2,scgl-,scgl-,zpbdc-,pn=5,zsh=8,sshtt=5,qk=7,sjv-,jctsn=8,jdt=2,zh=3,tvh-,crt=2,zvgp=1,nljq-,pnq=4,bcn-,zbn=4,sq-,fzbxr-,grqrv-,scc-,knq=4,rm=4,kqjm-,zh=4,mb=3,jj=5,xhc-,hr=5,bch=9,zgl-,rrj=6,dj=9,th=7,bhhj=6,fcm-,qzpm-,nlkb=4,djjk-,dpq=3,tkx-,zvbgvg-,zn-,sdchxz-,klkd=6,brd=4,tljb=3,mj=8,kxx-,qxvl-,jp-,qbmj=7,dg=9,fxn-,zbn-,bgm=7,tl=3,ts-,bzjk-,mx-,frjr=7,hrn=5,md=1,kr-,spq-,gfdshl=1,kn=7,qcp-,sshtt-,kkdmss=9,gx-,pdz=3,xqb=6,nlh-,pkt=1,kjh=5,dgv=8,tglz-,kg-,bvd-,zsb=4,fpz-,glx=8,blb=4,pxtsds-,jxkm=7,glx-,gfglr-,gzh-,zgl-,pshlmt=5,rhr-,dsnt-,dk-,hjbxlp=8,jl-,mf=2,bjl-,qg=9,qjps=8,fshzch=2,hbxg-,zz-,bvz=6,dgv=6,vxphg-,xnb=9,rrxg-,shjl-,zxf-,zx-,ngm=7,vdmgt=6,tkx-,xg=9,xzfkcp-,dg=1,zx-,jvd-,pb=4,zpk-,zdd-,nkg-,ndq-,bvz=9,bnsm=2,ls=4,hh=8,gf=8,dd=4,mr-,dxcq=8,kpr=6,crr-,bfkrj=1,xh-,trs-,tcn=8,xg=4,jp-,rgjh-,jmt-,rnsp=1,sbtp=6,cznn-,rvtm-,fqb=1,fp-,spq-,kkgx=8,nxm=9,tkr=3,hdtk-,hbxg-,zvg-,ltfj=4,jk=4,hg=8,qjps=6,glx-,jzf-,tj-,slk=5,lnkrn=6,hgk-,sgtzqx=1,pxtsds=7,mb=8,vzdf=7,slr=2,zsh-,lrx-,knb-,hjnq=8,njd=1,trs=1,knb=1,fzq=5,ndq-,cg-,kjm-,kn-,tljb-,kjm-,ls-,knvnq=1,xcz-,mksl-,zx=9,dxjgbx-,mb-,ntlms-,pc-,zfccb-,crt-,gfglr=1,ns-,qn-,szq-,jk-,nflrlh-,jmxd-,fpz-,vzdf-,zmcq-,vbl-,pls-,qtlhv=7,tljb-,hl=4,ft=6,mf=6,frjr-,xtk-,vdmgt=8,qtd=2,cv=1,bsf-,hxl=8,vhj=9,clrsv=7,lgl-,mvxz-,kk-,xxhr=3,hgk-,tj=7,khgl-,tkr-,zn-,cbmv-,ctn=8,tjzlq=8,tbl=1,zlmp=9,jbcjh=3,jdt-,lj-,zpk=1,ck-,nd-,xn-,hrn=7,npbks-,ckpm-,vtbs=2,zsh=2,ljbs=3,rnsp-,fc-,dxjgbx-,trs=8,klpp-,sjzhds=9,nlh-,rrj-,xdcj-,vvn-,klb=6,jmt=4,qv=7,vbl=6,bvz=5,vxphg-,kkdmss=5,mcx=7,dhn-,pnq=4,dlm-,xlvscf-,scb-,pl-,kqr=5,ncn=8,ml-,zj-,fzq-,ndq-,qxr-,zd-,tj=7,zgk-,vv-,zvgp-,xtk=4,ck-,blb=4,rvh-,dqtchc=8,ctn-,jrpj-,vhr-,xhc=9,ft-,pkt=3,rgjh=4,xh=5,cbmv-,jcc-,nljq=7,xh=3,lghpq=1,jtd-,thgf-,mls=5,xpd=7,rhr=6,zpbdc-,jn=5,jmxd-,krb=8,xrtf=1,kkmr=7,tkx-,xxhr-,prn-,hr-,xtk=6,tspf=6,cftg=6,bhhj=6,rp-,lhk-,dz-,sq=6,dlm-,csz=4,csz-,ns=7,rt-,sbtp-,fs-,rp-,fl-,sjv-,kxx-,mcx-,kjtcj-,gtc=4,hfx=2,qxvl=3,scgl=5,knbq-,tbcl-,rd=8,jk-,md-,zz-,kjtcj=9,scb=9,dqkzpr=5,cf-,bgx-,vm=7,nflrlh-,hdtk-,qqs=5,xtk-,zvgp-,vv=5,xpd=2,md=7,xdcj=7,mf=2,tbcl=3,vd-,kxx=7,gg-,xfvf-,fs=3,mfd-,zbn=3,tl=6,qbmj=6,jls=5,pdz-,fz=9,hqrrsc=5,lfc=3,jdt=5,nd-,xbg=4,fc=4,hg-,hfx=9,bgn=9,ckv-,px-,kr-,vdmgt-,qrn-,zj=6,cnqm-,slx=8,qtlhv=9,qt-,pdz=9,zgl-,jvd-,scb-,sccp=8,tjzlq-,hl-,kbpjjp=6,vhj-,xdcj=4,pn-,jxkm-,rb-,kpnl=7,jzg-,vpnb=2,cd-,cf-,slk-,ft-,vv-,tk=7,dpq=1,sshtt-,cvmf=2,ppf-,dk=6,mf-,tk=9,kjhqz=1,vtbs=3,tvh-,lzmmc=5,lxg=5,ngm-,khgl=8,jp-,kvt-,tj-,sc=1,pzp=2,kjm=2,tqn-,sq=2,gzh-,hh=7,qcp=3,pc-,ls=2,jxkm=2,vl-,jd-,rm=1,tkr=7,gzgcn=6,qn=1,vpnb=8,pb=2,tg=9,fkzp-,gx=6,xhjd=4,npbks-,zz-,zfb-,lrdz-,sbtp=8,bb-,zfccb=5,vm=6,jpx=1,rm=4,kq-,fshzch-,qtd=3,sshtt=9,kzsq=3,qdb=5,cvmf=1,cf-,md=4,dg-,qtd-,gt=6,crr=5,knq-,lj-,xnkj-,ljbs-,ppf-,qb-,xn=9,gt=7,spq-,fq-,kn=5,qllxq-,jk=7,pkh=6,rp=1,gfglr=8,qdb-,qtt=1,ptch=7,gzh=7,zvcsg-,klpp=4,kjh=2,tbl-,sgtjx-,nbvdv-,cnqm=1,zzrcm-,lfc=8,sds=1,dpgfv=4,pn=1,np-,jls-,ls=7,gspn=8,vp=5,tfnng-,tqfdx=8,ksbrz=5,zxf=2,fvl-,sq=9,vd-,pshlmt-,dm=4,zsl=9,bcn-,cm-,sccp=2,nmc-,szx-,hkc-,crt=6,kz-,zd=7,qbmj-,fvvz=8,hfx=3,kf=9,xqb=3,px=1,cvmf-,dhn-,fp=5,jdt=1,fvl=1,bktqlq=6,bb-,ggx=6,txjxjh-,ntlms=8,fkzp-,kr=3,tkx=3,fb-,zzrcm=1,ml-,zf=6,xtk-,kn-,hgk-,zpk=4,hkc-,blh=1,ckpm=3,vd-,zxf-,kckfh-,jpx-,zvgp=7,ljbs-,cf=3,gq-,glx=7,xj=9,tz-,sdchxz-,sgtzqx-,cbmv-,jmt=1,vl-,dpf-,lfc=6,fxn=5,fn-,kpnl-,ckv-,lzmmc=8,dhn-,chg=1,zpbdc-,fzdgj-,nxv=4,fshzch=2,jzf-,bszppc-,px-,ctn-,mvxz-,rgjh=5,nfx-,qrn-,rt=4,xrtf=4,bq-,djjk-,gf=8,bhhj-,dvh-,pkt=5,dqtchc=7,hqlt-,hqrrsc=4,xqb-,lnkrn=8,xqb=4,slm=8,sshtt=3,tkx-,qtlhv-,jxg-,mjlktq-,qcx-,zz-,zx=4,xg-,lnkrn=3,bqk=4,fvl=9,fzq=1,bbz-,qvg-,lj-,fl-,lhk-,zfccb=4,xsv=6,pmrs-,cznn-,tl-,ptch=6,nn=3,gt-,blb=1,jdt-,pb-,xhc=5,kqjm=2,hgk-,dpq=2,cftg=6,kqvc-,pmrs=7,ksl=4,sk=5,rb-,kvt-,tvh-,px=4,xbg-,tspf-,rcv=4,br=5,jd-,qg=3,vl-,nxs=1,sjzhds=7,ft=9,gt-,qzpm=2,kjhqz=6,gfglr-,vvn-,slx=5,sfq=9,zdd=1,qfk-,sztz=2,qcp=3,kjm-,pxc-,shjl=6,zgl=5,xpd-,tfnng-,lph-,zkt=1,fn-,hknn-,cckp-,brd-,kf=6,tljb-,tk-,xcz=5,xzfkcp=8,ctn=9,hxl=9,jg=5,jz=6,kjhqz-,rcv=6,bcn-,zpbdc=5,lghpq=6,bzjk-,mlk=9,kqvc-,rb-,dxcq=1,fxdj=5,ft-,xcz=1,smj=6,vkhvn-,tfnng=5,mjlktq-,kqr=7,vdmgt=3,lj=3,pc-,ffxcc-,ffxcc-,bgn=5,jc-,hjbxlp=6,tjzlq=4,xfvf-,tbcl=1,np=7,tqn-,sn-,cjnhtt-,ct=6,sb-,dvfqd-,xcz=7,kxx=6,pmrs-,xqb-,njd-,trs=4,vhj-,bmr-,sgtzqx-,spq=8,xlr=2,rrxg=8,njd-,pxtsds=4,mp-,tj-,zkt=2,fshzch=5,bf-,qv-,jk=4,lgd-,fvl=6,dkk=8,cjnbx-,rrj=6,dxjgbx-,zz-,dm-,tbl-,nlh=7,vtbs-,gspn=8,xh-,rvtm=3,scgl-,tk-,ccdd=2,lr=3,dmhp-,xzfkcp=3,dgv-,zvgp-,dd=7,dj=3,clrsv=6,mg=3,jn=1,kz=2,pdc=3,pnq-,lrx=7,mj=9,hjdj-,knb-,ltfj-,pnq=9,hbxg=9,xlr-,bb-,tj-,rhr-,zvg-,scc-,rx-,vxphg=1,ckc-,xklv-,kjhqz-,mf-,pnq-,fxdj=4,vhj=9,rg-,lz-,qxvl-,sgtjx-,csp-,rrxg=4,ksl=3,lgl-,kn-,qpv-,fpz-,scc-,fc=7,sds-,zd-,sfm=3,gzgcn=3,bs-,njm-,mx=8,hh-,ql-,dfvp=4,mf-,jtd=3,kpr-,knq-,gl=1,jc=1,tqn=8,sbtp-,zx=2,pn-,smj-,mg=4,grqrv=6,dn=1,slx-,tqn-,rhr=2,sjv-,qfk-,dxcq=8,tjzlq=6,bh=8,hg=7,rhr-,qjps=4,qp-,gzz-,dqtchc-,hdtk=4,kbpjjp=4,jz-,hdtk=9,xpd=9,jp-,sjzhds-,fzq=7,brd-,qk-,tspf=5,xfvf-,dgb-,knbq=4,xhc-,scx=1,qcx=6,jls-,kjh-,fqb-,jls=8,ts=8,kk=2,tjzlq-,hkc-,tk-,cjnhtt=5,gtc=9,pc-,lnkrn-,cnqm-,kzsq-,fvvz=5,blb-,rvh=3,sbtp-,qpv=6,clz=2,sq-,frjr-,sfm-,jl=9,xhjd-,rghk-,nf=2,scgl-,kg-,brp=1,lph=4,jl-,tb-,qk-,vgfh-,zvg=4,bszppc-,fc=2,jc-,sccp-,dgv=2,tb=8,kkmr=9,sfm=1,bcn-,khgl-,pn=5,pb-,fl=7,jbqj-,dqkzpr=1,br=1,fxdj-,ksl=7,djjk=4,lbtl=2,rgh-,fk-,mkpkb=7,sds-,bgm=4,pshlmt-,ck=6,bvz-,hq-,lbtl-,nlkb-,khgl-,xzfkcp-,zsh=4,dj=7,cnqm=6,sq-,zvgp=5,sbtp-,kq-,fpz-,vd-,crt-,thgf-,mb=1,tb=4,mqvhh-,lr-,mcx=2,km-,sb-,fq-,cbmv-,zj=2,sztz-,csp-,pxc=8,kkdmss=1,bktqlq-,kpnl=4,xbg-,tbl=5,sccp-,zpbdc=2,nljq=5,vd-,zvz-,qdb=1,knb=4,tvh=9,dxcq=9,bgx=1,nj-,vpnb-,qtlhv-,hh=9,qcn=1,tfnng-,hgk=1,rfm=4,slk-,slx=2,sjv=1,dgb=4,cd-,mg-,rgjh-,mrl=1,vl=9,bcn=9,clcq-,dqkzpr=8,zg-,ls-,dt-,blh-,fz-,gg-,jcc=8,qpv-,vv-,jmxd-,vhj-,vp=8,njm=7,jzg-,hrn-,xqq=6,qllxq=9,mf-,bgx=8,njd=9,ct=6,gfglr-,cmnv-,lvp-,dz-,hg-,hr-,nmc-,jbcjh=5,scgl=1,ts=1,fpr=1,tqn=8,sshtt-,zd-,gt-,kqjm=6,bnsm-,zf-,pzp=6,zvgp-,qmpjt-,zvgp=2,fz=8,ltfj=8,mp=4,hjdj=5,zfccb-,bbz=2,ksl-,cpm=2,zn=5,sjv-,dr=3,klkd=3,ngv-,fb-,kckfh=2,ll=3,jz=4,ft=6,fzdgj=2,rrxg=1,bbz-,zpbdc=6,jbcjh=2,cckp=3,gtc=7,lrx-,qg=8,dd=8,ql-,cm=7,lbtl=8,jvd-,sc-,tjzlq-,kvt-,bszppc=3,rb=5,gl-,nxv-,vdmgt=9,tglz-,rgh-,hjdj=9,rnsp=6,nfx-,mvxz-,kqs-,vdmgt=5,xdcj-,pl-,gbmll-,sn=9,hknn-,zf=9,dh-,bszppc=6,qzpm-,njm-,tfnng-,pdz=6,smj-,tjzlq=6,gzgcn-,ksl-,dxcq=1,rgjh=7,xb=7,ft-,gzh=4,csp-,dpq-,rrlt=7,bs=1,sfq=5,fzbxr-,vpnb-,tql-,brd=1,zgl=5,dz-,cg-,lz=2,krb=5,hd-,lrx-,stt=5,knq-,hknn-,shjl-,xh-,vd=7,bs=9,dpgfv-,gzz=1,sbtp-,vxphg-,slx-,rnjsmh=7,jzgqb-,lph=6,rjs-,ngm-,sb-,lnkrn-,bq=1,tcn-,tljb=1,kpnl-,vgfh=5,jtd=1,zq=3,kf=9,bn=3,zvbgvg=1,kg=4,qb-,pzp=1,stt-,cx-,fb=2,km-,fn-,clrsv=2,fpr=9,jxkm=4,fz=5,sc-,zn-,bvd=9,djjk=2,ggg-,ffxcc-,djjk-,ct=6,hd-,fzbxr=3,ksl=2,md=3,jg-,djrn-,nn=5,ls=5,bcs=6,nlh=4,cnqm=4,kqjm-,kkdmss-,fs-,nflrlh=6,lj-,qp=4,xdcj=6,bch=2,slk-,zg=9,nbvdv=8,dvh=6,qcx-,lr-,rxr=8,jz=6,px-,zgl-,qdb-,hfx-,jbqj-,knb-,hgk-,hp=1,bzjk=8,lz=7,ckc-,km-,dgv-,zg=4,qpv-,tkr-,bzjk-,jmt=7,vpnb=1,txjxjh-,lph=4,xt=5,qp-,vbl-,gc=5,qmpjt=1,xfvf-,dk-,dh-,pnq=4,zx=1,mls-,qfk-,rt=4,fvl-,ngv-,zmcq-,npsqg=1,lbtl=7,qcn=5,vgfh-,vl=5,dpgfv=2,mqvhh=7,lnkrn=8,kqjm-,spq=7,ctn=9,xgl=6,sgtzqx-,lzmmc=5,jzgqb-,xbg-,xcz-,clcq-,grqrv-,hl=7,zpk=7,dlm=5,stt-,jmt-,fkzp-,xklv-,txjxjh-,zzrcm-,jj-,pdz=7,nflrlh-,ckv-,qdb=5,rfm-,pnq=2,gtc=2,zzrcm-,pkt-,bjl=6,vd=3,cg-,nj-,xhc=8,fp=4,dn-,jl-,pshlmt=8,njd=8,ltfj-,sccp=8,npbks-,bzjk=9,dxcq-,zq-,crt=7,pl-,hq-,qqs=9,tspf=3,grqrv=7,rgh-,fpkc=5,pl-,jls-,ptch-,bvz=8,jn=9,nfx-,ffs-,bvd-,tspf-,gl-,zz-,jd-,dr=9,djjk-,hrn-,dhn-,slx=3,fzbxr-,dmhp=7,nljq=3,fshzch-,fxn-,hknn=1,csp=6,vxphg=6,md=6,bcn=5,pmrs=6,kn=3,bgn=8,rghk-,nlkb=4,kkdmss-,ms-,ft=5,ffxcc=8,gt-,zbn-,rrj=4,sshtt=6,fzdgj-,mkpkb=3,qt=2,pdc-,fs=2,nj-,qcx-,jctsn=4,cbmv=7,rm=4,md-,cmnv=1,jj=2,hqrrsc=9,tg-,hqrrsc-,gzz=2,trs=4,jzgqb=2,vk=1,rp=3,rvtm=9,cmnv=6,sfm-,kxx-,xfvf=2,dg=6,fxdj-,jzf-,hkc=2,vvn-,ntlms=7,jbqj-,vtbs=5,tkr-,tjzlq-,vbl-,qt-,bgx=6,kkxs-,ct=9,dk=2,gbmll-,npbks=6,ck-,sk-,gg=4,cnqm-,lxg-,rx-,dd=9,mcx-,tl-,gq-,dmhp-,jc-,vv=2,bnsm-,qt=4,xg-,tz=4,nxm=4,qp-,knvnq-,pdc-,rnjsmh=4,nlkb=8,pls-,qzpm=7,khgl-,xnkj-,vhr-,prn-,kz-,lxg-,gt=5,kkdmss=9,zq-,brd-,ffs-,fxn-,sds-,ms-,kq=5,sbtp-,ntlms=3,bgx=8,rxr-,tkx-,zvg-,qdb-,knbq-,kqvc-,bfkrj=6,smj-,ljbs-,dlm=8,mfd-,lgl-,sgtjx-,dpf-,lbtl-,rg-,dxcq=9,tqn-,hjnq=3,fvl=5,pkt-,vtbs=9,xzfkcp-,djjk=4,knvnq=7,dm-,nn-,qcx=1,tk-,xnb-,tqvh-,ggg=8,jvd-,hxl-,sgd=1,npsqg=2,rjs-,scx-,xtk-,rrg-,tvh=3,mlk-,dd=7,xcz=8,zvcsg=9,kf-,nd=7,clrsv-,fc-,fvvz-,dm-,bh-,vxphg=3,mkpkb=5,hbdpf=9,qllxq=4,ksbrz=8,hdtk=7,sztz=9,pl=7,bgx=1,mfd=9,lbtl-,zh=2,klb=9,fnz=4,vgfh-,ltfj=9,cbmv-,fb=8,rjs-,scgl=9,zsb-,fpkc=7,djjk=3,kpr=8,lzmmc-,mksl-,vk=5,slk=5,thls-,jls-,dpf-,hfx=6,ncn=9,rg-,scb=9,tb=5,ptch=2,zgk=1,jl=7,fvl-,pnq=3,tdf-,fnr-,mx-,tb-,zvbgvg-,lph=1,bch-,sfq=8,frjr=5,jls-,mrl=2,kk-,zsh-,kjtcj=7,xnb-,fnr-,xspnr-,qg=6,jrpj-,vz=5,fb-,cx-,lph-,lrx=1,lbtl=3,qbmj-,dk=4,dt-,fzdgj-,cf-,ccdd-,fkzp-,zx=9,rrg=9,fd=9,csp=1,zsh-,bvz=5,blms=6,cckp=2,fxdj=8,pc=8,qmpjt=8,hq-,dbp-,rb-,jmxd-,tj-,kpr=4,zpk=7,tj-,jctsn-,fzbxr-,nsj=7,jg=6,ckc=9,rrg=6,fzbxr-,mj=2,fz=5,zbn=3,qxvl-,qk=2,qv-,nlh-,dqkzpr=7,xtk=5,spq-,djjk=6,flnqg-,qp-,zbn=8,xlr=5,kkdmss-,crt=1,bcn=1,gx=7,dsnt=6,ptch=3,xnkj=8,vv-,nflrlh=9,bcn-,sbtp-,knq=9,fpkc=2,qcx=8,nflrlh=6,ll-,gfdshl=4,dkk=6,tbl-,qjps-,tqn=3,mcx=4,hl-,hqrrsc=5,fnr=1,tcn-,gzh=1,kzsq-,hrn-,xg=9,vzdf=2,hjdj-,bbz-,rvtm=8,ls-,clz-,dn=8,gc-,fl=7,fk=9,mlk-,mg-,fz=4,vpnb=8,nflrlh-,dxjgbx=9,qn=1,slm=8,hd=5,qrn=6,bbz=9,zsb=6,xh-,npsqg-,kpnl=8,fvl=6,ltfj=2,xt=7,bfkrj-,dxjgbx=4,ppf-,bcs-,gzz-,rn-,bvz-,qtlhv-,xxhr-,cm-,qpv-,bn-,njm-,lrdz=9,jj-,vhr-,rs-,rcv=2,ncn-,flnqg=8,br-,vxphg=8,tb-,bzjk-,pxtsds-,pn=4,rrg-,scgl-,sccp=9,zvgp=7,ml-,rgh=2,dqkzpr-,lxg-,gspn=2,ngm=5,bn-,glx=8,mlk=5,qdb-,lrdz-,njm-,slr=8,bb=2,bszppc=5,tg=3,rt=3,slx=9,dh-,fl-,mlk-,bsf=5,cznn=8,hfx=4,tqvh-,lrx-,qvg=9,kz=5,tbl-,jvd=2,gt=8,bh-,clcq-,knq=6,jmxd=1,bnsm-,zvg-,rt=6,fl-,kjm=5,gfglr-,bjl-,lgl=8,lz=5,dt-,nfx-,qrn-,ppf=7,xlr-,ksbrz-,ll=4,gzgcn=9,tkx=6,lnkrn-,slk=1,dgb=3,zz-,cmnv=7,bch=8,jg-,xsv-,nn-,hknn=3,qcx-,cx=4,vv=1,lbtl-,xhc-,cmnv-,kbpjjp-,pdc-,hjgj-,tkr-,zvgp=9,xqb-,sgtjx-,bcn=3,bbz-,qcn=7,mjlktq=8,fk=9,tq-,jls-,fqb=2,lz-,blb=5,nfx-,stt=3,ns-,scc=3,dmhp-,jmt=8,kn=1,bs=7,fs-,cmnv-,fzq=3,xspnr-,ccdd-,scgl-,knq=6,fvvz=3,xklv=5,qt-,ck=1,xnkj-,ms-,ckv=5,fzdgj-,vz=9,ctn-,jpx=5,csp=1,nfx-,xt=6,mjlktq=4,sccp=4,gtc=7,dt=3,kvt-,kqvc-,csp-,pkt=2,zg=6,qtt-,pl-,cjnhtt-,bvd=9,fzq=6,gx=7,nbvdv=1,dg=3,jzf-,lfc-,jzf-,qt-,scgl=5,kn-,sb=9,pzp-,gq-,tb-,hjbxlp-,dn-,lz-,frjr-,gfdshl=2,cm=2,mf=3,hjgj=2,lfc=5,lvj-,zlmp=4,lzmmc=1,qdb-,xrtf-,csz-,zxf-,dh-,qzpm-,tspf=3,qllxq-,knvnq=5,njm=9,dmhp=3,ffxcc=9,rcv-,fpz=5,slr-,ffs-,bhhj=2,bcs-,kkxs=7,tvh-,fpr-,cznn=2,bszppc-,kqvc=8,bbz=1,mb=3,xhjd=5,qtd-,xqb-,dpgfv=9,zgk=6,dpqgcl-,zdd-,fs-,lnkrn-,tkx-,nxjn-,qzpm=8,dsnt=5,bcs=4,cm=1,slx=3,lgd=7,lr=1,gz-,dk=6,gg=7,xb=7,gc-,cpm-,mf=2,dsnt-,gx=9,kk-,hgk=7,zvz-,gzh-,dpgfv-,nsj=5,khgl=4,tqfdx=1,cd-,jpx=2,ffs=5,qv=1,xhjd=6,kqs-,hqlt-,hbxg=9,xzfkcp=2,ngv=9,jxg=9,jbcjh=3,bs-,knbq-,thls=1,ngv=8,bcn=6,bjl-,jp=1,ml-,slr=4,qp-,gz=4,fl-,cm-,sdchxz-,dpqgcl=3,fc=2,shjl-,dd=7,kqs=1,jtnz-,shjl=2,zfb=9,jzg-,qp=2,pnq=6,rn-,jbcjh=7,gz-,pdc-,vm=7,xlvscf-,vzdf-,dqkzpr=1,lzmmc=4,nf=8,xfvf=9,sshtt-,gr=2,zzrcm=2,dg-,xb=7,dxcq=2,sfm=9,szq-,fxdj-,hbdpf=5,lnkrn-,bnsm=8,rfm-,dfvp=7,tkr=5,rxr-,ksl=9,kq=7,ls=7,bn=8,kjh=8,cznn=2,sgd-,rgjh-,ptch=9,rghk=7,tz-,nxv=4,knvnq=4,dh=5,hbxg-,tcn-,fqb-,slk=4,pdz=5,bcs=2,qp-,cg-,slx-,dgspc-,clcq=3,qtlhv=6,rjs=3,dgspc-,vhr-,pc-,dxjgbx-,jrpj-,dd-,hl=9,pshlmt=2,dbp-,bh-,njd-,tb-,fz-,bvz=2,tqn-,flnqg=5,hh=8,bgx-,pn-,sq=5,bcn-,sjv-,rjs-,slr-,zpk=4,gspn-,tbl=8,sds-,zn=5,rvtm-,tg=8,ck=4,flnqg-,sn=9,tdf=8,gg=2,tvh-,jj-,bnsm=6,rs=4,sb-,rt-,slx=6,vvn-,qvg=6,xzfkcp-,mb=5,dk=1,ffxcc-,lvj=1,zfccb=9,fs-,tvh=9,gtc=6,nf=9,dq=4,tl-,rcmz=5,fqb=8,kxx-,gg-,jmxd=2,xsv=5,lgl-,hjnq=9,lrx=2,vz=1,ns=3,qjps=8,lhk-,sshtt=6,nxjn=7,vvn=6,rghk-,bvz-,pcks-,gspn-,tk-,hl-,ksl-,scb=2,cnqm-,cmnv=9,tkr-,xnkj-,qfk-,dn=1,zgk=7,rghk=7,zsb=6,ppf-,vv-,fcm-,cftg=8,lghpq-,ndq=9,fxn=2,brp-,rzzr=6,frbnq-,px=9,rrlt=4,kjhqz-,xsv=1,vpnb-,hkc=8,zq-,bszppc=8,rnsp=2,jp=4,crr=9,sn-,mp-,zh-,sds=6,fc-,kckfh-,dlm-,bszppc=3,mx-,spq=3,tb-,qtd=5,vb-,bsf=8,ql-,gx=2,vl=5,szx-,hrn-,hg-,rgjh-,mjlktq=1,lz=9,hknn=9,scgl-,pshlmt-,vv-,dxjgbx=4,ckpm-,tl-,jpx-,fshzch-,scb=8,kkxs=6,vpnb-,knb=9,sb-,fqb=6,ppf=9,fl-,jvd-,npsqg=9,xcz-,px-,jk-,jbqj=5,mj-,zzrcm=4,xb-,sgtjx=1,sc-,hfx=5,bjh=7,bgx=2,bch=3,vtbs=6,tljb-,bq-,pnq=4,knb=5,blms=8,tb=2,kqs=7,tglz=7,kr=1,bgm-,mb=7,ngv=8,gfdshl-,zg=6,kqs=4,stt-,pdz-,cpm=5,dqtchc=6,zq-,tjzlq=2,km=6,dhn=9,mlk=7,hdtk=8,zkt-,fnz=2,pn-,fpkc=2,dpgfv=3,xsv=8,sgtjx=3,kk=1,lfc=3,nd-,blb-,scb=4,gr-,qp=7,pkh-,gr-,fnz-,cbmv-,tspf=3,lz-,gf-,brp-,zvz=5,gx=9,jg-,rt-,qxvl-,lj-,dgspc-,zsb=5,jk-,pcks=9,sk-,gl-,ksbrz=9,rn=6,qvg-,xnb-,nmc-,nflrlh-,fk-,rjs-,jk=1,xgl-,vkhvn-,zsh=1,vpnb=2,mr=9,lj=4,mg=4,np-,gzh=8,fqb-,lph=9,mb-,hgk=8,zvcsg-,cn-,gbmll=6,tql-,qtd=2,jtd-,hbdpf=3,rg=8,gr=4,qcp=2,lj=9,md-,mg-,fk=8,fnr=2,tqfdx=8,zfccb=8,crt-,fc=9,lgd=2,cmnv-,nj=7,npbks=8,hg-,qtd-,qcx=1,nfx=3,gfglr-,cznn-,bch-,qfk-,nxs-,gzz-,dj=1,stt-,ll-,tkx-,fzbxr-,jcc=4,lvj-,kvt-,jg-,tk=7,vvn=4,thls=9,hrn-,ckc=9,tq-,xxhr=5,nmc-,frjr=4,fvl=2,dk=5,nlh=2,bcn-,fnr=3,rnjsmh-,ncn=7,gx-,cbmv=6,njm-,zkt-,tspf-,dgv-,mls=8,vdmgt-,lj-,zmcq=4,bcn-,tdf=2,xqb-,thls=3,rs-,crt-,zvz=7,jrpj=2,bvd-,tq=4,zvcsg-,mx-,prn-,nxs=1,cx=3,zf=5,vl=6,vvn-,qk-,bmr-,csp=1,knq=3,lxg-,pzp=1,fq=1,bcn-,qxr-,lfc=6,zsh=7,sjzhds=6,ll-,zpk=7,pn=9,ckv-,qg-,shjl-,clrsv=3,rfm-,mvxz-,hxl=3,lhk=7,dvfqd-,ml-,dpqgcl=2,bgx=6,brd-,sshtt=4,rrlt-,ffxcc-,jtnz-,bnsm=6,tbcl=8,pxc-,gc-,jmt-,cpm=1,slr-,rd=5,xhjd-,bjl-,xh=5,kf=1,qk=8,vk-,nljq-,rp-,ppf-,src=6,hbdpf=5,pbk=4,xj-,klkd-,spq-,vp=7,lgl=8,ns-,zh-,gx=5,tkr=8,rrg=2,fk-,bszppc=8,lhk-,dh-,sfm-,nlh-,mr-,fshzch=5,njm=3,zxf=8,xhc-,klb=7,kxx=1,knq=2,gf-,ck=7,cd-,qrn=8,fd-,dxjgbx-,xklv=2,lxg=6,ckc-,vb-,lvj-,zh=6,pl=1,tcn-,frjr=7,jp=2,bvz-,gc-,ndq-,xh-`;

go();
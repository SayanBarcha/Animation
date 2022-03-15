

"use strict"; // Paul Slaymaker, paul25882@gmail.com
const body=document.getElementsByTagName("body").item(0);
body.style.background="#000";
const TP=2*Math.PI;
const CSIZE=400;

const ctx=(()=>{
  let d=document.createElement("div");
  d.style.textAlign="center";
  body.append(d);
  let c=document.createElement("canvas");
  c.width=c.height=2*CSIZE;
  d.append(c);
  return c.getContext("2d");
})();
ctx.translate(CSIZE,CSIZE);

onresize=()=>{ 
  let D=Math.min(window.innerWidth,window.innerHeight)-40; 
  ctx.canvas.style.width=D+"px";
  ctx.canvas.style.height=D+"px";
}

const getRandomInt=(min,max,low)=>{
  if (low) {
    return Math.floor(Math.random()*Math.random()*(max-min))+min;
  } else {
    return Math.floor(Math.random()*(max-min))+min;
  }
}

var colors=[];
const setColors=()=>{
  let hues=[];
  hues[0]=(getRandomInt(-200,40)+360)%360;
  hues[1]=(hues[0]+getRandomInt(60,90))%360;
//console.log(hues[0]+" "+hues[1]);
  if (Math.random()<0.5) hues.reverse();
  colors[0]="hsl("+hues[0]+",100%,20%)";
  colors[1]="hsl("+hues[1]+",100%,68%)";
}

var rotateLines=(ic)=>{
  let rot=rotation;
  for (let i=0; i<C; i++) {
    if (i%2) lines[i].rotate(0.1);
    else lines[i].rotate(-0.1);
  }
}

var Line=function(idx) {
  this.a=idx*TP/C+(C/4-1)*TP/C/2;
  this.dp1=new DOMPoint();
  this.dp2=new DOMPoint();
  this.rotate=(z)=>{
    if (z==0) return;
    let dm2=new DOMMatrix([Math.cos(z),Math.sin(z),-Math.sin(z),Math.cos(z),this.mx,this.my]);
    let dm3=dm2.multiply(this.dm1);
    this.dp1=this.dp1.matrixTransform(dm3);
    this.dp2=this.dp2.matrixTransform(dm3);
  }
  this.setLine=()=>{
    let f=C>8?(idx%4<2)?F:F2:F;
    let r=C>8?(idx%4<2)?R:R2:R;
    this.dp1.x=r*Math.cos(this.a-f);
    this.dp1.y=r*Math.sin(this.a-f);
    this.dp2.x=r*Math.cos(this.a+f);
    this.dp2.y=r*Math.sin(this.a+f);
    this.mx=(this.dp1.x+this.dp2.x)/2;
    this.my=(this.dp1.y+this.dp2.y)/2;
    this.dm1=new DOMMatrix([1,0,0,1,-this.mx,-this.my]);
  }
}

var lines=new Array(32);
for (let i=0; i<32; i++) lines[i]=new Line(i);

var C=8;
var F=0.2;
var F2=0.2;
var R=300+60*Math.random(); 
var R2=R-80*Math.random();  

var getPath=()=>{
  let p=new Path2D();
  p.moveTo(lines[0].mx,lines[0].my);
  for (let i=0; i<skipLevel*C; i+=skipLevel) {
    let i0=(i)%C;
    let i1=(i+skipLevel)%C;
    p.bezierCurveTo(lines[i0].dp2.x,lines[i0].dp2.y,lines[i1].dp1.x,lines[i1].dp1.y,lines[i1].mx,lines[i1].my);
  }
  return p;
}

var skipLevel=1;
const rSet=[ {"c":4,"s":1}, {"c":6,"s":1}, {"c":8,"s":1}, {"c":8,"s":3}, {"c":12,"s":1}, {"c":12,"s":5}, {"c":16,"s":1}, {"c":16,"s":3}, {"c":16,"s":5}, {"c":16,"s":7}, {"c":3,"s":1}, {"c":5,"s":2}, {"c":20,"s":1}, {"c":20,"s":3}, {"c":20,"s":7}, {"c":20,"s":9}, {"c":24,"s":1}, {"c":24,"s":5}, {"c":24,"s":7}, {"c":24,"s":11}, {"c":28,"s":1}, {"c":28,"s":3}, {"c":28,"s":5}, {"c":28,"s":9}, {"c":28,"s":11}, {"c":28,"s":13}, {"c":32,"s":1}, {"c":32,"s":3}, {"c":32,"s":5}, {"c":32,"s":7}, {"c":32,"s":9}, {"c":32,"s":11}, {"c":32,"s":13}, {"c":32,"s":15} 
];

var randomizeLines=()=>{
  let rs=rSet[getRandomInt(0,rSet.length,true)];
  C=rs.c;
  skipLevel=rs.s;
  if (skipLevel==1) R=320;
  else if (skipLevel==3) R=340;
  else if (skipLevel<9) R=360;
  else R=380;
  R2=R-80*Math.random();    
  F=TP*(0.1+0.3*Math.random());
  F2=TP*(0.1+0.3*Math.random());
  let ao=TP/4*Math.random();
  for (let i=0; i<C; i++) {
    let aa=(C==24 || (C/4)%2)?TP/8:0;
    lines[i].a=i*TP/C+(C/4-1)*TP/C/2+aa;
    if (i%2) lines[i].a-=ao;
    else lines[i].a+=ao;
    lines[i].setLine();
  }
  rc=getRCount();
}

var getRCount=()=>{
  let bd={ "C3S1":25, "C4S1":23, "C5S2":15, "C6S1":21, "C8S1":17, "C8S3":10, "C12S1":12, "C12S5":7, "C16S1":10, "C16S3":7, "C16S5":5, "C16S7":4, "C20S1":6, "C20S3":6, "C20S7":4, "C20S9":3, "C24S1":5, "C24S5":4, "C24S7":3, "C24S11":1, "C28S1":4, "C28S3":3, "C28S5":2, "C28S9":2, "C28S11":1, "C28S13":1, "C32S1":4, "C32S3":3, "C32S5":2, "C32S7":2, "C32S9":1, "C32S11":1, "C32S13":1, "C32S15":1 };
  let k="C"+C+"S"+skipLevel;
  if (bd[k]) return bd[k];
  return 8;
}

var rc=8;

var draw=()=>{
  ctx.clearRect(-CSIZE,-CSIZE,2*CSIZE,2*CSIZE);
  let pth=new Path2D();
  for (let i=0; i<rc; i++) {
    rotateLines(i);
    pth.addPath(getPath());
  }
  ctx.lineWidth=11;
  ctx.strokeStyle=colors[0];
  ctx.stroke(pth);
  ctx.lineWidth=1.3;
  ctx.strokeStyle=colors[1];
  ctx.stroke(pth);
}

function start() {
  if (stopped) {
    requestAnimationFrame(animate);
    stopped=false;
  } else {
    stopped=true;
  }
}
ctx.canvas.addEventListener("click", start, false);

var rotRate=0.12;
var fRate1=2800;
var fRate2=3000;
var rot1=1;
var rot2=-1;
var rotation=TP*Math.random();
var stopped=true;
var t=0;
//var duration=1600;
function animate(ts) {
  if (stopped) return;
  t++;
  if (t<100) {
    ctx.globalAlpha=t/100;
  } else {
    ctx.globalAlpha=1;
  }
  if (t>800) { 
    randomizeLines();
    if (Math.random()<0.7 && C%2==0) {
      rot1=1;
      rot2=-1;
    } else {
      rot1=getRandomInt(-1,2);
      rot2=getRandomInt(-1,2);
    }
    rotation=TP*Math.random();
    t=0;
    ctx.globalAlpha=0;
    setColors();
    if (Math.random()<0.5) {
      rotRate=0.2;
      fRate1=2800;
      fRate2=3000;
    } else {
      rotRate=0.1;
      fRate1=1400;
      fRate2=1500;
    }
    if (C<6) rotRate/=3;
    else if (C<9) rotRate/=2;
  } else if (t>700) {
    ctx.globalAlpha=1-(t-700)/100; // faded out
  }
  rotation+=rotRate/C;
  for (let i=0; i<C; i++) {
    F=TP*(0.25+0.15*Math.sin(TP*t/fRate1));
    F2=TP*(0.25+0.15*Math.cos(TP*t/fRate2));
    if (i%2) lines[i].a+=0.003;
    else lines[i].a-=0.003;
    lines[i].setLine();
    if (i%2) lines[i].rotate(rot1*rotation);
    else lines[i].rotate(rot2*rotation);
  }
  draw();
  requestAnimationFrame(animate);
}

onresize();

randomizeLines();

setColors();
start();

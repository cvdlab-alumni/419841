function createFuselage(){

var p0 = [[0,0,-1.8],[2,0,-1.8],[3,0,0],[2,0,3],[0,0,3],[-2,0,2],
	[-2,0,0],[-2,0,-1.6],[0,0,-1.8]];
	var p1 = [[0,0,]]




var c0 = BEZIER(S0)(p0);
var domain1 = INTERVALS(1)(100);
var circle = MAP (c0)(domain1);
//DRAW(circle);

var p1 = p0.map(function (p) {return [p[0]*0.9,p[1]-0.5,p[2]*0.9]});
var c1 = BEZIER(S0)(p1);
var scaledCircle = MAP (c1)(domain1);
//DRAW(scaledCircle);
var p2 = p0.map(function (p) {return [p[0]*0.8,p[1]-0.8,p[2]*0.8]});
var c2 = BEZIER(S0)(p2);
var scaledCircle = MAP (c2)(domain1);
//DRAW(scaledCircle);
var p3 = p0.map(function (p) {return [p[0]*0.5,p[1]-1,p[2]*0.5]});
var c3 = BEZIER(S0)(p3);
var scaledCircle = MAP (c3)(domain1);
//DRAW(scaledCircle);

var p20 = [[0,-1,-0.9]];
//var p4 = p0.map(function (p) {return [p[0]*0.9,p[1]-1,p[2]*0.9]});
var c4 = BEZIER(S0)(p20);
var scaledCircle = MAP (c4)(domain1);
var c15 = BEZIER(S1)([c3,c4]);

//DRAW(scaledCircle);
/*var p14 = p0.map(function (p) {return [p[0]*0.4,p[1]-1.5,p[2]*0.4]});
var c14 = BEZIER(S0)(p14);
var scaledCircle = MAP (c14)(domain1);
DRAW(scaledCircle);
var p15 = p0.map(function (p) {return [p[0]*0.1,p[1]-2,p[2]*0.1]});
var c15 = BEZIER(S0)(p15);
var scaledCircle = MAP (c15)(domain1);
DRAW(scaledCircle);*/




var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);

var cockPitMapping = BEZIER(S1)([c1,c2,c3,c15]);
var cockPit = MAP(cockPitMapping)(domain2);
DRAW(cockPit);

var p16 = p0.map(function (p) {return [p[0]*0.2,p[1]-1,p[2]*0.2]});
var c16 = BEZIER(S0)(p16);
var scaledCircle = MAP (c16)(domain1);

var p17 = p0.map(function (p) {return [p[0]*0.2,p[1]-1.5,p[2]*0.2]});
var c17 = BEZIER(S0)(p17);
var scaledCircle = MAP (c17)(domain1);

var p21 = [[0,-1.5,-0.36]];
//var p4 = p0.map(function (p) {return [p[0]*0.9,p[1]-1,p[2]*0.9]});
var c21 = BEZIER(S0)(p21);
var scaledCircle = MAP (c21)(domain1);
var c18 = BEZIER(S1)([c17,c21]);

var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);

var Mapping = BEZIER(S1)([c16,c17,c18]);
var engine = MAP(Mapping)(domain2);
DRAW(COLOR([1.0, 0.8, 0.8])(engine));

// PARTE INTERMEDIA DELLA FUSOLIERA
/*var points = [[0,0,0], [2,0,0], [2,0,2],[0,0,2], [0,0,0]];
var polyline = T([0,1,2])([-0.8,1,-1])(POLYLINE(points));
DRAW(polyline);*/
var pquadrato = [[0,0,-1], [-0.9,0,-1],[-0.8,0,-1],[-0.7,0,-1],[-0.6,0,-1],[-0.5,0,-1],[-0.4,0,-1],[-0.3,0,-1],[-0.2,0,-1],[-0.1,0,-1],[0,0,-1],[0.1,0,-1],[0.2,0,-1],[0.3,0,-1],
[0.4,0,-1],[0.5,0,-1],[0.6,0,-1],[0.7,0,-1],[0.8,0,-1],[0.9,0,-1], [1,0,-1], [1,0,-0.9],[1,0,-0.8],[1,0,-0.7],[1,0,-0.6],[1,0,-0.5],[1,0,-0.4],[1,0,-0.3],[1,0,-0.2],[1,0,-0.1],[1,0,0],[1,0,0.1],[1,0,0.2],[1,0,0.3],
[1,0,0.4],[1,0,0.5],[1,0,0.6],[1,0,0.7],[1,0,0.9], [1,0,1], [0.9,0,1],[0.8,0,1],[0.7,0,1],[0.6,0,1],[0.5,0,1],[0.4,0,1],[0.3,0,1],[0.2,0,1],
[0.1,0,1],[0,0,1], [-0.1,0,1],[-0.2,0,1],[-0.3,0,1],[-0.4,0,1],[-0.5,0,1],[-0.6,0,1],[-0.7,0,1],[-0.8,0,1],[-0.9,0,1],[-1,0,1], 
[-1,0,0.9], [-1,0,0.8], [-1,0,0.7], [-1,0,0.6], [-1,0,0.5], [-1,0,0.4], [-1,0,0.3], [-1,0,0.2], [-1,0,0.1], [-1,0,0], [-1,0,-0.1], [-1,0,-0.2], 
[-1,0,-0.3], [-1,0,-0.4], [-1,0,-0.5], [-1,0,-0.6], [-1,0,-0.7],  [-1,0,-0.8],[-1,0,-0.9],[-1,0,-1],[0,0,-1]];
var c6 = BEZIER(S0)(pquadrato);
var domain1 = INTERVALS(1)(100);
var square = MAP (c6)(domain1);
var almost_square = T([0,2])([-1,-1])(square);

var p7 = pquadrato.map(function (p) {return [p[0]*1.5+0.25,p[1]+1,p[2]*1.5+0.1]});
var c7 = BEZIER(S0)(p7);
var scaledSquare = MAP (c7)(domain1);
//DRAW(scaledSquare);

var p8 = pquadrato.map(function (p) {return [p[0]*1.7+0.25,p[1]+0.1,p[2]*1.7+0.1]});
var c8 = BEZIER(S0)(p8);
var scaledSquare = MAP (c8)(domain1);
//DRAW(scaledSquare);

var p9 = pquadrato.map(function (p) {return [p[0]*1.7+0.25,p[1]+0.5,p[2]*1.7]});
var c9 = BEZIER(S0)(p9);
var scaledSquare = MAP (c9)(domain1);
//DRAW(scaledSquare);
var p10 = pquadrato.map(function (p) {return [p[0]*1.5+0.25,p[1]+1.5,p[2]*1.5]});
var c10 = BEZIER(S0)(p10);
var scaledSquare = MAP (c10)(domain1);
//DRAW(scaledSquare);
var p11 = pquadrato.map(function (p) {return [p[0]*1.4+0.25,p[1]+2,p[2]*1.4]});
var c11 = BEZIER(S0)(p11);
var scaledSquare = MAP (c11)(domain1);
//DRAW(scaledSquare);
var p12 = pquadrato.map(function (p) {return [p[0]*1.2+0.25,p[1]+3,p[2]*1.2]});
var c12 = BEZIER(S0)(p12);
var scaledSquare = MAP (c12)(domain1);
//DRAW(scaledSquare);
var p13 = pquadrato.map(function (p) {return [p[0]*0.6+0.25,p[1]+5,p[2]*0.6]});
var c13 = BEZIER(S0)(p13);
var scaledSquare = MAP (c13)(domain1);
//DRAW(scaledSquare);
var p14 = pquadrato.map(function (p) {return [p[0]*0.5+0.25,p[1]+10,p[2]*0.5]});
var c14 = BEZIER(S0)(p14);
var scaledSquare = MAP (c14)(domain1);
//DRAW(scaledSquare);
var p16 = pquadrato.map(function (p) {return [p[0]*0.05+0.25,p[1]+13,p[2]*0.05]});
var c16 = BEZIER(S0)(p16);
var scaledSquare = MAP (c16)(domain1);
//DRAW(scaledSquare);



var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);

var Mapping = BEZIER(S1)([c1,c7,c10,c11,c12,c13,c14,c16]);
var fusoliera = MAP(Mapping)(domain2);
DRAW(COLOR([1.0, 0.8, 0.4,1])(fusoliera));
//HELIC
var domain = DOMAIN([[0,1],[0,1],[0,1]])([30, 1, 1]);

var h = 3;
var w = 2;
var j = 0.05;
var points = [[w/2, 0, 0],[0, h-1,0],[0.5, h, 0], [1.5, h, 0], [w, h-1,0], [w/2, 0, 0]];
var pointFake = [[w/2,0,0],[w/2,0,0]];
var elicSup = BEZIER(S0)(points);
var elicSup2 = BEZIER(S0)(pointFake);
var elicSurface = BEZIER(S1)([elicSup, elicSup2]);

var points2 = [[w/2, 0, j],[0, h-1,j],[0.5, h, j], [1.5, h, j], [w, h-1,j], [w/2, 0, j]];
var pointFake2 = [[w/2,0,j],[w/2,0,j]];
var elicSup2 = BEZIER(S0)(points2);
var elicSup21 = BEZIER(S0)(pointFake2);

var elicSurface2 = BEZIER(S1)([elicSup2, elicSup21]); 
var solidHelic = BEZIER(S2)([elicSurface, elicSurface2]);

var el = MAP(solidHelic)(domain);

var el2R = R([0,1])([PI])(el);
var el2 = T([0])([2])(el2R);

var completeHelic = STRUCT([el, el2]);
completeHelic = R([1,2])([PI/2])(completeHelic);
var completeHelicT = T([0,1,2])([-1,-1.5,0])(completeHelic);
DRAW(completeHelicT);
}

createFuselage();

function createStabilizers(){
var p0 = [[0,0,-1.8],[2,0,-1.8],[3,0,0],[2,0,3],[0,0,3],[-2,0,2],
  [-2,0,0],[-2,0,-1.6],[0,0,-1.8]];
  var p1 = [[0,0,]]

//quadrato


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

var p20 = [[0,-1,-0.9]];
var c4 = BEZIER(S0)(p20);
var scaledCircle = MAP (c4)(domain1);
var c15 = BEZIER(S1)([c3,c4]);

var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);

var Mapping = BEZIER(S1)([c1,c2,c3,c15]);
var hf = MAP(Mapping)(domain2);
//DRAW(hf);

var p16 = p0.map(function (p) {return [p[0]*0.2,p[1]-1,p[2]*0.2]});
var c16 = BEZIER(S0)(p16);
var scaledCircle = MAP (c16)(domain1);

var p17 = p0.map(function (p) {return [p[0]*0.2,p[1]-1.5,p[2]*0.2]});
var c17 = BEZIER(S0)(p17);
var scaledCircle = MAP (c17)(domain1);

var p21 = [[0,-1.5,-0.36]];
var c21 = BEZIER(S0)(p21);
var scaledCircle = MAP (c21)(domain1);
var c18 = BEZIER(S1)([c17,c21]);

var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);

var Mapping = BEZIER(S1)([c16,c17,c18]);
var hf1= MAP(Mapping)(domain2);
//DRAW(hf1);

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
var p16 = pquadrato.map(function (p) {return [p[0]*0.01+0.25,p[1]+13,p[2]*0.01]});
var c16 = BEZIER(S0)(p16);
var scaledSquare = MAP (c16)(domain1);
//DRAW(scaledSquare);



var domain2 = DOMAIN([[0,1],[0,1]])([30,50]);

var Mapping = BEZIER(S1)([c1,c7,c10,c11,c12,c13,c14,c16]);
var hd= MAP(Mapping)(domain2);
//DRAW(COLOR([1.0, 0.8, 0.4,1])(hd));
//HELIC
var domain = DOMAIN([[0,1],[0,1],[0,1]])([30, 1, 1]);

var h = 2;
var w = 1;
var j = 0.0025;
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
var el2 = T([0])([1])(el2R);

var completeHelic = STRUCT([el, el2]);
completeHelic = R([1,2])([PI/2])(completeHelic);
var completeHelicT = T([0,1,2])([-0.5,-1.5,0])(completeHelic);
//DRAW(completeHelicT);

  var domain1 = INTERVALS(1)(100);
  var domain2 = DOMAIN([[0,1],[0,1]])([40,70]);

  var p0 = [[0,0,0],[2,0.1,0],[1.9,0.2,0],[1.7,0.3,0],[1.4,0.5,0],[0,0,0]];

  var p1 = p0.map(function(p) {return [p[0]+0.2,p[1],p[2]+1.41]});
  var p2 = p0.map(function(p) {return [p[0]+0.4,p[1],p[2]+2.82]});
  var p3 = p0.map(function(p) {return [p[0]+0.6,p[1],p[2]+4.23]});
  var p4 = p0.map(function(p) {return [p[0]+0.7,p[1],p[2]+10]}); 
  var p5 = [[0.8,0,5.6],[2.6,0.05,5.6],[2.2,0.05,5.6],[2.1,0.1,5.6],[1.8,0.15,5.6],[0.8,0,5.6]];
  var p6 = [[1.2,0,5.64],[1.2,0,5.64],[1.2,0,5.64],[1.2,0,5.64],[1.2,0,5.64],[1.2,0,5.64]];
  

  var c0 = BEZIER(S0)(p0);
  var c1 = BEZIER(S0)(p1);
  var c2 = BEZIER(S0)(p2);
  var c3 = BEZIER(S0)(p3);
  var c4 = BEZIER(S0)(p4);
  var c5 = BEZIER(S0)(p5);
  var c6 = BEZIER(S0)(p6);

  var wingCurves = BEZIER(S1)([c0,c1,c2,c3,c4,c5,c6]);
  var wing = MAP(wingCurves)(domain2);
  wing = T([0,1])([2,-0.7])(wing);
  var secondWing = T([0,1])([0.25,1.8])(wing);
  var thirdWing = T([0,1])([0.5,3.6])(wing);
 var right_wing = STRUCT([wing,secondWing,thirdWing]);
 
right_wing = R([0,2])(PI/2)(right_wing);
right_wing = R([1,2])(PI/2)(right_wing);
right_wing = T([0,2])([0.2,-0.5])(right_wing);
var left_wing = S([0])([-1])(right_wing);
left_wing = T([0,2])([0.4,0])(left_wing);
 var wing_link = T([0,1,2])([1.2,3,0.8])(CUBOID([0.05,1,1.7]));
 var wing_link2 = S([0])([-1])(wing_link);
 wing_link2 = T([0])([0.4])(wing_link2);
 var winglink3 = T([0,1,2])([-3.6,0.3,-0.05])(wing_link2);
 var winglink4 = T([0,1,2])([4,0.3,-0.05])(wing_link);
 var winglink5 = T([1,2])([-0.15,-1.7])(winglink3);
 var winglink6 = T([1,2])([-0.15,-1.7])(winglink4);
 //DRAW(COLOR([1.0, 0.4, 0.0])(STRUCT([wing_link,wing_link2,winglink3,winglink4,winglink5,winglink6])));
  //DRAW(COLOR([1.0, 0.8, 0.4,1])(right_wing));
  //DRAW(COLOR([1.0, 0.8, 0.4,1])(left_wing));
  var domain = DOMAIN([[0,1],[0,1],[0,1]])([30,1,1]);

var points = [[0,0,0],[0,2,0],[2.5,3,0],[3.5,2,0],[4, 0,w],[2,0,0],[0,0,0]];
var fakePoint = [[0,0,0]];
var b = BEZIER(S0)(points);
var b1 = BEZIER(S0)(fakePoint);
var s1 = BEZIER(S1)([b, b1]);
var w = 0.05;
var points2 = [[0,0,w],[0,2,w],[2.5,3,w],[3.5,2,w],[4, 0, w],[2,0,w],[0,0,w]];
var fakePoint2 = [[0,0,0]];
var b2 = BEZIER(S0)(points2);
var b3 = BEZIER(S0)(fakePoint2);
var s2 = BEZIER(S1)([b2, b3]);

var stabilizer = BEZIER(S2)([s1, s2]);
var m = MAP(stabilizer)(domain);

var domain = DOMAIN([[0,1],[0,1],[0,1]])([30,1,1]);
var w = 0.05;

var pointsL = [[0,0.3,0],[4.5, -0.3, 0], [0.5, 2,0],[3, 2.7, 0],[0, 2.5, 0]];
var fakeSeg = [[0,0.3,0],[0,2.5,0]];
var b1 = BEZIER(S0)(pointsL);
var b2 = BEZIER(S0)(fakeSeg);
var s1 = BEZIER(S1)([b1, b2]);

//two
var pointsL2 = [[0,0.3,w],[4.5, -0.3, w], [0.5, 2,w],[3, 2.7, w],[0, 2.5, w]];
var fakeSeg2 = [[0,0.3,w],[0,2.5,w]];
var b3 = BEZIER(S0)(pointsL2);
var b4 = BEZIER(S0)(fakeSeg2);
var s2 = BEZIER(S1)([b3, b4]);

var lateStab = BEZIER(S2)([s1, s2]);
var latStab1 = MAP(lateStab)(domain);
var pointsL = [[0,0.3,0],[-4.5, -0.3, 0], [-0.5, 2,0],[-3, 2.7, 0],[0, 2.5, 0]];
var fakeSeg = [[0,0.3,0],[0,2.5,0]];
var b1 = BEZIER(S0)(pointsL);
var b2 = BEZIER(S0)(fakeSeg);
var s1 = BEZIER(S1)([b1, b2]);
var pointsL2 = [[0,0.3,w],[-4.5, -0.3, w], [-0.5, 2,w],[-3, 2.7, w],[0, 2.5, w]];
var fakeSeg2 = [[0,0.3,w],[0,2.5,w]];
var b3 = BEZIER(S0)(pointsL2);
var b4 = BEZIER(S0)(fakeSeg2);
var s2 = BEZIER(S1)([b3, b4]);

var lateStab = BEZIER(S2)([s1, s2]);
var latStab2 = MAP(lateStab)(domain);

var lateral = STRUCT([latStab1, latStab2]);
var lateralR1 = R([1,2])([PI/2])(lateral);
var lateralR2 = R([0,2])([-PI/2])(lateralR1); 
var finalLaterals = T([0,1])([2.7,0.7])(lateralR2);

var stabilLaterals = STRUCT([finalLaterals, m]);
stabilLaterals = R([0,2])(PI/2)(stabilLaterals);
stabilLaterals = R([1,2])(PI/2)(stabilLaterals);

stabilLaterals = T([0,1,2])([0.2,11,-0.15])(stabilLaterals);

DRAW(COLOR([1.0, 0.8, 0.4,1])(stabilLaterals));
}

createStabilizers();
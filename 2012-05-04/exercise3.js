!function(exports){

var domain = DOMAIN([[0,1],[0,1],[0,1]])([30,1,1]);

var points = [[0,0,0],[0,2,0],[2.5,3,0],[3.5,2,0],[4, 0,w],[2,0,0],[0,0,0]];
var fakePoint = [[0,0,0]];
var b = BEZIER(S0)(points);
var b1 = BEZIER(S0)(fakePoint);
var s1 = BEZIER(S1)([b, b1]);

//s2
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

//lateral stabilizers
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

//lateral 2
var pointsL = [[0,0.3,0],[-4.5, -0.3, 0], [-0.5, 2,0],[-3, 2.7, 0],[0, 2.5, 0]];
var fakeSeg = [[0,0.3,0],[0,2.5,0]];
var b1 = BEZIER(S0)(pointsL);
var b2 = BEZIER(S0)(fakeSeg);
var s1 = BEZIER(S1)([b1, b2]);

//two
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

var stabilLaterals = COLOR([27/255,47/255,67/255])(STRUCT([finalLaterals, m]));

exports.stabilizers = stabilLaterals;
return stabilLaterals;}(this);

DRAW(stabilizers);
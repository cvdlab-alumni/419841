  function createTriplaneWing(){

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
 DRAW(COLOR([1.0, 0.4, 0.0])(STRUCT([wing_link,winglink4,winglink6])));
  DRAW(COLOR([1.0, 0.8, 0.4,1])(right_wing));
}

createTriplaneWing();
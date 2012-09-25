
/****************************************************************************
*                                                                           *
* @author:   LUCA NARDINI                                                   *
* @projectTitle:  3D MODEL of VILLA FOSCARI by PALLADIO                     *
*                                                                           *
*                                                                           *
*****************************************************************************/

/****************************************************************************
*                                                                           *
* Useful variables and functions                                            *
*                                                                           *
*****************************************************************************/

var stairsColor = [250/255,235/255,215/255,1];
var gardenColor = [0.01,0.753,0.235];
var avenueColor = [1,0.8,0.6];
var columnsColor = [253/255,245/255,230/255];
var roofColor = [0.803,0.409,0.323,1];
var gratingColor = [0,0,0,1];
var windowsColor = [0, 0, 1, 0.5];
var frameColor = [222/255,184/255,135/255,1];
var closedWindowsCoor = [0.545, 0.211, 0.149, 1];
var doorColor = [0.309,0.309,0.184,1];
var mainDoorColor = [162/255, 112/255, 70/255];
var COLMP = COLOR([152/255,118/255,84/255]);
var shutterColor = [0.545, 0.211, 0.149, 1];
var domain2 = DOMAIN([[0,1],[0,1]])([10,25]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([30,1,1]);
var domain4 = DOMAIN([[0,1],[0,2*PI]])([10,21]);
var domain5 = DOMAIN([[0,1],[0,1],[0,1]])([1,1,1]);
var domain6 = DOMAIN([[0,1],[0,1],[0,1]])([10,1,1]);

var makeKnots = function(points,grade){
      var g = grade || 2;
      var knots = [];
      knots.push(0); knots.push(0); knots.push(0);

      for (var i = 1; i < points.length-6+grade+1+1; i++) {
        knots.push(i);
      };

      knots.push(i); knots.push(i); knots.push(i);

      return knots;
    }

var scalePoints = function(pointList, scale) {
      return pointList.map( function(pt) { 
        return [pt[0]*scale[0], 
          pt[1]*scale[1], 
          pt[2]*scale[2]]; 
      });
    };

var rotatePoints = function(pointList, angle, axis) {
      if (axis === 0) {
        var alfa = angle;
        return pointList.map( function(pt) { 
        return [ pt[0], pt[1]*COS(alfa) + (-1)*pt[2]*SIN(alfa), pt[1]*SIN(alfa) + pt[2]*COS(alfa) ];
          });
        } else if (axis === 1) {
            var beta = angle;
            return pointList.map( function(pt) { 
            return [ pt[0]*COS(beta) + pt[2]*SIN(beta), pt[1], (-1)*pt[0]*SIN(beta) + pt[2]*COS(beta) ];
              });
          } else if (axis === 2) {
              var gamma = angle;
              return pointList.map( function(pt) { 
              return [ pt[0]*COS(gamma) + (-1)*pt[1]*SIN(gamma), pt[0]*SIN(gamma) + pt[1]*COS(gamma), pt[2] ];
                });
            }     
        return pointList;
    };

var movesPoints = function(pointList, axis, qty) {
      if (axis === 0) {
        return pointList.map( function(pt) { 
        return [ pt[0]+qty, pt[1], pt[2] ];
          });
      } else if (axis === 1) {
          return pointList.map( function(pt) { 
          return [ pt[0], pt[1]+qty, pt[2] ];
           });
        } else if (axis === 2) {
          return pointList.map( function(pt) { 
          return [ pt[0], pt[1], pt[2]+qty ];
            });
        }
    };

var capitalwithtrolsPoints = function(maxRadius) {
           maxRadius = maxRadius || 1;
           var withtrolPoints = [];

           var i = 0;
           var Angle = PI/2;

           for (i = 0; i < 13; i++) {
            withtrolPoints.push( [
              maxRadius * ( COS(i*Angle) + i*SIN(i*Angle)  ),
              0,
              maxRadius * ( SIN(i*Angle) - i*COS(i*Angle)  )] );
           }

           return withtrolPoints;
      };

function getRoof(p,controlPoints){
        return STRUCT([
                    TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[0]]),PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]])]),
                    TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]]),PROD([p,controlPoints[2]])])
                ]);
    };

function getWindow(hasGrating, width, height){
  width = width || 1.52;
  height = height || 1.9;
  hasGrating = hasGrating || false;

  var baseGlass = COLOR(windowsColor)(T([2])([0.051])(BOUNDARY(CUBOID([width,height,0.025]))));
  var lower_frame = CUBOID([width,0.15,0.05]);
  var upper_frame = T([1])([height-0.15])(CUBOID([width,0.15,0.05]));
  var left_frame = CUBOID([0.15,height,0.05]);
  var right_frame = T([0])([width-0.15])(CUBOID([0.15,height,0.05]));
  var middle_frame = T([0])([(width - 0.3)/2+0.15/2])(CUBOID([0.15,height,0.05]));
  var baseFrame = COLOR(frameColor)(STRUCT([lower_frame,upper_frame,left_frame,right_frame,middle_frame]));

  var baseWindow = STRUCT([baseGlass,baseFrame]);

  if(hasGrating){
  var gratingWidth = width/9;
  var gratingHeight = height/6;

  var baseVertLine  = CUBOID([0.01,height,0.00001]);
  var vertLine0 = T([0])([0.15 + gratingWidth])(baseVertLine);
  var vertLine1 = T([0])([0.15 + gratingWidth*2])(baseVertLine);
  var vertLine2 = T([0])([0.15 + gratingWidth*3])(baseVertLine);
  var vertLine3 = T([0])([0.15 + gratingWidth*4])(baseVertLine);
  var vertLine4 = T([0])([0.15 + gratingWidth*5])(baseVertLine);
  var vertLine5 = T([0])([0.15 + gratingWidth*6])(baseVertLine);
  var vertLine6 = T([0])([0.15 + gratingWidth*7])(baseVertLine);
  var vertLine7 = T([0])([0.15])(baseVertLine);

  var vertGratings = STRUCT([vertLine0,vertLine1,vertLine2,vertLine3,
                            vertLine4,vertLine5,vertLine6,vertLine7
                            ]);

  var baseOrizLine  = CUBOID([width,0.01,0.00001]);
  var OrizLine0 = T([1])([0.15 + gratingHeight])(baseOrizLine);
  var OrizLine1 = T([1])([0.15 + gratingHeight*2])(baseOrizLine);
  var OrizLine2 = T([1])([0.15 + gratingHeight*3])(baseOrizLine);
  var OrizLine3 = T([1])([0.15 + gratingHeight*4])(baseOrizLine);
  var OrizLine4 = T([1])([0.15 + gratingHeight*5])(baseOrizLine);

  var OrizGratings = STRUCT([OrizLine0, OrizLine1,OrizLine2,OrizLine3,OrizLine4
                            ]);

  var gratings = COLOR(gratingColor)(T([2])([-0.05])(STRUCT([vertGratings,OrizGratings])));

  baseWindow = STRUCT([baseWindow,gratings]);
  }

return baseWindow;
  
};





/****************************************************************************
*                                                                           *
* Creates left stair and                                                    *
* replicates it to draw the twin stairs.                                    *
*                                                                           *
*****************************************************************************/



  !(function(exports){
   var stairs;
   var base_step = CUBOID([3.15,0.05,0.5]);

   var base = CUBOID([3,0.2,11.2]);
   var threshold = T([0,1,2])([-0.075,0.2,-0.1])(base_step);
   var step = STRUCT([base,threshold]);

   var base = CUBOID([3,0.2,10.8]);
   base = T([1,2])([0.20001,0.4])(base);
   var threshold = T([0,1,2])([-0.075,0.4,0.3])(base_step);
   var step2 = STRUCT([base,threshold]);

   var base = CUBOID([3,0.2,10.4]);
   base = T([1,2])([0.40001,0.8])(base);
   var threshold = T([0,1,2])([-0.075,0.6,0.7])(CUBOID([3.15,0.05,2.8]));
   var step3 = STRUCT([base,threshold]);

   var base = CUBOID([3,0.2,7.7]);
   base = T([1,2])([0.60001,3.5])(base);
   var threshold = T([0,1,2])([-0.075,0.8,3.4])(base_step);
   var step4 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,7.3]);
   base = T([1,2])([0.80001,3.9])(base);
   var threshold = T([0,1,2])([-0.075,1,3.8])(base_step);
   var step5 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,6.9]);
   base = T([1,2])([1.0001,4.3])(base);
   var threshold = T([0,1,2])([-0.075,1.2,4.2])(base_step);
   var step6 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,6.5]);
   base = T([1,2])([1.20001,4.7])(base);
   var threshold = T([0,1,2])([-0.075,1.4,4.6])(base_step);
   var step7 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,6.1]);
   base = T([1,2])([1.40001,5.1])(base);
   var threshold = T([0,1,2])([-0.075,1.6,5])(base_step);
   var step8 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,5.7]);
   base = T([1,2])([1.60001,5.5])(base);
   var threshold = T([0,1,2])([-0.075,1.8,5.4])(base_step);
   var step9 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,5.3]);
   base = T([1,2])([1.80001,5.9])(base);
   var threshold = T([0,1,2])([-0.075,2,5.8])(base_step);
   var step10 = STRUCT([base,threshold]);

  var base = CUBOID([3,0.2,4.9]);
   base = T([1,2])([2.0001,6.3])(base);
   var threshold = T([0,1,2])([-0.075,2.2,6.2])(base_step);
   var step11 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,4.5]);
   base = T([1,2])([2.20001,6.7])(base);
   var threshold = T([0,1,2])([-0.075,2.4,6.6])(base_step);
   var step12 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,4.1]);
   base = T([1,2])([2.40001,7.1])(base);
   var threshold = T([0,1,2])([-0.075,2.6,7])(base_step);
   var step13 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,3.7]);
   base = T([1,2])([2.60001,7.5])(base);
   var threshold = T([0,1,2])([-0.075,2.8,7.4])(base_step);
   var step14 = STRUCT([base,threshold]);

     var base = CUBOID([3,0.2,3.3]);
   base = T([1,2])([2.80001,7.9])(base);
   var threshold = T([0,1,2])([-0.075,3,7.8])(base_step);
   var step15 = STRUCT([base,threshold]);

   var base = CUBOID([3,0.2,2.9]);
   base = T([1,2])([3.0001,8.3])(base);
   var threshold = T([0,1,2])([-0.075,3.2,8.2])(CUBOID([3.15,0.05,3]));
   var step16 = STRUCT([base,threshold]);

  stairs = STRUCT([step,step2,step3,step4,step5,step6,step7,step8,step9,step10,step11,step12,step13,step14,step15,step16]);

   var base = CUBOID([3,0.2,4.4]);
   base = T([1,2])([0.60001,3.5])(base);
   var threshold = T([0,1,2])([-0.075,0.8,3.4])(base_step);
   var step17 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,4]);
   base = T([1,2])([0.80001,3.9])(base);
   var threshold = T([0,1,2])([-0.075,1,3.8])(base_step);
   var step18 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,3.6]);
   base = T([1,2])([1.0001,4.3])(base);
   var threshold = T([0,1,2])([-0.075,1.2,4.2])(base_step);
   var step19 = STRUCT([base,threshold]);


   var base = CUBOID([3,0.2,3.2]);
   base = T([1,2])([1.20001,4.7])(base);
   var threshold = T([0,1,2])([-0.075,1.4,4.6])(base_step);
   var step20 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,2.8]); 
   base = T([1,2])([1.40001,5.1])(base);
   var threshold = T([0,1,2])([-0.075,1.6,5])(base_step);
   var step21 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,2.4]); 
   base = T([1,2])([1.60001,5.5])(base);
   var threshold = T([0,1,2])([-0.075,1.8,5.4])(base_step);
   var step22 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,2]);
   base = T([1,2])([1.80001,5.9])(base);
   var threshold = T([0,1,2])([-0.075,2,5.8])(base_step);
   var step23 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,1.6]);
   base = T([1,2])([2.0001,6.3])(base);
   var threshold = T([0,1,2])([-0.075,2.2,6.2])(base_step);
   var step24 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,1.2]);
   base = T([1,2])([2.20001,6.7])(base);
   var threshold = T([0,1,2])([-0.075,2.4,6.6])(base_step);
   var step25 = STRUCT([base,threshold]);

    var base = CUBOID([3,0.2,0.8]);
   base = T([1,2])([2.40001,7.1])(base);
   var threshold = T([0,1,2])([-0.075,2.6,7])(base_step);
   var step26 = STRUCT([base,threshold]);

  var base = CUBOID([3,0.2,0.4]);
   base = T([1,2])([2.60001,7.5])(base);
   var threshold = T([0,1,2])([-0.075,2.8,7.4])(base_step);
   var step27 = STRUCT([base,threshold]);

  var tensteps = STRUCT([step17,step18,step19,step20,step21,step22,step23,step24,step25,step26,step27]);
  tensteps= ROTATE([0,2])(-PI/2)(tensteps);
  tensteps = T([0,1,2])([3.6,2.6,8.2])(tensteps);
  var tenstepsBase = T([0,2])([-4.3,8.2])(CUBOID([4.3,2.15,3]));
  var tenstepsBase_A = T([0,1,2])([-2.2,2.15,8.2])(CUBOID([2.2,1.1,3])); 
  var tenstepsBase_B = T([0,1,2])([-4.3,2.15,8.2])(CUBOID([1,1.1,3]));
  var stairsWindow = getWindow(true,1.1,1.1);
  stairsWindow2 = T([0,1,2])([-3.3,2.15,8.5])(stairsWindow);
  var left_stair = COLOR(stairsColor)(STRUCT([stairs, tensteps, tenstepsBase,tenstepsBase_A,tenstepsBase_B]));
  left_stair = STRUCT([left_stair,stairsWindow2]);
  var right_stair = S([0])([-1])(left_stair);
  right_stair = T([0])([-25.7])(right_stair);
  gradino = T([0,1,2])([-13.85,-0.0000001,5])(CUBOID([2,0.25,4.3]));
  gradino_2 = T([0,1,2])([-13.85,0.2499999,5.5])(CUBOID([2,0.25,3.57]));
  gradino_3 = T([0,1,2])([-14.35,-0.0000001,32])(CUBOID([3,0.25,2.5]))
  gradino_4 = T([0,1,2])([-13.85,0.2499999,32])(CUBOID([2,0.25,2]));
  var doorSteps = COLOR(stairsColor)(STRUCT([gradino,gradino_2,gradino_3,gradino_4]));

  exports.twinStairs = STRUCT([left_stair,right_stair,doorSteps]);
  }(this));



/****************************************************************************
*                                                                           *
* Due its simmetrical nature,                                               *
* here is a function which creates half - central                           *
* structure and replicates it.                                              *
*                                                                           *
*****************************************************************************/


  !(function(exports){
  var lower_piece = CUBOID([1.52, 1.3, 0.5]);
  var middle_piece = CUBOID([1.52,2.15,0.5]);
  var upper_piece = CUBOID([1.52, 5.4-0.04, 0.5]);

  var architrave_1st_window = T([0,1])([-1.52,4.06])(lower_piece);
  var base_1st_window = T([0])([-1.52])(middle_piece);
  var middle_central = T([0])([-3.04])(upper_piece);
  var architrave_2nd_window = T([0,1])([-4.56,4.06])(lower_piece);
  var base_2nd_window = T([0])([-4.56])(middle_piece);
  var right_central = T([0])([-6.08])(upper_piece);
  var architrave_door= T([0,1])([-7.07,4.06])(CUBOID([0.99, 1.3, 0.5]));
  var side_lower_piece = T([0,1,2])([8.09,4.06,0.499])(CUBOID([0.5, 1.3, 1.52]));
  var side_middle_piece = T([0,2])([8.09,0.499])(CUBOID([0.5, 2.15, 1.52]));
  var side_upper_piece = T([0,2])([8.09,0.499+1.52])(CUBOID([0.5, 5.4-0.04, 26.931]));
  var central_sx = STRUCT([upper_piece,architrave_1st_window,base_1st_window,middle_central,
                    architrave_2nd_window,base_2nd_window,right_central,architrave_door
                    ]);
  
  var central_sx_back = T([2])([28.45])(central_sx);
  central_sx = T([0])([7.07])(central_sx);
  central_sx_back = T([0])([7.07])(central_sx_back);
  
  central_sx = STRUCT([central_sx,side_lower_piece,side_middle_piece,side_upper_piece,central_sx_back]);

  var central_dx = S([0])([-1])(central_sx);

  var basement_floor = T([0,1])([-8.6,5.4])(CUBOID([17.2,0.1,28.95]));
  
  var central = STRUCT([central_sx,central_dx,basement_floor]);
  central = COLOR(stairsColor)(T([0,2])([-12.85,5.15])(central));

  var doorExample = CUBOID([2,4.05,0.05]);
  var frontDoor = T([0,1,2])([-13.85,0.5,5.6])(doorExample);
  var backDoor = T([0,1,2])([-13.85,0.5,33.55])(doorExample);
  var doors = COLOR(doorColor)(STRUCT([frontDoor,backDoor]));

  var baseWindow = getWindow(true);
   var rotatedBaseWindow = R([0,2])([-PI])(S([0])([-1])(baseWindow));

  var leftLowerWindow = T([0,1,2])([-10.33+1.52+1.52,2.15,5.3])(baseWindow);
  var leftMiddleLowerWindow = T([0,1,2])([-10.33,2.15,5.3])(baseWindow);
  var rightMiddleLowerWindow = T([0,1,2])([-10.33-1.52*4-0.48,2.15,5.3])(baseWindow);
  var rightLowerWindow = T([0,1,2])([-10.33-1.52*6-0.48,2.15,5.3])(baseWindow);


  var backLeftLowerWindow = T([0,1,2])([-10.33+1.52+1.52,2.15,33.75])(rotatedBaseWindow);
  var backLeftMiddleLowerWindow = T([0,1,2])([-10.33,2.15,33.75])(rotatedBaseWindow);
  var backRightMiddleLowerWindow = T([0,1,2])([-10.33-1.52*4-0.48,2.15,33.75])(rotatedBaseWindow);
  var backRightLowerWindow = T([0,1,2])([-10.33-1.52*6-0.48,2.15,33.75])(rotatedBaseWindow);

  var frontColonnadeWindows = STRUCT([ leftLowerWindow, leftMiddleLowerWindow,
                                      rightLowerWindow, rightMiddleLowerWindow
                                    ]);

  var backColonnadeWindows = STRUCT([ backLeftLowerWindow, backLeftMiddleLowerWindow,
                                      backRightMiddleLowerWindow, backRightLowerWindow
                                    ]);

  var leftSideWindow = T([0,1,2])([-4.5,2.15,5.7])(R([0,2])([-PI/2])(baseWindow));
  var rightSideWindow = T([0,1,2])([-21.2,2.15,7.15])(R([0,2])([PI/2])(baseWindow));

  var sideColonnadeWindows = STRUCT([leftSideWindow,rightSideWindow]);


  var colonnadeWindows = STRUCT([frontColonnadeWindows,backColonnadeWindows,sideColonnadeWindows]);

  colonnadeBasement = STRUCT([central,doors,colonnadeWindows]);
  exports.colonnadeBasement = colonnadeBasement;
  }(this)); 


/****************************************************************************
*                                                                           *
* Drawing Villa's basement and garden                                       *
*                                                                           *
*****************************************************************************/


   !(function(exports){

    var sideAvenue = COLOR(avenueColor)(CUBOID([8.3,0.05,34.65])); //lunghezza 44
    var secondHalfSideAvenue = COLOR(avenueColor)(CUBOID([5.2,0.05,9.35]));
    var Avenue =  COLOR(avenueColor)(CUBOID([25.7,0.05,2]));
    var garden = T([0,1,2])([-42,-0.99,-10])(COLOR(gardenColor)(CUBOID([60,1,60])));
    var frontDoorAvenue = T([0,2])([-13.85,-0.5])(COLOR(avenueColor)(CUBOID([2,0.05,6])));
    var backDoorAvenue = T([2])([35])(T([0,2])([-15.35,-2.5])(COLOR(avenueColor)(CUBOID([5,0.05,7]))));
    var rightSideAvenue = T([0,2])([-34,-2.5])(sideAvenue);
    var leftSideAvenue = T([2])([-2.5])(sideAvenue);
    var secondHaldRightSideAvenue = T([0,2])([-34,32.15])(secondHalfSideAvenue);
    var secondHaldLeftSideAvenue = T([0,2])([3.125,32.15])(secondHalfSideAvenue);
    var frontSideAvenue = T([0,2])([-25.7,-2.5])(Avenue);
    var backSideAvenue = T([0,2])([-28.8,39.5])(COLOR(avenueColor)(CUBOID([32,0.05,2])));
    
    var basement = STRUCT([garden,frontDoorAvenue,backDoorAvenue,frontSideAvenue,backSideAvenue,leftSideAvenue,
                          rightSideAvenue,secondHaldLeftSideAvenue,secondHaldRightSideAvenue
                          ]);
    exports.garden = basement;

    }(this));

/****************************************************************************
*                                                                           *
* Drawing Villa's main Building                                             *
*                                                                           *
*****************************************************************************/

  !(function(exports){
  var g = 29;
  var depth = 18.825; 
  var sideDepth = 2.03; 

  var x_z_0 = T([0,2])([-29.5 + g,11.22])(CUBOID([2.03,20.325,1.53]));

  var z_2 = T([0,1,2])([-29.5 + g,2.955+1.794-0.5,13.72])(CUBOID([2.03,2.48+0.5,1.952]));
  var z_3 = T([0,1,2])([-29.5 + g,2.955+1.794+2.48+4.115, 13.72])(CUBOID([2.03,5.276,1.952]));
  var z_4 = T([0,1,2])([-29.5 + g,2.955+1.794+2.48+4.115+5.276+3.18,13.72])(CUBOID([2.03,0.527,1.952]));

  var z_1_B = T([0,2])([-29.5 + g,13.72+1.952+5])(CUBOID([2.03,2.455,1.952])); /*before 2.955*/
  var z_2_B = T([0,1,2])([-29.5 + g,2.955+1.794-0.5,13.72+1.952+5])(CUBOID([2.03,2.48+0.5,1.952]));
  var z_3_B = T([0,1,2])([-29.5 + g,2.955+1.794+2.48+4.115, 13.72+1.952+5])(CUBOID([2.03,5.276,1.952]));
  var z_4_B = T([0,1,2])([-29.5 + g,2.955+1.794+2.48+4.115+5.276+3.18,13.72+1.952+5])(CUBOID([2.03,0.527,1.952]));

  var z_1_C = T([0,2])([-29.5 + g,13.72+1.952*2+5*2])(CUBOID([2.03,2.955-0.5,1.952]));
  var z_2_C = T([0,1,2])([-29.5 + g,2.955+1.794-0.5,13.72+1.952*2+5*2])(CUBOID([2.03,2.48+0.5,1.952]));
  var z_3_C = T([0,1,2])([-29.5 + g,2.955+1.794+2.48+4.115, 13.72+1.952*2+5*2])(CUBOID([2.03,1.25,1.952])); /*5.276*/
  var z_5_C = T([0,1,2])([-29.5 + g,2.955+1.794+2.48+4.115+1.25+1.25, 13.72+1.952*2+5*2])(CUBOID([2.03,2.776,1.952])); 
  var z_4_C = T([0,1,2])([-29.5 + g,2.955+1.794+2.48+4.115+5.276+3.18,13.72+1.952*2+5*2])(CUBOID([2.03,0.527,1.952]));


  var z_y_1 = T([0,2])([-29.5 + g,12.75])(CUBOID([2.03,20.325,1]));
  var z_y_2 = T([0,2])([-29.5 + g,11.22+2.5+1.952])(CUBOID([2.03,20.325,5]));
  var z_y_3 = T([0,2])([-29.5 + g,11.22+2.5+1.952+5+1.952])(CUBOID([2.03,20.325,5]));
  var z_y_4 = T([0,2])([-29.5 + g,11.22+2.5+1.952+5+1.952+5+1.952])(CUBOID([2.03,20.325,2.5]));


  var x_1 = T([0,2])([-25.518 +g,11.22])(CUBOID([5.43,20.325,sideDepth])); 
  var y_1 = T([0,2])([-27.47 +g,11.22])(CUBOID([1.952,2.955-0.5,sideDepth]));/*20.88*/
  var y_1_2 = T([0,1,2])([-27.47+g,2.955+1.794-0.5,11.22])(CUBOID([1.952,2.48+0.5,sideDepth]));
  var y_1_3 = T([0,1,2])([-27.47+g,2.955+1.794+2.48+4.115,11.22])(CUBOID([1.952,5.276,sideDepth]));
  var y_1_4 = T([0,1,2])([-27.47+g,2.955+1.794+2.48+4.115+5.276+3.18,11.22])(CUBOID([1.952,0.527,sideDepth]));
  var y_2_2 = T([0,2])([-20.1+g,11.22])(CUBOID([1.952,2.955+1.794+2.48,sideDepth]));
  var y_2_3 = T([0,1,2])([-20.1+g,2.955+1.794+2.48+4.115,11.22])(CUBOID([1.952,5.276,sideDepth]));
  var y_2_4 = T([0,1,2])([-20.1+g,2.955+1.794+2.48+4.115+5.276+3.18,11.22])(CUBOID([1.952,0.527,sideDepth]));
  var x_2 = T([0,2])([-18.148+g,11.22])(CUBOID([2.638,20.325,sideDepth]));
  var y_3 = T([0,2])([-15.51+g,11.22])(CUBOID([2.057,5.3,sideDepth]));
  var y_3_1 = T([0,1,2])([-15.51+g,5.3+5.5,11.22])(CUBOID([2.057,9.523,sideDepth]));

  var x_1_back = T([0,2])([-25.518 +g,11.22+depth])(CUBOID([5.43,20.325,sideDepth])); 
  var y_1_back = T([0,2])([-27.47 +g,11.22+depth])(CUBOID([1.952,2.955-0.5,sideDepth]));/*20.88*/
  var y_1_2_back = T([0,1,2])([-27.47+g,2.955+1.794-0.5,11.22+depth])(CUBOID([1.952,2.48+0.5,sideDepth]));
  var y_1_3_back = T([0,1,2])([-27.47+g,2.955+1.794+2.48+4.115,11.22+depth])(CUBOID([1.952,1.25,sideDepth]));
  var y_1_5_back = T([0,1,2])([-27.47+g,2.955+1.794+2.48+4.115+1.25*2,11.22+depth])(CUBOID([1.952,2.776,sideDepth]));
  var y_1_4_back = T([0,1,2])([-27.47+g,2.955+1.794+2.48+4.115+5.276+3.18,11.22+depth])(CUBOID([1.952,0.527,sideDepth]));
  var y_2_2_back = T([0,2])([-20.1+g,11.22+depth])(CUBOID([1.952,2.955+1.794+2.48,sideDepth]));
  var y_2_3_back = T([0,1,2])([-20.1+g,2.955+1.794+2.48+4.115,11.22+depth])(CUBOID([1.952,5.276,sideDepth]));
  var y_2_4_back = T([0,1,2])([-20.1+g,2.955+1.794+2.48+4.115+5.276+3.18,11.22+depth])(CUBOID([1.952,0.527,sideDepth]));
  var x_2_back = T([0,2])([-18.148+g,11.22+depth])(CUBOID([2.638,20.325,sideDepth]));
  var y_3_back = T([0,2])([-15.51+g,11.22+depth])(CUBOID([2.057,5.3,sideDepth]));
  var y_3_1_back = T([0,1,2])([-15.51+g,5.3+5.5,11.22+depth])(CUBOID([2.057,9.523,sideDepth]));

  var windowbase = getWindow(false,2,1.8);
  var window2 = T([0,1,2])([-0.75,2.45,11.52])(windowbase);
  var window22 = T([0])([-25.975])(window2)
  var windowMiddle = getWindow(false,2,4.05);
  var window3 = T([0,1,2])([-0.75,7.25,11.52])(windowMiddle);
  var window23 = T([0])([-25.975])(window3)
  var window4 = T([0])([-7.375])(window3);
  var window25 = T([0])([-11.25])(window4);
  var windowUpper = getWindow(false,2,3.2);
  var window5 = T([0,1,2])([-0.75,16.6,11.52])(windowUpper);
  var window24 = T([0])([-25.975])(window5)
  var windowUpperSmaller = getWindow(false,2,1.6);
  var window6 = T([0,1,2])([-0.75-7.375,18.2,11.52])(windowUpperSmaller);
  var window66 = T([0])([-11.25])(window6);
   
  var frontWindows = STRUCT([ window2,window3,window4,window5,window6,window22,window23,window24,window25,window66]);

  var windowbasegratings = getWindow(true,2,1.8);
  var leftLowerSideWindow = R([0,2])([-PI/2])(windowbasegratings);
  var leftMiddleSideWindow = R([0,2])([-PI/2])(windowMiddle);
  var leftUpperSideWindow = R([0,2])([-PI/2])(windowUpper);
  var rightLowerSideWindow = R([0,2])([PI/2])(windowbasegratings);
  var rightMiddleSideWindow = R([0,2])([PI/2])(windowMiddle);
  var rightUpperSideWindow = R([0,2])([PI/2])(windowUpper);

  var window6 = T([0,1,2])([2.75,2.45,20.7])(leftLowerSideWindow);
  var window7 = T([2])([6.9])(window6);

  var window8 = T([0,1,2])([2.75,7.25,20.7])(leftMiddleSideWindow);
  var window9 = T([2])([6.9])(window8);
  var window10 = T([2])([-6.9])(window8);

  var window11 = T([0,1,2])([2.75,16.6,20.7])(leftUpperSideWindow);
  var window12 = T([2])([6.9])(window11);
  var window13 = T([2])([-6.9])(window11);

  var window14 = T([0,1,2])([-28.4,2.45,22.65])(rightLowerSideWindow);
  var window15 = T([2])([6.9])(window14);

  var window16 = T([0,1,2])([-28.4,7.25,22.65])(rightMiddleSideWindow);
  var window17 = T([2])([6.9])(window16);
  var window18 = T([2])([-6.9])(window16);

  var window19 = T([0,1,2])([-28.4,16.6,22.65])(rightUpperSideWindow);
  var window20 = T([2])([6.9])(window19);
  var window21 = T([2])([-6.9])(window19);

  var window30 = T([0,1,2])([-28.4,12.55,22.65+6.95])(R([0,2])([PI/2])(getWindow(false,2,1.3)));
  var window30Back = T([0,1,2])([2.75,12.55,20.7+6.9])(R([0,2])([-PI/2])(getWindow(false,2,1.3)));


  var sidesWindows = STRUCT([window6,window7,window8,window9,window10,window11,
    window12,window13,window14,window15,window16,window17,window18,window19,window20,window21,window30,window30Back]);

  var rotatedBaseWindow = R([0,2])([-PI])(S([0])([-1])(windowbasegratings));
  var rotatedMiddleWindow = R([0,2])([-PI])(S([0])([-1])(windowMiddle));
  var rotatedMiddleUpperWindow = R([0,2])([-PI])(S([0])([-1])(getWindow(false,2,1.3)));
  var rotatedUpperWindow = R([0,2])([-PI])(S([0])([-1])(windowUpper));


  var window2Back = T([0,1,2])([-0.75,2.45,31.75])(rotatedBaseWindow);
  var window22Back = T([0])([-25.975])(window2Back)

  var window3Back = T([0,1,2])([-0.75,7.25,31.75])(rotatedMiddleWindow);
  var window23Back = T([0])([-25.975])(window3Back)
  var window4Back = T([0])([-7.375])(window3Back);
  var window25Back = T([0])([-11.25])(window4Back);

  var window5Back = T([0,1,2])([-0.75,12.55,31.75])(rotatedMiddleUpperWindow);
  var window24Back = T([0])([-25.975])(window5Back)

  var window6Back = T([0,1,2])([-0.75,16.6,31.75])(rotatedUpperWindow);
  var window26Back = T([0])([-25.975])(window6Back)




  var backWindows = STRUCT([window24Back,window2Back,window22Back,window3Back,window4Back,window23Back,window25Back,window5Back,window6Back,window26Back]);

  var mainBuildingWindows = STRUCT([frontWindows,sidesWindows,backWindows]);

  var main_building = STRUCT([x_z_0,x_1,y_1,y_1_2,y_1_3,y_1_4,y_2_2,y_2_3,y_2_4,x_2,y_3,y_3_1,z_2,z_3,z_4,z_y_1,z_y_2,z_y_3,z_y_4,
    z_1_B,z_2_B,z_3_B,z_4_B,z_1_C,z_2_C,z_3_C,z_4_C,z_5_C,x_1_back,y_1_back,y_1_2_back,y_1_3_back,y_1_4_back,y_1_5_back,y_2_2_back,y_2_3_back,
    y_2_4_back,x_2_back,y_3_back,y_3_1_back]);
  var building = S([0])([-1])(main_building);
  main_building = T([0])([-31])(main_building);
  var toppa_2 = T([0,1,2])([-10.85,2.955+1.794+2.48+4.115 +5.276,11.22])(CUBOID([1.952,1.6,0.05]));
  var toppa_1 = T([0,1,2])([-10.85-11.25,2.955+1.794+2.48+4.115 +5.276,11.22])(CUBOID([1.952,1.6,0.05]));


var portaPortoneAlfa = SIMPLEX_GRID([[0.8],[-0.1,0.3],[-3.2,3.3]]);
    var portaPortone = COLOR(mainDoorColor)(STRUCT([portaPortoneAlfa, S([0])([-1])(portaPortoneAlfa)]));
    var cornicePortoneAlfa = STRUCT([   SIMPLEX_GRID([[1],[0.4],[-6.5,0.2]]),       //corniceOrizzontale
                                        SIMPLEX_GRID([[-0.8,0.2],[0.4],[-3.2,3.3]]) //corniceVerticale
                                        ]);
    var cornicePortone = COLOR(shutterColor)(STRUCT([cornicePortoneAlfa, S([0])([-1])(cornicePortoneAlfa)]));
    var c1 = CUBIC_HERMITE(S0)([[0,-0.2,6.7],[1.2,0,6.7],[4.1,0,0],[0,1,0]]);   //curva sotto
    var c2 = CUBIC_HERMITE(S0)([[0,-0.3,7.15],[1.4,0,7.15],[4.3,0,0],[0,1,0]]); //curva sopra
     
    var c1c2 = BEZIER(S1)([c1,c2]);
     
    var d1 = BEZIER(S0)([[0,0,6.7],[1.2,0,6.7]]);
    var d2 = BEZIER(S0)([[0,0,7.15],[1.4,0,7.15]]);
    var c1d1 = BEZIER(S1)([c1,d1]);
    var c2d2 = BEZIER(S1)([c2,d2]); 
     
    var tettoPortoneAlfa = STRUCT([ MAP(c1c2)(domain2),                                 
                                    MAP(c1d1)(domain2),
                                    MAP(c2d2)(domain2)
                                    ]);
    var c3 = BEZIER(S0)([[1,0,5.7],[1,-0.25,5.75],[1,0.3,6.1],[1,-0.5,6.2],[1,-0.6,6.5],[1,-0.2,6.7]]);
    var c4 = BEZIER(S0)([[1.2,0,5.7],[1.2,-0.25,5.75],[1.2,0.3,6.1],[1.2,-0.5,6.2],[1.2,-0.6,6.5],[1.2,-0.2,6.7]]);
    var c3c4 = BEZIER(S1)([c3,c4]);
    var d3 = BEZIER(S0)([[1,0,5.7],[1,0,6.7]]);
    var d4 = BEZIER(S0)([[1.2,0,5.7],[1.2,0,6.7]]);
    var c3d3 = BEZIER(S1)([c3,d3]);
    var c4d4 = BEZIER(S1)([c4,d4]);
    var tettoPortoneBeta = STRUCT([ tettoPortoneAlfa,                                   
                                    MAP(c3c4)(domain2),
                                    MAP(c3d3)(domain2),
                                    MAP(c4d4)(domain2)
                                    ]);
    var tettoPortone = COLOR(shutterColor)(STRUCT([tettoPortoneBeta, S([0])([-1])(tettoPortoneBeta)]));
    var portone = STRUCT([portaPortone,cornicePortone,tettoPortone]);
    portone2 = R([1,2])(-PI/2)(portone)
    portone3 = R([0,2])(PI)(portone2);
    portone4 = T([0,1,2])([-12.7,-0.2,10.9])(S([0,1])([2.1,1.7])(portone3))

    var leftSideDoor = T([0,2])([2.75,22.65-9])(CUBOID([0.01,4.5,2]));
    var rightSideDoor = T([0,2])([-28.4,22.65-9])(CUBOID([0.01,4.5,2]));

    var sidesDoors = COLOR(doorColor)(STRUCT([leftSideDoor,rightSideDoor]));


  var MAIN = COLOR(stairsColor)(T([0])([2.75])(STRUCT([main_building,building,toppa_2,toppa_1])));
  MAIN = STRUCT([MAIN,portone4,sidesWindows,mainBuildingWindows,sidesDoors]);
  
  exports.mainBuilding = MAIN;



    
  }(this));


/****************************************************************************
*                                                                           *
* Drawing Villa's colonnade                                                 *
*                                                                           *
*****************************************************************************/

  !(function(exports){
    var base = [];  
    

    var r = -1.3;
    var p0 = [[5+r,0,0], [5.2+r,0,0], [5.2+r,0,0.5], [4.4+r,0,0.6]];
    var k0 = [0,0,0,1,2,2,2];
    var c0 = NUBS(S0)(2)(k0)(p0);
    var m0 = ROTATIONAL_SURFACE(c0);
    var s0 = MAP(m0)(domain4);  
    base.push(s0);

    var d1 = 0.5;
    var p1 = [[4.4+r,0,0.6],[4.7+r,0,0.6],[4.8+r,0,1],
      [4.7+r,0,1.2],[4.5+r,0,1.3],[3.3+d1+r,0,1.7],[3.25+d1+r,0,1.71],[3.25+d1+r,0,2]];
    var k1 = [0,0,0,1,2,3,4,5,6,6,6];
    var c1 = NUBS(S0)(2)(k1)(p1);
    var m1 = ROTATIONAL_SURFACE(c1);
    var s1 = MAP(m1)(domain4);  
    base.push(s1);

    var p2 = [[3.25+d1+r,0,2],[2.9+d1+r,0,2]];
    var c2 = BEZIER(S0)(p2);
    var m2 = ROTATIONAL_SURFACE(c2);
    var s2 = MAP(m2)(domain4);  
    base.push(s2);
    var column_base = STRUCT(base);

    var cyl_surface = CYL_SURFACE([2.1,40])();
    cyl_surface = T([2])([2])(cyl_surface);
 
    var l = 1.5;
    var Capital = [];
    var rotationAngle = 2.18/3*PI;

        
        var p0 = capitalwithtrolsPoints(0.03);
        p0 = rotatePoints(p0,rotationAngle,1);
        var k0 = makeKnots(p0,2);
        var c0 = NUBS(S0)(2)(k0)(p0);
        var p1 = capitalwithtrolsPoints(0.035);
        p1 = rotatePoints(p1,rotationAngle,1);
        var k1 = makeKnots(p1,2);
        var c1 = NUBS(S0)(2)(k1)(p1);
        var s0 = BEZIER(S1)([c0,c1]);

        
        var p2 = capitalwithtrolsPoints(0.03);
        p2 = rotatePoints(p2,rotationAngle,1);
        p2 = movesPoints(p2,1,1.1);
        var k2 = makeKnots(p2,2);
        var c2 = NUBS(S0)(2)(k2)(p2);
        var p3 = capitalwithtrolsPoints(0.035);
        p3 = rotatePoints(p3,rotationAngle,1);
        p3 = movesPoints(p3,1,1.1);
        var k3 = makeKnots(p3,2);
        var c3 = NUBS(S0)(2)(k3)(p3);
        var s1 = BEZIER(S1)([c2,c3]);

        var b1 = BEZIER(S2)([s0,s1]);
        var base1 = MAP(b1)(domain3);
        Capital.push(base1);

        
        var p0 = capitalwithtrolsPoints(0.03);
        p0 = rotatePoints(p0,rotationAngle,1);
        p0 = scalePoints(p0,[-1,1,1]);
        p0 = movesPoints(p0,0,-(l));
        var k0 = makeKnots(p0,2);
        var c0 = NUBS(S0)(2)(k0)(p0);
        var p1 = capitalwithtrolsPoints(0.035);
        p1 = rotatePoints(p1,rotationAngle,1);
        p1 = scalePoints(p1,[-1,1,1]);
        p1 = movesPoints(p1,0,-(l));
        var k1 = makeKnots(p1,2);
        var c1 = NUBS(S0)(2)(k1)(p1);
        var s0 = BEZIER(S1)([c0,c1]);

        
        var p2 = capitalwithtrolsPoints(0.03);
        p2 = rotatePoints(p2,rotationAngle,1);
        p2 = scalePoints(p2,[-1,1,1]);
        p2 = movesPoints(p2,0,-(l));
        p2 = movesPoints(p2,1,1.1);
        var k2 = makeKnots(p2,2);
        var c2 = NUBS(S0)(2)(k2)(p2);
        var p3 = capitalwithtrolsPoints(0.035);
        p3 = rotatePoints(p3,rotationAngle,1);
        p3 = scalePoints(p3,[-1,1,1]);
        p3 = movesPoints(p3,0,-(l));
        p3 = movesPoints(p3,1,1.1);
        var k3 = makeKnots(p3,2);
        var c3 = NUBS(S0)(2)(k3)(p3);
        var s1 = BEZIER(S1)([c2,c3]);

        var b2 = BEZIER(S2)([s0,s1]);
        var base2 = MAP(b2)(domain3);
        Capital.push(base2);

        
        var p0 = capitalwithtrolsPoints(0.03);
        p0 = rotatePoints(p0,rotationAngle,1);
        var k0 = makeKnots(p0,2);
        var c0 = NUBS(S0)(2)(k0)(p0);
        var fp = BEZIER(S0)([p0[0],p0[0]]);
        var s0 = BEZIER(S1)([c0,fp]);

        var p2 = capitalwithtrolsPoints(0.03);
        p2 = rotatePoints(p2,rotationAngle,1);
        p2 = movesPoints(p2,1,1);
        var k2 = makeKnots(p2,2);
        var c2 = NUBS(S0)(2)(k2)(p2);
        fp = BEZIER(S0)([p2[0],p2[0]]);
        var s1 = BEZIER(S1)([c2,fp]);

        var b1 = BEZIER(S2)([s0,s1]);
        var base1 = MAP(b1)(domain3);
        Capital.push(T([1])([0.05])(base1));

        
        var p0 = capitalwithtrolsPoints(0.03);
        p0 = rotatePoints(p0,rotationAngle,1);
        p0 = scalePoints(p0,[-1,1,1]);
        p0 = movesPoints(p0,0,-(l));
        var k0 = makeKnots(p0,2);
        var c0 = NUBS(S0)(2)(k0)(p0);
        fp = BEZIER(S0)([p0[0],p0[0]]);
        var s0 = BEZIER(S1)([c0,fp]);


        var p2 = capitalwithtrolsPoints(0.03);
        p2 = rotatePoints(p2,rotationAngle,1);
        p2 = scalePoints(p2,[-1,1,1]);
        p2 = movesPoints(p2,0,-(l));
        p2 = movesPoints(p2,1,1);
        var k2 = makeKnots(p2,2);
        var c2 = NUBS(S0)(2)(k2)(p2);
        fp = BEZIER(S0)([p2[0],p2[0]]);
        var s1 = BEZIER(S1)([c2,fp]);

        var b2 = BEZIER(S2)([s0,s1]);
        var base2 = MAP(b2)(domain3);
        Capital.push(T([1])([0.05])(base2));

    var capital = COLOR(columnsColor)(STRUCT([
          T([0,2])([0.25+l,+0.25])(STRUCT(Capital)),
          T([0,2])([0.3,0.465])(
          SIMPLEX_GRID([[0,0.25+l-0.3],[0,1.1],[0,0.03]])),
          T([0,1,2])([0.4,0.05,0.2])(
            SIMPLEX_GRID([[0,l-0.3],[0,1],[0,0.28]]))
          ]));
    var capital2 = S([0,1,2])([4,4,4])(capital);
    var capital3 = T([0,1,2])([-4,-2,41])(capital2);
    var column = STRUCT([column_base,cyl_surface,capital3]);
    var rotated_column =  ROTATE([1,2])(-PI/2)(column);
    var scaled_column = S([0,1,2])([0.2,0.2,0.2])(rotated_column);
    scaled_column = T([0,1,2])([-5,5.4,6])(scaled_column);
    var colonnade = COLOR(columnsColor)(STRUCT([
                                          scaled_column,
                                          T([0])([-3.04])(S([0])([1])(scaled_column)),
                                          T([0])([-6.08])(S([0])([1])(scaled_column)),
                                          T([0])([-9.6])(S([0])([1])(scaled_column)),
                                          T([0])([-12.64])(S([0])([1])(scaled_column)),
                                          T([0])([-15.68])(S([0])([1])(scaled_column)),
                                          T([2])([2.5])(S([0])([1])(scaled_column)),
                                          T([2])([5])(S([0])([1])(scaled_column)),
                                          T([0,2])([-15.68,2,5])(S([0])([1])(scaled_column)),
                                          T([0,2])([-15.68,5])(S([0])([1])(scaled_column))

                                          ]));
    exports.colonnade = colonnade;


  }(this));


/****************************************************************************
*                                                                           *
* Drawing the Tympanum                                                      *
*                                                                           *
*****************************************************************************/


  !(function(exports){
    var base_0 = T([0,1,2])([-21.4,14.1,5.15])(CUBOID([17,0.5,1.52]));
    var base_0_A = T([0,1,2])([-5.6,14.1,5.15])(CUBOID([1.52,0.5,6]));
    var base_0_B = T([0,1,2])([-21.58,14.1,5.15])(CUBOID([1.52,0.5,6]));
    var lower_cornicione = STRUCT([base_0,base_0_A,base_0_B]);
    var base_1 = T([0,1,2])([-21.8,14.6,5])(CUBOID([18,0.05,1.67]));
    var base_1_A = T([0,1,2])([-5.55,14.6,6.67])(CUBOID([1.74,0.05,4.48]));
    var base_1_B = T([0,1,2])([-21.82,14.6,6.67])(CUBOID([1.74,0.05,4.48]));
    var soglia_cornicione = STRUCT([base_1,base_1_A,base_1_B]);
    var base_2 =   T([0,1,2])([-21.4,14.605,5.15])(CUBOID([17,0.75,1.52]));
    var base_2_A = T([0,1,2])([-5.6,14.605,5.15])(CUBOID([1.52,0.75,6]));
    var base_2_B = T([0,1,2])([-21.58,14.605,5.15])(CUBOID([1.52,0.75,6]));
     var upper_cornicione = STRUCT([base_2,base_2_A,base_2_B]);
     var cornicione = COLOR(roofColor)(STRUCT([lower_cornicione,soglia_cornicione,upper_cornicione]));
     var domTRI33 = COLOR(stairsColor)(TRIANGLE_DOMAIN(32, [[0,3.5228,0],[-9.678,0,0],[9.678,0,0]]));
     domTRI33 = T([0,1,2])([-12.8,15.772,5.2])(domTRI33);

    var k = 0.41666;
    var c = 0.25;
    var h = -3.75
    var d = 0.15
    var n = 0.2
    var m = 29.85
    var q  = (k + c);
    var little_square = CUBOID([0.25,0.25,0.4]);

    var base_triangolo = T([0,1])([-9.75,-3.5])(CUBOID([19.5,0.1,6.57]));
    var t= CUBOID([10.3,0.1,30.45]);
    var t2 = T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t));
    var t3 = T([0])([0.1])(S([0])([-1])(t2));
    var t4= T([1,2])([0.1,0.1])(CUBOID([10.3,0.2,30.45]));
    var t5 = T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t4));
    var t6 = T([0])([0.1])(S([0])([-1])(t5));
    var t7= T([1])([0.3])(CUBOID([10.55,0.1,30.45]));
    var t8 = T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t7));
    var t9 = T([0])([0.1])(S([0])([-1])(t8));
    var square = T([1,2])([h,d])(CUBOID([0.25,0.25,0.4]));
    var square_h = T([0,1,2])([-0.1,h+3.55,d])(CUBOID([0.25,0.25,0.4]));
    var rotated_square = R([0,2])(-PI/2)(CUBOID([0.25,0.25,0.4]));
    var c1 = T([0,1,2])([q,h,d])(little_square);
      var c1_h = T([0,1,2])([q,h+3.3,d])(little_square);
    var c2 = T([0,1,2])([q*2,h,d])(little_square);
      var c2_h = T([0,1,2])([q*2,h+3.05,d])(little_square);
    var c3 = T([0,1,2])([q*3,h,d])(little_square);
      var c3_h = T([0,1,2])([q*3,h+2.8,d])(little_square);
    var c4 = T([0,1,2])([q*4,h,d])(little_square);
      var c4_h = T([0,1,2])([q*4,h+2.55,d])(little_square);
    var c5 = T([0,1,2])([q*5,h,d])(little_square);
      var c5_h = T([0,1,2])([q*5,h+2.3,d])(little_square);
    var c6 = T([0,1,2])([q*6,h,d])(little_square);
      var c6_h = T([0,1,2])([q*6,h+2.1,d])(little_square);
    var c7 = T([0,1,2])([q*7,h,d])(little_square);
      var c7_h = T([0,1,2])([q*7,h+1.85,d])(little_square);
    var c8 = T([0,1,2])([q*8,h,d])(little_square);
      var c8_h = T([0,1,2])([q*8,h+1.6,d])(little_square);
    var c9 = T([0,1,2])([q*9,h,d])(little_square);
      var c9_h = T([0,1,2])([q*9,h+1.35,d])(little_square);
    var c10 = T([0,1,2])([q*10,h,d])(little_square);
      var c10_h = T([0,1,2])([q*10,h+1.1,d])(little_square);
    var c11 = T([0,1,2])([q*11,h,d])(little_square);
      var c11_h = T([0,1,2])([q*11,h+0.85,d])(little_square);
    var c12 = T([0,1,2])([q*12,h,d])(little_square);
      var c12_h = T([0,1,2])([q*12,h+0.6,d])(little_square);
    var c13 = T([0,1,2])([q*13,h,d])(little_square);
      var c13_h = T([0,1,2])([q*13,h+(n*2),d])(little_square);
    var c15 = T([0,1,2])([-q*14,h,d])(little_square);
    var c16 = T([0,1,2])([-q,h,d])(little_square);
      var c16_h = T([0,1,2])([-q-0.1,h+3.35,d])(little_square);
    var c17 = T([0,1,2])([-q*2,h,d])(little_square);
      var c17_h = T([0,1,2])([-q*2,h+3.15,d])(little_square);
    var c18 = T([0,1,2])([-q*3,h,d])(little_square);
      var c18_h = T([0,1,2])([-q*3,h+2.9,d])(little_square);
    var c19 = T([0,1,2])([-q*4,h,d])(little_square);
      var c19_h = T([0,1,2])([-q*4,h+2.65,d])(little_square);
    var c20 = T([0,1,2])([-q*5,h,d])(little_square);
      var c20_h = T([0,1,2])([-q*5,h+2.4,d])(little_square);
    var c21 = T([0,1,2])([-q*6,h,d])(little_square);
      var c21_h = T([0,1,2])([-q*6,h+2.2,d])(little_square);
    var c22 = T([0,1,2])([-q*7,h,d])(little_square);
      var c22_h = T([0,1,2])([-q*7,h+1.95,d])(little_square);
    var c23 = T([0,1,2])([-q*8,h,d])(little_square);
      var c23_h = T([0,1,2])([-q*8,h+1.7,d])(little_square);
    var c24 = T([0,1,2])([-q*9,h,d])(little_square);
      var c24_h = T([0,1,2])([-q*9,h+1.45,d])(little_square);
    var c25 = T([0,1,2])([-q*10,h,d])(little_square);  
      var c25_h = T([0,1,2])([-q*10,h+1.2,d])(little_square);
    var c26 = T([0,1,2])([-q*11,h,d])(little_square);
      var c26_h = T([0,1,2])([-q*11,h+0.95,d])(little_square);
    var c27 = T([0,1,2])([-q*12,h,d])(little_square);
      var c27_h = T([0,1,2])([-q*12,h+0.7,d])(little_square);
    var c28 = T([0,1,2])([-q*13,h,d])(little_square)
      var c28_h = T([0,1,2])([-q*13,h+0.5,d])(little_square)
    var c29 = T([0,1,2])([q*14,h,q])(rotated_square);
    var c30 = T([0,1,2])([q*14,h,q*2])(rotated_square);
    var c31 = T([0,1,2])([q*14,h,q*3])(rotated_square);
    var c32 = T([0,1,2])([q*14,h,q*4])(rotated_square);
    var c33 = T([0,1,2])([q*14,h,q*5])(rotated_square);
    var c34 = T([0,1,2])([q*14,h,q*6])(rotated_square);    
    var c35 = T([0,1,2])([q*14,h,q*7])(rotated_square);
    var c36 = T([0,1,2])([q*14,h,q*8])(rotated_square);
    var c37 = T([0,1,2])([q*14,h,q*9])(rotated_square);
    var c38 = T([0,1,2])([q*14,h,q*10])(rotated_square);
    var c39 = T([0,1,2])([-q*14,h,q])(rotated_square);
    var c40 = T([0,1,2])([-q*14,h,q*2])(rotated_square);
    var c41 = T([0,1,2])([-q*14,h,q*3])(rotated_square);
    var c42 = T([0,1,2])([-q*14,h,q*4])(rotated_square);
    var c43 = T([0,1,2])([-q*14,h,q*5])(rotated_square);
    var c44 = T([0,1,2])([-q*14,h,q*6])(rotated_square);
    var c45 = T([0,1,2])([-q*14,h,q*7])(rotated_square);
    var c46 = T([0,1,2])([-q*14,h,q*8])(rotated_square);
    var c47 = T([0,1,2])([-q*14,h,q*9])(rotated_square);
    var c48 = T([0,1,2])([-q*14,h,q*10])(rotated_square);
               
    var base_triangolo_2 = T([0,1,2])([-9.75,-3.5,23.95])(CUBOID([5.75-q+0.25,0.1,6.57]));
    var base_triangolo_3 = T([0,1,2])([4,-3.5,23.95])(CUBOID([5.75,0.1,6.57]));
    var c10_d = T([0,1,2])([q*10,h,d+m])(little_square);
    var c5_d = T([0,1,2])([q*14,h,d+m])(little_square);
    var c7_d = T([0,1,2])([q*7,h,d+m])(little_square);
    var c6_d = T([0,1,2])([q*6,h,d+m])(little_square);
    var c8_d = T([0,1,2])([q*8,h,d+m])(little_square);
    var c9_d = T([0,1,2])([q*9,h,d+m])(little_square);
    var c11_d = T([0,1,2])([q*11,h,d+m])(little_square);
    var c12_d = T([0,1,2])([q*12,h,d+m])(little_square);
    var c13_d = T([0,1,2])([q*13,h,d+m])(little_square);
    var c15_d = T([0,1,2])([-q*14,h,d+m])(little_square);
    var c1_h_d = T([0,1,2])([q,h+3.3,d+m])(little_square);
    var c2_h_d = T([0,1,2])([q*2,h+3.05,d+m])(little_square);
    var c3_h_d = T([0,1,2])([q*3,h+2.8,d+m])(little_square);
    var c4_h_d = T([0,1,2])([q*4,h+2.55,d+m])(little_square);
    var c5_h_d = T([0,1,2])([q*5,h+2.3,d+m])(little_square);         
    var c6_h_d = T([0,1,2])([q*6,h+2.1,d+m])(little_square);     
    var c7_h_d = T([0,1,2])([q*7,h+1.85,d+m])(little_square);
    var c8_h_d = T([0,1,2])([q*8,h+1.6,d+m])(little_square);
    var c9_h_d = T([0,1,2])([q*9,h+1.35,d+m])(little_square);
    var c10_h_d = T([0,1,2])([q*10,h+1.1,d+m])(little_square);
    var c11_h_d = T([0,1,2])([q*11,h+0.85,d+m])(little_square);
    var c12_h_d = T([0,1,2])([q*12,h+0.6,d+m])(little_square);
    var c13_h_d = T([0,1,2])([q*13,h+(n*2),d+m])(little_square);
    var c16_h_d = T([0,1,2])([-q-0.1,h+3.35,d+m])(little_square);
    var c17_h_d = T([0,1,2])([-q*2,h+3.15,d+m])(little_square);
    var c18_h_d = T([0,1,2])([-q*3,h+2.9,d+m])(little_square);
    var c19_h_d = T([0,1,2])([-q*4,h+2.65,d+m])(little_square);
    var c20_h_d = T([0,1,2])([-q*5,h+2.4,d+m])(little_square);
    var c21_h_d = T([0,1,2])([-q*6,h+2.2,d+m])(little_square);
    var c22_h_d = T([0,1,2])([-q*7,h+1.95,d+m])(little_square);
    var c23_h_d = T([0,1,2])([-q*8,h+1.7,d+m])(little_square);
    var c24_h_d = T([0,1,2])([-q*9,h+1.45,d+m])(little_square);
    var c25_h_d = T([0,1,2])([-q*10,h+1.2,d+m])(little_square);
    var c26_h_d = T([0,1,2])([-q*11,h+0.95,d+m])(little_square);
    var c27_h_d = T([0,1,2])([-q*12,h+0.7,d+m])(little_square);
    var c28_h_d = T([0,1,2])([-q*13,h+0.5,d+m])(little_square)
    var c22_d = T([0,1,2])([-q*7,h,d+m])(little_square);
    var c23_d = T([0,1,2])([-q*8,h,d+m])(little_square);
    var c24_d = T([0,1,2])([-q*9,h,d+m])(little_square);
    var c25_d = T([0,1,2])([-q*10,h,d+m])(little_square);
    var c26_d = T([0,1,2])([-q*11,h,d+m])(little_square);
    var c27_d = T([0,1,2])([-q*12,h,d+m])(little_square);
    var c28_d = T([0,1,2])([-q*13,h,d+m])(little_square)
                
    var tetto = COLOR(roofColor)(STRUCT([base_triangolo,t2,t3,t5,t6,t8,t9,square,square_h,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,
      c11,c12,c13,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31,c32,c33,c34,c35,c36,c37,c38,c39,c40,c41,c42,c43,
      c44,c45,c46,c47,c48,c27_h,c13_h,c12_h,c11_h,c10_h,c9_h,c28_h,c8_h,c7_h,c6_h,c5_h,c4_h,c3_h,c2_h,c1_h,c16_h,c17_h,c18_h,c19_h,
      c20_h,c21_h,c22_h,c23_h,c24_h,c25_h,c26_h,base_triangolo_3,base_triangolo_2,c10_d,c7_d,c6_d,c8_d,c9_d,c11_d,c12_d,c15_d,c13_d,
      c22_d,c23_d,c24_d,c25_d,c26_d,c27_d,c28_d,c5_d,c6_h_d,c7_h_d,c8_h_d,c9_h_d,c10_h_d,c11_h_d,c12_h_d,c13_h_d,c16_h_d,c17_h_d,
      c18_h_d,c19_h_d,c20_h_d,c21_h_d,c22_h_d,c23_h_d,c24_h_d,c25_h_d,c26_h_d,c27_h_d,c28_h_d,c2_h_d,c3_h_d,c4_h_d,c1_h_d,c5_h_d]));

    tetto = T([0,1,2])([-12.8,19,4.6])(tetto);

    exports.gable = STRUCT([cornicione,tetto,domTRI33]);
    }(this));

/****************************************************************************
*                                                                           *
* Drawing the BackSide of the Villa, with its Circular Wall and Glass       *
*                                                                           *
*****************************************************************************/


!(function(exports){
    
  var a1 = T([0,1,2])([-5.78,7.3,32.1])(CUBOID([1.52,11.95,2]));
  var a2 = T([0,1,2])([-5.78-1.52*2,7.3,32.1])(CUBOID([1.52,11.95,2]));
  var a3 = T([0,1,2])([-5.78-1.52*4+0.12,7.3,32.1])(CUBOID([1.2,11.95,2]));
  var a4 = T([0,1,2])([-5.78-1.52*6-0.25,7.3,32.1])(CUBOID([1.2,11.95,2]));
  var a5 = T([0,1,2])([-5.78-1.52*8-0.5,7.3,32.1])(CUBOID([1.52,11.95,2]));
  var a6 = T([0,1,2])([-5.78-1.52*10-0.5,7.3,32.1])(CUBOID([1.52,11.95,2]));
  var a7 = T([0,1,2])([-5.78-1.52*3-0.2,17.3,32.1])(CUBOID([1.72,1.95,2]));
  var a8 = T([0,1,2])([-5.78-1.52*7-0.5,17.3,32.1])(CUBOID([1.77,1.95,2]));
  var h9 = T([0,1,2])([-5.78-1.52*6 + 0.55,17.3,32.1])(CUBOID([1.52*2-0.02,0.5,2]));
  var h10 = T([0,1,2])([-5.78-1.52*6 + 0.55,18.815,32.1])(CUBOID([1.52*2-0.02,0.435,2]));
  var h1 = T([0,1,2])([-5.78-1.52*10-0.5,19.24,32.10001111])(CUBOID([17.22,1.1,2]));
  var h2 = T([0,1,2])([-5.78-1.52*7-0.5,11.3,32.10001111])(CUBOID([1.78,2,2]));
  var h3 = T([0,1,2])([-5.78-1.52*9-0.5,10.3,32.10001111])(CUBOID([1.52,2.25,2]));
  var h5 = T([0,1,2])([-5.78-1.52*4+0.52-3.025,11.3,32.10001111])(CUBOID([3.025,2,2]));
  var h11 = T([0,1,2])([-5.78-1.52*4+0.52+0.8,11.3,32.10001111])(CUBOID([1.72,2,2]));



  var h4 = T([0,1,2])([-5.78-1.52*10-0.5,5.3,32.10001111])(CUBOID([17.22,2,2]));
  var h6 = T([0,1,2])([-5.78-1.52,10.3,32.10111111])(CUBOID([1.52,2.25,2]))
  var h7 = T([0,1,2])([-5.78-1.52*9-0.5,13.7,32.10111111])(CUBOID([1.52,3.25,2]));
  var h8 = T([0,1,2])([-5.78-1.52,13.7,32.10111111])(CUBOID([1.52,3.25,2]));

    var c1a = CUBIC_HERMITE(S0)([[0,0,1.75],[0.55,0,1.67],[1,0,0],[0,0,0]]);
    var c2a = CUBIC_HERMITE(S0)([[0,0,1.65],[0.45,0,1.5925],[0.8,0,0],[0,0,0]]);
    var c1c2a = BEZIER(S1)([c1a,c2a]);
    var c1b = CUBIC_HERMITE(S0)([[0,0.3,1.75],[0.55,0.3,1.67],[1,0,0],[0,0,0]]);
    var c2b = CUBIC_HERMITE(S0)([[0,0.3,1.65],[0.45,0.3,1.5925],[0.8,0,0],[0,0,0]]);
    var c1c2b = BEZIER(S1)([c1b,c2b]);
    var c1c2a_c1c2b = BEZIER(S2)([c1c2a,c1c2b]);
    var sol_c1c2a_c1c2b = MAP(c1c2a_c1c2b)(domain6);
    var c3a = BEZIER(S0)([[0,0,1.2],[0,0,1.65]]);
    var c4a = BEZIER(S0)([[0.05,0,1.2],[0.05,0,1.65]]);
    var c3c4a = BEZIER(S1)([c3a,c4a]);
    var c3b = BEZIER(S0)([[0,0.3,1.2],[0,0.3,1.65]]);
    var c4b = BEZIER(S0)([[0.05,0.3,1.2],[0.05,0.3,1.65]]);
    var c3c4b = BEZIER(S1)([c3b,c4b]);
    var c3c4a_c3c4b = BEZIER(S2)([c3c4a,c3c4b]);
    var sol_c3c4a_c3c4b = MAP(c3c4a_c3c4b)(domain6);
    var c5a = BEZIER(S0)([[0.45,0,1.59],[0.45,0,1.5925]]);
    var c6a = BEZIER(S0)([[0.55,0,1.59],[0.55,0,1.67]]);
    var c5c6a = BEZIER(S1)([c5a,c6a]);
    var c5b = BEZIER(S0)([[0.45,0.3,1.59],[0.45,0.3,1.5925]]);
    var c6b = BEZIER(S0)([[0.55,0.3,1.59],[0.55,0.3,1.67]]);
    var c5c6b = BEZIER(S1)([c5b,c6b]);
    var c5c6a_c5c6b = BEZIER(S2)([c5c6a,c5c6b]);
    var sol_c5c6a_c5c6b = MAP(c5c6a_c5c6b)(domain6);
    var corniceCentraleAlfa = STRUCT([sol_c1c2a_c1c2b,sol_c5c6a_c5c6b]);
    var corniceCentrale = STRUCT([corniceCentraleAlfa, S([0])([-1])(corniceCentraleAlfa)]);
    var c9a = c1a;
    var c10a = CUBIC_HERMITE(S0)([[0,0.4,1.75],[0.55,0.4,1.67],[1,0,0],[0,0,0]]);
    var c9c10a = BEZIER(S1)([c9a,c10a]);
    var c9b = BEZIER(S0)([[0,0,1.75],[0.55,0,1.75]]);
    var c10b = BEZIER(S0)([[0,0.4,1.75],[0.55,0.4,1.75]]);
    var c9c10b = BEZIER(S1)([c9b,c10b]);
    var c9c10a_c9c10b = BEZIER(S2)([c9c10a,c9c10b]);
    var sol_c9c10a_c9c10b = MAP(c9c10a_c9c10b)(domain6);
    var muroCentrale = STRUCT([sol_c9c10a_c9c10b, S([0])([-1])(sol_c9c10a_c9c10b)]);
     var d1a = CUBIC_HERMITE(S0)([[1.75,0,0],[0.85,0,1.55],[0,0,3.5],[0,0,0]]);
    var d2a = CUBIC_HERMITE(S0)([[1.75,0.3,0],[0.85,0.3,1.55],[0,0,3.5],[0,0,0]]);
    var d1d2a = BEZIER(S1)([d1a,d2a]);
    var d1b = CUBIC_HERMITE(S0)([[1.65,0,0],[0.85,0,1.435],[0,0,3.25],[0,0,0]]);
    var d2b = CUBIC_HERMITE(S0)([[1.65,0.3,0],[0.85,0.3,1.435],[0,0,3.25],[0,0,0]]);
    var d1d2b = BEZIER(S1)([d1b,d2b]);
    var d1d2a_d1d2b = BEZIER(S2)([d1d2a,d1d2b]);
    var sol_d1d2a_d1d2b = MAP(d1d2a_d1d2b)(domain6);
    var d3a = BEZIER(S0)([[0.85,0,1.2],[0.95,0,1.2]]);
    var d4a = BEZIER(S0)([[0.85,0,1.45],[0.95,0,1.38]]);
    var d3d4a = BEZIER(S1)([d3a,d4a]);
    var d3b = BEZIER(S0)([[0.85,0.3,1.2],[0.95,0.3,1.2]]);
    var d4b = BEZIER(S0)([[0.85,0.3,1.45],[0.95,0.3,1.38]]);
    var d3d4b = BEZIER(S1)([d3b,d4b]);
    var d3d4a_d3d4b = BEZIER(S2)([d3d4a,d3d4b]);
    var sol_d3d4a_d3d4b = MAP(d3d4a_d3d4b)(domain6);
    var corniceLateraleAlfa = STRUCT([sol_d1d2a_d1d2b,sol_d3d4a_d3d4b]);
    var corniceLaterale = STRUCT([corniceLateraleAlfa, S([0])([-1])(corniceLateraleAlfa)]);
    var d9a = d1a;
    var d10a = CUBIC_HERMITE(S0)([[1.75,0.4,0],[0.85,0.4,1.55],[0,0,3.5],[0,0,0]]);
    var d9d10a = BEZIER(S1)([d9a,d10a]);
    var d9b = BEZIER(S0)([[1.75,0,1.75],[0.85,0,1.75]]);
    var d10b = BEZIER(S0)([[1.75,0.4,1.75],[0.85,0.4,1.75]]);
    var d9d10b = BEZIER(S1)([d9b,d10b]);
    var d9d10a_d9d10b = BEZIER(S2)([d9d10a,d9d10b]);
    var sol_d9d10a_d9d10b = MAP(d9d10a_d9d10b)(domain6);
    var muroLaterale =STRUCT([sol_d9d10a_d9d10b, S([0])([-1])(sol_d9d10a_d9d10b)]);
    var finestraCircolare = STRUCT([corniceCentrale, muroCentrale, corniceLaterale,muroLaterale]);

     var pezzoCentrale = STRUCT([corniceCentrale, muroCentrale]);
    pezzoCentrale = R([1,2])([-PI/2])(pezzoCentrale);

    pezzoCentrale = S([0,1,2])([3.3,3.2,2.75])(pezzoCentrale);
    var pezzoCentrale2 = T([0,1,2])([-12.85,11.8,34.099])(pezzoCentrale);

     var pezzoLaterale = STRUCT([corniceLaterale, muroLaterale]);
    pezzoLaterale = R([1,2])([-PI/2])(pezzoLaterale);

    pezzoLaterale = S([0,1,2])([2.45,2.75,2.75])(pezzoLaterale);
    var pezzoLaterale2 = T([0,1,2])([-12.85,12.5,34.099])(pezzoLaterale);

    
    var m1 = BEZIER(S0)([[0.55,0.4,9.4],[0.55,0.8,9.4]]);
    var m2 = BEZIER(S0)([[0,0.4,9.61],[0,0.8,9.61]]);
    var m1m2 = BEZIER(S1)([m1,m2]);
    var m3 = BEZIER(S0)([[0.55,0.4,9.61],[0.55,0.8,9.61]]);
    var m1m2m3 = BEZIER(S2)([m1m2,m3]);
    var pezzoMuroInclinato = MAP(m1m2m3)(domain5);
    pezzoMuroInclinato = STRUCT([pezzoMuroInclinato,S([0])([-1])(pezzoMuroInclinato)])
    pezzoMuroInclinato = R([1,2])([-PI/2])(pezzoMuroInclinato);

      pezzoMuroInclinato = S([0,1,2])([2.75,2.8,2.75])(pezzoMuroInclinato);
    var pezzoMuroInclinato2 = T([0,1,2])([-12.85,-8.0925,35.2])(pezzoMuroInclinato);

    var back = COLOR(stairsColor)(STRUCT([a1,a2,a3,a4,a5,a6,a7,a8,h1,h2,h3,h4,h5,h6,
                                          h7,h8,h9,h10,h11,pezzoMuroInclinato2,pezzoCentrale2,pezzoLaterale2
                                          ]));

  var rotatedSmallerMiddleWindow = R([0,2])([-PI])(S([0])([-1])(getWindow(false,1.5,3)));
  var rotatedLargerMiddleWindow = R([0,2])([-PI])(S([0])([-1])(getWindow(false,1.7,4)));
  var rotatedMiddleWindow = R([0,2])([-PI])(S([0])([-1])(getWindow(false,2.2,4)));

  var backRightLowerWindow = T([0,1,2])([-10.33+1.52+1.52,7.3,33.75])(rotatedSmallerMiddleWindow);
  var backLeftLowerWindow = T([0])([-12.65])(backRightLowerWindow);
  var backRightMiddleLargerWindow = T([0,1,2])([-10.55,7.3,33.75])(rotatedLargerMiddleWindow);
  var backLeftMiddleLargerWindow = T([0])([-6.35])(backRightMiddleLargerWindow);

  var backMiddleWindow = T([0,1,2])([-13.95,7.3,33.75])(rotatedMiddleWindow);
 
  var backRightSmallerWindow = T([0,1,2])([-5.8,12.55,33.75])(R([0,2])([PI])(getWindow(false,1.5,1.15)));
  var backLeftSmallerWindow = T([0])([-12.65])(backRightSmallerWindow);

  var backRightUpperWindow = T([0,1,2])([-5.8,16.9,33.75])(R([0,2])([PI])(getWindow(false,1.5,2.35)));
  var backLeftUpperWindow = T([0])([-12.65])(backRightUpperWindow);

  var backWindows = STRUCT([backRightLowerWindow,backLeftLowerWindow,backRightMiddleLargerWindow,
                            backLeftMiddleLargerWindow, backMiddleWindow, backRightSmallerWindow,
                            backLeftSmallerWindow, backRightUpperWindow, backLeftUpperWindow]);

  var domTRI99 = COLOR(windowsColor)(TRIANGLE_DOMAIN(32, [[-3,0,0.1],[1.5,1.5,0.1],[6,0,0.1]]));
  var TRiWindow =  T([0,1,2])([-14.35,17.8,33.8])(domTRI99);

  var grating = CUBOID([0.01,3.8,0.05]);
  var gratingY = CUBOID([10,0.01,0.05]);
  var frame = CUBOID([0.15,3.8,0.05]);

  var middle_x_center = T([0,1,2])([-5.78-1.52*5+0.4625,13.3,33.8])(CUBOID([0.15,3.8,0.05]));
  var line_x_1a = T([0,1,2])([0.3-5.78-1.52*5+0.4625,13.3,33.8])(grating);
  var line_x_2a= T([0])([0.3])(line_x_1a);
  var line_x_3a = T([0])([0.3*2])(line_x_1a);
  var line_x_4a = T([0])([0.3*3])(line_x_1a);
  var line_x_5a = T([0])([0.3*4])(line_x_1a);
  var line_x_9a = T([0])([0.3*8])(line_x_1a);
  var line_x_11a = T([0])([0.3*10])(line_x_1a);
  var line_x_12a = T([0])([0.3*11])(line_x_1a);

  var line_x_1b = T([0])([-0.3*2])(line_x_1a);
  var line_x_2b = T([0])([-0.3*3])(line_x_1a);
  var line_x_3b = T([0])([-0.3*4])(line_x_1a);
  var line_x_4b = T([0])([-0.3*5])(line_x_1a);
  var line_x_5b = T([0])([-0.3*6])(line_x_1a);
  var line_x_9b = T([0])([-0.3*10])(line_x_1a);
  var line_x_11b = T([0])([-0.3*12])(line_x_1a);
  var line_x_12b = T([0])([-0.3*13])(line_x_1a);

  var line_y_1 = T([0,1,2])([-3.2 -5.78-1.52*6+0.4625,13.3 +0.3,33.8])(gratingY);
  var line_y_2 = T([1])([0.3])(line_y_1);
  var line_y_3 = T([1])([0.3*2])(line_y_1);
  var line_y_4 = T([1])([0.3*3])(line_y_1);
  var line_y_5 = T([1])([0.3*4])(line_y_1);
  var line_y_6 = T([1])([0.3*5])(line_y_1);
  var line_y_7 = T([1])([0.3*6])(line_y_1);
  var line_y_8 = T([1])([0.3*7])(line_y_1);
  var line_y_9 = T([1])([0.3*8])(line_y_1);
  var line_y_10 = T([1])([0.3*9])(line_y_1);

  var middle_x_left = T([0,1,2])([-3.1 -5.78-1.52*5+0.4625,13.3,33.8])(frame);
  var middle_x_right = T([0,1,2])([2.95 -5.78-1.52*5+0.4625,13.3,33.8])(frame);
  var middle_y = T([0,1,2])([-3.2 -6-1.52*5+0.4625,15.15,33.8])(CUBOID([8.5,0.15,0.05]));
  var middle_y_2 = T([0,1,2])([-3.2 -9.78-1.52*5+0.4625,9.15,33.69])(CUBOID([15,0.15,0.05]));

  var inferriata_specchio = COLOR(frameColor)(STRUCT([middle_x_center,middle_x_left,middle_x_right,middle_y,line_x_1a,line_x_2a,line_x_3a,line_x_4a,
    line_x_5a,line_x_9a,line_x_11a,line_x_12a,line_x_1b,line_x_2b,line_x_3b,line_x_4b,
    line_x_5b,line_x_9b,line_x_11b,line_x_12b,line_y_1,line_y_2,line_y_3,line_y_4,line_y_5,line_y_6,line_y_7,line_y_8,line_y_9,
    line_y_10,middle_y_2]));

  var glass= COLOR(windowsColor)(R([0,2])([-PI])(S([0])([-1])(BOUNDARY(CUBOID([8.5,3.8,0.025])))));
  var Tglass = T([0,1,2])([-17.4,13.3,33.55])(glass);

  var weirdWindows = STRUCT([TRiWindow, inferriata_specchio,Tglass])
    back = STRUCT([back, backWindows, weirdWindows]);
    back = T([0])([0.025])(back);
    exports.backFacade = back;

  }(this));

/****************************************************************************
*                                                                           *
* Drawing the Roof, with no Chymneypots                                     *
*                                                                           *
*****************************************************************************/
  
    !(function(exports){


  var bordo_cubo =  T([0,1,2])([-29.2,20.3125,10.75])(CUBOID([33,0.025,22]));
  bordo_cubo = COLOR(roofColor)(bordo_cubo);
  var bordo_cubo_2 =  T([0,1,2])([-28.95,20.3,11])(CUBOID([32.5,0.0125,21.6]));
  bordo_cubo_2 = COLOR(roofColor)(bordo_cubo_2);

  var base_triangolo = T([0,1])([-9.55,-3.5])(COLOR(roofColor)(CUBOID([19.1,0.1,20])));
  var base_triangolo_2 = T([0,1,2])([-9.55,-3.7,0.1])(COLOR(roofColor)(CUBOID([19.1,0.2,19.8])));
  var base_triangolo_3 = T([0,1])([-9.55,-3.8])(COLOR(roofColor)(CUBOID([19.1,0.1,20])));
  var base_triangolo_4a = T([1])([2])(CUBOID([2.697,2.5,19.9]));
  var base_triangolo_4b = T([0,1])([2.697,4.2])(CUBOID([2.71,0.3,19.9]));
  var base_triangolo_4b_down = T([0,1])([2.697,2])(CUBOID([2.71,0.3,19.9]));
  var base_triangolo_4c = T([0,1])([2.697+2.71,2])(CUBOID([2.158,2.5,19.9]));
  var base_triangolo_4d = T([0,1])([2.697+2.7+2.158,4.2])(CUBOID([1.888,0.3,19.9]));
  var base_triangolo_4d_down = T([0,1])([2.697+2.7+2.158,2])(CUBOID([1.888,0.3,19.9]));
  var mezzopiano_sx = STRUCT([base_triangolo_4a,base_triangolo_4b,
                              base_triangolo_4b_down,base_triangolo_4c,
                              base_triangolo_4d, base_triangolo_4d_down]);
  var mezzopiano_dx = T([0])([2*(2.697+2.7+2.158+1.888)])(S([0])([-1])(mezzopiano_sx));
  var base_triangolo_4 = COLOR(stairsColor)(STRUCT([mezzopiano_sx,mezzopiano_dx]));
  base_triangolo_4 = T([0,1,2])([-9.55,-8.3,0.1])(base_triangolo_4);
    var t= CUBOID([10.3,0.1,20]);
    var t2 = COLOR(roofColor)(T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t)));
    var t3 = COLOR(roofColor)(T([0])([0.1])(S([0])([-1])(t2)));
      var t4= T([1,2])([0.1,0.1])(CUBOID([10.3,0.2,19.8]));
    var t5 = COLOR(roofColor)(T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t4)));
    var t6 = COLOR(roofColor)(T([0])([0.1])(S([0])([-1])(t5)));
      var t7= T([1])([0.3])(CUBOID([10.55,0.1,20]));
    var t8 = COLOR(roofColor)(T([0])([-0.1])(ROTATE([0,1])(-PI/9)(t7)));
    var t9 = COLOR(roofColor)(T([0])([0.1])(S([0])([-1])(t8)));
    var domTRI34 = COLOR(stairsColor)(TRIANGLE_DOMAIN(32, [[0,3.5228,0],[-9.678,0,0],[9.678,0,0]]));
    domTRI34 = T([1,2])([-3.5228,0.4])(domTRI34);
    domTRI35 = T([2])([19.2])(domTRI34);
    var triangle = STRUCT([base_triangolo,base_triangolo_2,base_triangolo_3,base_triangolo_4,t2,t3,t5,t6,t8,t9,domTRI34,domTRI35]);
    triangle = S([0,1])([0.4,0.6])(triangle);
    triangle = T([0,1,2])([-13,25.4,11.7])(triangle);
 
    var p =1;    
    var h1 = 0.16;
    var h2 = 0.08885;
    var hs = 0.01777;
    var hb = 0.795+h1+h2;
    var hc = 0.745;
    var hl = (hb-hc-10*hs)/2;

    var unscaledRoof = (STRUCT([
                TRIANGLE_DOMAIN(1,[[2.205*p,0.355*p,(hb+4*hl+0.0897)*p],[1.28*p,1.05*p,(hb+4*hl+0.5357)*p],[0.355*p,0.355*p,(hb+4*hl+0.0897)*p]]),
                TRIANGLE_DOMAIN(1,[[2.205*p,3.105*p,(hb+4*hl+0.0897)*p],[1.28*p,2.41*p,(hb+4*hl+0.5357)*p],[0.355*p,3.105*p,(hb+4*hl+0.0897)*p]]),
                getRoof(p,[[0.355,0.355,hb+4*hl+0.0897], [0.355,3.105,hb+4*hl+0.0897], [1.28,2.41,hb+4*hl+0.5357], [1.28,1.05,hb+4*hl+0.5357]]),
                T([0])([2.55])(S([0])([-1])(getRoof(p,[[0.355,0.355,hb+4*hl+0.0897], [0.355,3.105,hb+4*hl+0.0897], [1.28,2.41,hb+4*hl+0.5357], [1.28,1.05,hb+4*hl+0.5357]])))
            ]));


     var unscaledRoof2 = R([0,2])([PI/2])(unscaledRoof);
     var unscaledRoof3 = R([0,1])([PI/2])(unscaledRoof2);
     var scaledRoof = S([0,1,2])([11.7,12,11.5])(unscaledRoof3);
     var ultimateScaledRoof = COLOR(roofColor)(T([0,1,2])([7.5,3.8,36.4])(scaledRoof));

  var windowMiddle = getWindow(false,1.1,1.2);
  var windowA = T([0,1,2])([-11.425,21.8,12])(windowMiddle);
  var windowC = T([0])([-4.35])(windowA);
  var biggerWindow = getWindow(false,1.5,1.2);
  var windowB = T([0,1,2])([-13.8,21.8,12])(biggerWindow);

  var frontRoofWindow = STRUCT([windowA, windowB, windowC]);

  var rotatedMiddleWindow = R([0,2])([-PI])(S([0])([-1])(windowMiddle));
  var rotatedBiggerWindow= R([0,2])([-PI])(S([0])([-1])(biggerWindow));

  var windowABack = T([0,1,2])([-11.425,21.8,31.5])(rotatedMiddleWindow);
  var windowBBack = T([0,1,2])([-13.8,21.8,31.5])(rotatedBiggerWindow);
  var windowCBack = T([0])([-4.35])(windowABack);

  var backRoofWindow = STRUCT([windowABack,windowBBack,windowCBack]);

  var roofWindows = STRUCT([frontRoofWindow,backRoofWindow]);

  var tympanumRoof = STRUCT([triangle,roofWindows]);

  tympanumRoof = T([1])([-1])(tympanumRoof);
  tympanumRoof = S([0])([1.15])(tympanumRoof);
  tympanumRoof = T([0])([2])(tympanumRoof);

  var p = T([0,1,2])([-21.85,20.3,32.25])(COLOR(roofColor)(CUBOID([18,0.05,2.3])));

    exports.roof = STRUCT([ultimateScaledRoof,bordo_cubo,bordo_cubo_2,tympanumRoof,p]);
  }(this));



/****************************************************************************
*                                                                           *
* Draw external Walls                                                       *
*                                                                           *
*****************************************************************************/

  !(function(exports){

    var first_wall = T([0,2])([-12,4.85])(CUBOID([8, 1, 0.3]));
    var second_wall = T([0,1,2])([-12,1,4.9])(CUBOID([8, 0.6, 0.25]));
     var third_wall = T([0,1,2])([-12,1.6,4.95])(CUBOID([8, 0.1, 0.2]));
      var fourth_wall = T([0,1,2])([-12,1.7,5])(CUBOID([8, 0.1, 0.15]));
       
      var cornice = STRUCT([first_wall,second_wall,third_wall,fourth_wall]);
      var cornice_1 = T([0])([-9.65])(cornice);


      var cornice_ruotata28 = S([0,1])([1.75,0.6])(cornice);
      var cornice_ruotata_28 = T([0,1,2])([10.35,6,6])(cornice_ruotata28);

      var cornice_ruotata29 = S([0,1])([1.75,0.6])(cornice_1);
      var cornice_ruotata_29 = T([0,1,2])([9.05,6,6])(cornice_ruotata29);


      var cornice_ruotata_30 = T([0,2])([5.15,3])(S([0])([0.8])(cornice));


     var cornice_ruotata_31 = T([0,2])([-10.35,3])(S([0])([0.8])(cornice_1));

      var cornice_ruotata = R([0,2])(PI/2)(cornice)
      var cornice_ruotata_2 = T([0,2])([-26.6,3.1])(S([2])([0.5])(cornice_ruotata));
      var cornice_ruotata_6 = T([0,2])([-26.6,28.2])(S([2])([0.5])(cornice_ruotata));
      cornice_ruotata = R([0,2])(-PI/2)(cornice)
      var cornice_ruotata_3 = T([0,2])([0.85,11.1])(S([2])([0.5])(cornice_ruotata));
      var cornice_ruotata_7 = T([0,2])([0.85,35.35])(S([2])([0.3])(cornice_ruotata));

      var externalWallA = STRUCT([cornice,cornice_1,cornice_ruotata_28,
                                  cornice_ruotata_29,cornice_ruotata_30,
                                  cornice_ruotata_31,cornice_ruotata_2,
                                  cornice_ruotata_6,cornice_ruotata_3,
                                  cornice_ruotata_7]);




      cornice_ruotata = R([0,2])(PI)(cornice)
      var cornice_ruotata_4 = T([0,2])([-25.7,39.25])(cornice_ruotata);
      var cornice_ruotata_5 = T([0])([9.85])(cornice_ruotata_4);
      var cornice_ruotata_8 = T([0,2])([7.25,-2])(cornice_ruotata_5);
      var cornice_ruotata_9 = T([0,2])([-7.15,-2])(cornice_ruotata_4);

      var cornice_ruotata_10 = T([0,2])([-7.3,-108.15])(S([2])([4.1])(cornice_ruotata_6));
      var cornice_ruotata_11 = T([0,2])([7.55,-203.5])(S([2])([6.9])(cornice_ruotata_7));

      var cornice_ruotata_10_A = T([0,2])([-7.3,-8.5])(S([2])([0.65])(cornice_ruotata_6));
      var cornice_ruotata_11_A = T([0,2])([7.55,-23.75])(S([2])([1.1])(cornice_ruotata_7));

      var externalWallB = STRUCT([cornice_ruotata_4,cornice_ruotata_5,
                                  cornice_ruotata_8,cornice_ruotata_9,
                                  cornice_ruotata_10,cornice_ruotata_11,
                                  cornice_ruotata_10_A,cornice_ruotata_11_A]);
      
  /*bordo di mezzo*/

    
      var cornice_ruotata_16 = T([0,1])([2.25,6])(S([0,1])([1.1,0.6])(cornice_ruotata_4));
      var cornice_ruotata_17 = T([0,1])([0.15,6])( S([0,1])([1.1,0.6])(cornice_ruotata_5));
      var cornice_ruotata_18 = T([1])([6])(S([1])([0.6])(cornice_ruotata_6));
      var cornice_ruotata_19 = T([1])([6])(S([1])([0.6])(cornice_ruotata_7));
      var cornice_ruotata_20 = T([1])([6])(S([1])([0.6])(cornice_ruotata_8));
      var cornice_ruotata_21 = T([1])([6])(S([1])([0.6])(cornice_ruotata_9));
      var cornice_ruotata_22 = T([0,1,2])([-7.3,6,-149])(S([1,2])([0.6,5.3])(cornice_ruotata_6));
      var cornice_ruotata_23 = T([0,1,2])([7.55,6,-265])(S([1,2])([0.6,8.7])(cornice_ruotata_7));

      var middleExternalWall = STRUCT([cornice_ruotata_16,cornice_ruotata_17,cornice_ruotata_18,cornice_ruotata_19,cornice_ruotata_20,
                                      cornice_ruotata_21,cornice_ruotata_22,cornice_ruotata_23]);

      /*Wall Under the bridge */

      var k = 20.05; 
      var fs = 0.15;   
      var cornice_ruotata_50 = T([0,1])([2.25,k])(S([0,1])([1.1,fs])(cornice_ruotata_4));
      var cornice_ruotata_51 = T([0,1])([0.15,k])( S([0,1])([1.1,fs])(cornice_ruotata_5));
      var cornice_ruotata_52 = T([1])([k])(S([1])([fs])(cornice_ruotata_6));
      var cornice_ruotata_53 = T([1])([k])(S([1])([fs])(cornice_ruotata_7));
      var cornice_ruotata_54 = T([1])([k])(S([1])([fs])(cornice_ruotata_8));
      var cornice_ruotata_55 = T([1])([k])(S([1])([fs])(cornice_ruotata_9));
      var cornice_ruotata_56 = T([0,1,2])([-7.3,k,-149])(S([1,2])([fs,5.3])(cornice_ruotata_6));
      var cornice_ruotata_57 = T([0,1,2])([7.55,k,-265])(S([1,2])([fs,8.7])(cornice_ruotata_7));

      var cornice_ruotata58 = S([0,1])([2,fs])(cornice);
      var cornice_ruotata_58 = T([0,1,2])([11.3,k,6])(cornice_ruotata58);


      var cornice_ruotata59 = S([0,1])([2.05,fs])(cornice_1);
      var cornice_ruotata_59 = T([0,1,2])([15.5,k,6])(cornice_ruotata59);

      var underRoofWall = STRUCT([cornice_ruotata_50,cornice_ruotata_51,
                                  cornice_ruotata_52,cornice_ruotata_53,
                                  cornice_ruotata_54,cornice_ruotata_55,
                                  cornice_ruotata_56,cornice_ruotata_57,
                                  cornice_ruotata_58,cornice_ruotata_59
                                  ]);


  /*Muro esterno più alto*/

  var fifth_wall = T([0,1,2])([-5.7,14.1,11])(CUBOID([9, 0.5, 0.1]));
  var sixth_wall = T([0,1,2])([-28.9,14.1,11])(CUBOID([7.4, 0.5, 0.1]));

  var seventh_wall = T([0,1,2])([-5.7,15,11])(CUBOID([9, 0.8, 0.1]));
  var eigth_wall = T([0,1,2])([-28.9,15,11])(CUBOID([7.4, 0.8, 0.1]));

  var tenth_wall = T([0,1,2])([3.2,15,11])(CUBOID([0.1, 0.8, 21.15]));
  var eleventh_wall = T([0,1,2])([-28.9,15,11])(CUBOID([0.1, 0.8, 21.15]));

  var twelve_wall = T([0,1,2])([3.2,14.1,11])(CUBOID([0.1, 0.5, 21.15]));
  var thirteen_wall = T([0,1,2])([-28.9,14.1,11])(CUBOID([0.1, 0.5, 21.15]));


  var fifth_wall_back = T([0,1,2])([-5.7,14.1,32.1])(CUBOID([9, 0.5, 0.1]));
  var sixth_wall_back = T([0,1,2])([-28.9,14.1,32.1])(CUBOID([7.4, 0.5, 0.1]));

  var seventh_wall_back = T([0,1,2])([-5.7,15,32.1])(CUBOID([9, 0.8, 0.1]));
  var eigth_wall_back = T([0,1,2])([-28.9,15,32.1])(CUBOID([7.4, 0.8, 0.1]));

  var tenth_wall_back_a = T([0,1,2])([-4.3,15,11])(CUBOID([0.1, 0.8, 23.1]));
  var tenth_wall_back_b = T([0,1,2])([-21.55,15,11])(CUBOID([0.1, 0.8, 23.1]));

  var eleventh_wall_back_a = T([0,1,2])([-4.3,14.1,11])(CUBOID([0.1, 0.5, 23.1]));
  var eleventh_wall_back_b = T([0,1,2])([-21.55,14.1,11])(CUBOID([0.1, 0.5, 23.1]));

  var twelwe_wall_back_a = T([0,1,2])([-8.8,15,34.1])(CUBOID([4.6, 0.8, 0.1]));
  var twelwe_wall_back_b = T([0,1,2])([-21.55,15,34.1])(CUBOID([4.6, 0.8, 0.1]));

  var thirteen_wall_back_a = T([0,1,2])([-8.8,14.1,34.1])(CUBOID([4.6, 0.5, 0.1]));
  var thirteen_wall_back_b = T([0,1,2])([-21.55,14.1,34.1])(CUBOID([4.6, 0.5, 0.1]));

  var upperFrontExternalWall = STRUCT([fifth_wall,sixth_wall,seventh_wall,eigth_wall,tenth_wall,
                                      eleventh_wall,twelve_wall,thirteen_wall
                                      ]);

  var upperBackExternalWall = STRUCT([fifth_wall_back,sixth_wall_back,seventh_wall_back,eigth_wall_back,tenth_wall_back_b,tenth_wall_back_a,
                                      eleventh_wall_back_a,eleventh_wall_back_b,twelwe_wall_back_a,twelwe_wall_back_b,thirteen_wall_back_b,
                                      thirteen_wall_back_a
                                      ]);

  var externalWalls = COLOR(roofColor)(STRUCT([middleExternalWall,upperFrontExternalWall,upperBackExternalWall,externalWallA,externalWallB,underRoofWall]));

  /* ante */


  linea_anta_1 = T([1,2])([0.45,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_1_back = T([1,2])([0.45,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_2 = T([1,2])([0.45*2,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_2_back = T([1,2])([0.45*2,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_3 = T([1,2])([0.45*3,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_3_back = T([1,2])([0.45*3,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_4 = T([1,2])([0.45*4,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_4_back = T([1,2])([0.45*4,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_5 = T([1,2])([0.45*5,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_5_back = T([1,2])([0.45*5,0.11])(CUBOID([0.95,0.05,0.00001]));


  linea_anta_6 = T([1,2])([0.45*6,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_6_back = T([1,2])([0.45*6,0.11])(CUBOID([0.95,0.05,0.00001]));


  linea_anta_7 = T([1,2])([0.45*7,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_7_back = T([1,2])([0.45*7,0.11])(CUBOID([0.95,0.05,0.00001]));


  linea_anta_8 = T([1,2])([0.45*8,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_8_back = T([1,2])([0.45*8,0.11])(CUBOID([0.95,0.05,0.00001]));

  linea_anta_9 = T([1,2])([0.45*9,-0.01])(CUBOID([0.95,0.05,0.00001]));
  linea_anta_9_back = T([1,2])([0.45*9,0.11])(CUBOID([0.95,0.05,0.00001]));

  var linee = COLOR([0,0,0,1])(STRUCT([linea_anta_1,linea_anta_2,linea_anta_3,linea_anta_4,linea_anta_5,linea_anta_6,linea_anta_7,linea_anta_8,linea_anta_9,
    linea_anta_1_back,linea_anta_2_back,linea_anta_3_back,linea_anta_4_back,linea_anta_5_back,linea_anta_6_back,linea_anta_7_back,linea_anta_8_back,
    linea_anta_9_back]));

  var lineesx = R([0,2])(PI/4)(linee);
  var lineedx = R([0,2])(3*PI/4)(linee);

  var anta_base = COLOR(shutterColor)(CUBOID([1,4.55,0.1]));




  anta_aperta_dx= R([0,2])(3*PI/4)(anta_base);
  anta_aperta_dx= S([1])([0.9])(anta_aperta_dx);
  anta_aperta_sx= R([0,2])(PI/4)(anta_base);
  anta_aperta_sx= S([1])([0.9])(anta_aperta_sx);


  var antadx = STRUCT([anta_aperta_dx,lineedx]);
  var antasx = STRUCT([anta_aperta_sx,lineesx]);
  var anta_piatta = STRUCT([anta_base,linee]);
  anta_piatta = S([1])([0.9])(anta_piatta);


  var anta_dx_window_6 = T([0,1,2])([-0.75,7.25,11.32])(anta_piatta);
  var anta_sx_window_6 = T([0,1,2])([1.19,7.25,11.33])(antasx);
  var anta_dx_window_99 = T([0,1,2])([-8.1,7.25,11.33])(antadx);
  var anta_sx_window_99 = T([0,1,2])([-6.2,7.25,11.33])(antasx);

  var anta_dx_window_8 = T([0,1,2])([-20.3,7.25,11.15])(anta_piatta);
  var anta_sx_window_8 = T([0,1,2])([-17.4,7.25,11.15])(anta_piatta);

  var anta_dx_window_9 = T([0,1,2])([-26.7,7.25,11.33])(antadx);
  var anta_sx_window_9 = T([0,1,2])([-24.9,7.25,11.33])(antasx);

  /* Ante Posteriore */
  var anta_dx_window_10 = T([0,1,2])([-1.75,7.25,32.25])(anta_piatta);
  var anta_sx_window_10 = T([0,1,2])([1.22,7.25,32.25])(anta_piatta);

  var anta_dx_window_11 = T([0,1,2])([-27.75,7.25,32.25])(anta_piatta);
  var anta_sx_window_11 = T([0,1,2])([-24.8,7.25,32.25])(anta_piatta);

  /*Anta su lati laterali*/

  var antadx_lato = R([0,2])(PI/2)(antadx);
  var antasx_lato = R([0,2])(PI/2)(antasx);
  var anta_piatta_lato = R([0,2])(PI/2)(anta_piatta);

  var anta_dx_window_12 = T([0,1,2])([-28.75,7.25,21.7])(anta_piatta_lato);
  var anta_sx_window_12 = T([0,1,2])([-28.75,7.25,22.7])(anta_piatta_lato);

  var anta_dx_window_13 = T([0,1,2])([-28.75,7.25,15.7])(antadx_lato);
  var anta_sx_window_13 = T([0,1,2])([-28.75,7.25,13.7])(antasx_lato);

  var anta_dx_window_14 = T([0,1,2])([-28.9,7.25,29.6])(antadx_lato);
  var anta_sx_window_14 = T([0,1,2])([-28.75,7.25,28.6])(anta_piatta_lato);

  var anta_dx_window_16 = T([0,1,2])([3.2,7.25,16.7])(anta_piatta_lato);
  var anta_sx_window_16 = T([0,1,2])([3.2,7.25,13.7])(anta_piatta_lato);

  var anta_dx_window_17 = T([0,1,2])([3.2,7.25,28.55])(anta_piatta_lato);
  var anta_sx_window_17 = T([0,1,2])([3.2,7.25,29.55])(anta_piatta_lato);

  var anta_dx_window_18 = T([0,1,2])([3.83,7.25,20.1])(antadx_lato);
  var anta_sx_window_18 = T([0,1,2])([3.78,7.25,23.3])(antasx_lato);

  var ante = STRUCT([anta_sx_window_6,anta_dx_window_6,anta_sx_window_99,anta_dx_window_99,anta_dx_window_8,anta_sx_window_8,anta_dx_window_9,anta_sx_window_9,
    anta_dx_window_10,anta_sx_window_10,anta_sx_window_11,anta_dx_window_11,anta_dx_window_12,anta_sx_window_12,anta_sx_window_13,anta_dx_window_13,anta_dx_window_14,
    anta_sx_window_14,anta_dx_window_16,anta_sx_window_16,anta_dx_window_17,anta_sx_window_17,anta_sx_window_18,anta_dx_window_18]);
    exports.stuff = STRUCT([ante, externalWalls]);


    }(this));

/****************************************************************************
*                                                                           *
* Draw upper-windows Banisters                                              *
*                                                                           *
*****************************************************************************/


  !(function(exports){


    var ruotaPunti = function(pointList, angolo, asse) {
        if (asse === 0) {
          var alfa = angolo;
          return pointList.map( function(pt) { 
      return [ pt[0], pt[1]*COS(alfa) + (-1)*pt[2]*SIN(alfa), pt[1]*SIN(alfa) + pt[2]*COS(alfa) ];
          });
        } else if (asse === 1) {
          var beta = angolo;
          return pointList.map( function(pt) { 
      return [ pt[0]*COS(beta) + pt[2]*SIN(beta), pt[1], (-1)*pt[0]*SIN(beta) + pt[2]*COS(beta) ];
          });
        } else if (asse === 2) {
          var gamma = angolo;
          return pointList.map( function(pt) { 
      return [ pt[0]*COS(gamma) + (-1)*pt[1]*SIN(gamma), pt[0]*SIN(gamma) + pt[1]*COS(gamma), pt[2] ];
          });
        }

        return pointList;
    };

    var basicControlPoints = [];
   
    basicControlPoints.push([[0,0.1,0],[2,0.1,0],[0,0,0],[0,0,0]]);
    
    basicControlPoints.push([[2,0.1,0],[2.5,0,0],[0,-0.3,0],[1.7,0,0]]);
    
    basicControlPoints.push([[2.5,0,0],[1.3,1,0],[0,3.8,0],[1,0,0]]);
    
    basicControlPoints.push([[1.3,1,0],[1.8,1.5,0],[1,0,0],[0,0.75,0]]);
    
    basicControlPoints.push([[1.8,1.5,0],[1.3,2,0],[0,0.75,0],[-1,0,0]]);
    
    basicControlPoints.push([[1.3,2,0],[0.9,2.3,0],[-1,0,0],[0,0.1,0]]);
    
    basicControlPoints.push([[0.9,2.3,0],[1.1,2.5,0],[0,0.1,0],[0.7,0,0]]);
    
    basicControlPoints.push([[1.1,2.5,0],[1.1,2.6,0],[0.15,-0.05,0],[-0.15,-0.05,0]]);
    
    basicControlPoints.push([[1.1,2.6,0],[0.5,4,0],[-2,1,0],[0,0.5,0]]);
   
    basicControlPoints.push([[0.5,4,0],[1.5,5.4,0],[0,3,0],[1,0,0]]);

    var HER0 = CUBIC_HERMITE(S0); 

    var resRot = 8;


    var puntiAsseXZ = basicControlPoints.map(function(ptlist) {return ruotaPunti(ptlist,PI/2,0);});
    AA(HER0)(puntiAsseXZ);


    var domainSurface = DOMAIN([[0,1],[0,2*PI]])([resRot,resRot]);


    var generatedHermitFunctions = AA(HER0)(puntiAsseXZ);
    var generatedRotationalSurfaces = AA(ROTATIONAL_SURFACE)(generatedHermitFunctions);
    var generatedSurfaces = CONS( AA(MAP)(generatedRotationalSurfaces) )(domainSurface);


    var structSuperfici = STRUCT(generatedSurfaces);
    var structSuperfici = R([1,2])(-PI/2)(structSuperfici);
    var structSuperfici_2 = T([1])([5.45])(structSuperfici);
    var structSuperfici_3 = T([1])([-5.45])(structSuperfici);

    var structStot = STRUCT([structSuperfici,structSuperfici_2,structSuperfici_3]);
    structStot = S([0,1,2])([0.075,0.075,0.075])(structStot);
    var TstructStot_1 = T([0])([0.5])(structStot);
    var TstructStot_2 = T([0])([1])(structStot);
    var TstructStot_3 = T([0])([1.5])(structStot);
    var cornicione_ringhiera = T([0,1,2])([-0.25,0.40875*2,-0.2])(CUBOID([2.05,0.1,0.2]));

    var ringhiera_finestra = COLOR([1,1,1,1])(STRUCT([structStot,TstructStot_1,TstructStot_2,TstructStot_3,cornicione_ringhiera]));

    var T_ringhiera_finestra = T([0,1,2])([-26.5,17,11.3])(ringhiera_finestra);
    var T_ringhiera_finestra_2 = T([0,1,2])([-0.55,17,11.3])(ringhiera_finestra);
    var T_ringhiera_finestra_3 = T([0,1,2])([-26.5,17,32])(ringhiera_finestra);
    var T_ringhiera_finestra_4 = T([0,1,2])([-0.55,17,32])(ringhiera_finestra);

    /*Disegno le ringhiere sulle altre facciate della villa*/

    var ringhiera_finestra_ruotata = R([0,2])(PI/2)(ringhiera_finestra);

    var R_ringhiera_finestra = T([0,1,2])([-28.6,17,22.4])(ringhiera_finestra_ruotata);
    var R_ringhiera_finestra_2 = T([2])([7])(R_ringhiera_finestra);
    var R_ringhiera_finestra_3 = T([2])([-7])(R_ringhiera_finestra);

    var R_ringhiera_finestra_back = T([0])([31.8])(R_ringhiera_finestra);
    var R_ringhiera_finestra_2_back = T([0])([31.8])(R_ringhiera_finestra_2);
    var R_ringhiera_finestra_3_back = T([0])([31.8])(R_ringhiera_finestra_3);

    exports.banisters = STRUCT([T_ringhiera_finestra,T_ringhiera_finestra_2,T_ringhiera_finestra_3,T_ringhiera_finestra_4,R_ringhiera_finestra,
    R_ringhiera_finestra_3,R_ringhiera_finestra_2,R_ringhiera_finestra_back,R_ringhiera_finestra_2_back,R_ringhiera_finestra_3_back]);

    }(this));


  /****************************************************************************
*                                                                           *
* Draw Chymneypots upon the Main-Roof                                       *
*                                                                           *
*****************************************************************************/

  !(function(exports){
var domain2 = DOMAIN([[0,1],[0,1]])([8,20]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([1,1,1]);
var detailedDomain = DOMAIN([[0,1],[0,2*PI]])([10,10]);

    var lowerRingProfile = BEZIER(S0)([[0.45,0,11.3],[0.45,0,11.4]]);
    var mapping1 = ROTATIONAL_SURFACE(lowerRingProfile);
    var lowerRing = MAP(mapping1)(detailedDomain);
    var columnProfile = BEZIER(S0)([[0.45,0,11.4],[0.45,0,14.4]]);
    var mapping2 = ROTATIONAL_SURFACE(columnProfile);
    var column = MAP(mapping2)(detailedDomain);
    var middleRingProfile1 = BEZIER(S0)([[0.45,0,14.4],[0.45,0,14.5],[0.55,0,14.5]]);
    var mapping31 = ROTATIONAL_SURFACE(middleRingProfile1);
    var middleRing1 = MAP(mapping31)(detailedDomain);
    var middleRingProfile2 = BEZIER(S0)([[0.45,0,14.5],[0.55,0,14.5]]);
    var mapping32 = ROTATIONAL_SURFACE(middleRingProfile2);
    var middleRing2 = MAP(mapping32)(detailedDomain);
    var middleRing = STRUCT([middleRing1,middleRing2]);
    var m1 = BEZIER(S0)([[0.53,-0.05,14.5],[0.53,-0.05,14.7],[0.73,-0.05,14.7],[0.73,-0.05,14.9],[0.63,-0.05,14.9]]);
    var m2 = BEZIER(S0)([[0.53,0.05,14.5],[0.53,0.05,14.7],[0.73,0.05,14.7],[0.73,0.05,14.9],[0.63,0.05,14.9]]);
     
    var m1m2 = BEZIER(S1)([m1,m2]);
     
    var m3 = BEZIER(S0)([[0.44,-0.05,14.5],[0.44,-0.05,14.7],[0.64,-0.05,14.7],[0.64,-0.05,14.9],[0.54,-0.05,14.9]]);
    var m4 = BEZIER(S0)([[0.44,0.05,14.5],[0.44,0.05,14.7],[0.64,0.05,14.7],[0.64,0.05,14.9],[0.54,0.05,14.9]]);
    var m3m4 = BEZIER(S1)([m3,m4]);
    var m1m3 = BEZIER(S1)([m1,m3]);
    var m2m4 = BEZIER(S1)([m2,m4]);
    var sol_m1m2m3m4 = STRUCT([MAP(m1m2)(domain2), MAP(m3m4)(domain2), MAP(m1m3)(domain2), MAP(m2m4)(domain2)]);
    var alphaSquare = STRUCT([   sol_m1m2m3m4,
                                    R([0,1])([PI/6])(sol_m1m2m3m4),                             
                                    R([0,1])([PI/3])(sol_m1m2m3m4),                                 
                                    R([0,1])([-PI/6])(sol_m1m2m3m4),                                    
                                    R([0,1])([-PI/3])(sol_m1m2m3m4)
                                    ]);
    var squares = STRUCT([   alphaSquare,
                                S([0])([-1])(alphaSquare),
                                R([0,1])([PI/2])(sol_m1m2m3m4),
                                R([0,1])([-PI/2])(sol_m1m2m3m4)
                                ]);
    var upperRingProfile1 = BEZIER(S0)([[0.55,0,14.9],[0.65,0,14.9]]);
    var mapping41 = ROTATIONAL_SURFACE(upperRingProfile1);
    var upperRing1 = MAP(mapping41)(detailedDomain);
    var upperRingProfile2 = BEZIER(S0)([[0.65,0,14.9],[0.65,0,15.1],[0.85,0,15.1]]);
    var mapping42 = ROTATIONAL_SURFACE(upperRingProfile2);
    var upperRing2 = MAP(mapping42)(detailedDomain);
    var upperRingProfile3 = BEZIER(S0)([[0.65,0,15.1],[0.85,0,15.1]]);
    var mapping43 = ROTATIONAL_SURFACE(upperRingProfile3);
    var upperRing3 = MAP(mapping43)(detailedDomain);
    var upperRing = STRUCT([upperRing1,upperRing2,upperRing3]);
    var bigSphereProfile = BEZIER(S0)([[0.6,0,15.1],[0.75,0,15.1],[0.75,0,16],[0.35,0,16],[0,0,16],[0.04,0,16.5]]);
    var mapping5 = ROTATIONAL_SURFACE(bigSphereProfile);
    var bigSphere = MAP(mapping5)(detailedDomain);
    var smallSphereProfile = BEZIER(S0)([[0,0,16.49],[0.2,0,16.49],[0.2,0,16.79],[0,0,16.79]]);
    var mapping6 = ROTATIONAL_SURFACE(smallSphereProfile);
    var smallSphere = MAP(mapping6)(detailedDomain);
    var white = COLOR(columnsColor)(STRUCT([column,bigSphere,smallSphere]));
    var brown = COLOR(roofColor)(STRUCT([lowerRing,middleRing,squares,upperRing]));
    var alfaChimneypot = STRUCT([white,brown]);
    var alfaChimneypot2 = R([1,2])(-PI/2)(alfaChimneypot)
    var base = T([0,1,2])([-0.5,9.8,-0.5])(COLOR(columnsColor)(CUBOID([1,1.5,1])));
     alfaChimneypot2 = STRUCT([alfaChimneypot2,base]);

    var chimneyPotFrontLeft = T([0,1,2])([-2,11,12.5])(alfaChimneypot2);
    var chimneyPotFrontRight = T([0])([-22])(chimneyPotFrontLeft);
    var chimneyPotBackLeft = T([2])([18])(chimneyPotFrontLeft);
    var chimneyPotBackRight = T([2])([18])(chimneyPotFrontRight);

    var c_tetto = T([0,1,2])([-0.1,4.3,-0.1])(CUBOID([1.2,0.1,1.2]));
    var comi_1 = CUBOID([0.1,4.3,1]);
    var comi_2 = T([0])([0.9])(comi_1);
    var comi_3 = CUBOID([1,4,0.1]);
    var comi_4 = T([2])([0.9])(comi_3);

    var littleChimneyPotFrontLeft = T([0,1,2])([-4,20.8,17])(STRUCT([c_tetto,comi_1,comi_2,comi_3,comi_4]));
    var littleChimneyPotFrontRight = T([0])([-18.5])(littleChimneyPotFrontLeft);
    var littleChimneyPotBackLeft = T([2])([8.5])(littleChimneyPotFrontLeft);
    var littleChimneyPotBackRight = T([0])([-18.5])(littleChimneyPotBackLeft);

    var littleChimneyPots = COLOR(columnsColor)(STRUCT([littleChimneyPotFrontLeft,
                                                      littleChimneyPotFrontRight,
                                                      littleChimneyPotBackLeft,
                                                      littleChimneyPotBackRight]));
    
    var chimneyPots = STRUCT([chimneyPotFrontLeft,
                              chimneyPotFrontRight,
                              chimneyPotBackLeft,
                              chimneyPotBackRight]);

    exports.chimneyPots = STRUCT([chimneyPots,littleChimneyPots]);

    }(this));


    var model = STRUCT([garden,twinStairs,roof,stuff,colonnade,banisters,backFacade,gable,mainBuilding,colonnadeBasement,chimneyPots]);
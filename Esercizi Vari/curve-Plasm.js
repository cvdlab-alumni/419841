var domain  = INTERVALS(1)(30); // divido la curva in 30 intervalli 
var domain2 = DOMAIN([[0,1],[0,1]])([30,50]); //divido il primo intervallo in 30 e il secondo in 50
var controls1 = [[1,0], [0,1], [0,1], [-1,0]]; //primo punto e secondo punto: DOVE PASSA LA CURVA. terzo e quarto, vettori che danno la direzione della curva!
var c1 = CUBIC_HERMITE(S0)(controls1);
var curve1 =MAP(c1)(domain);

//DRAW(curve1);

var controls2 = [[2,0,0], [0,2,0], [0,4,0], [-4,0,0]]; //primo punto e secondo punto: DOVE PASSA LA CURVA. terzo e quarto, vettori che danno la direzione della curva!
var c2 = CUBIC_HERMITE(S0)(controls2);
var curve2 =MAP(c2)(domain);

var struct = STRUCT([curve1,curve2]);
//DRAW(struct);

var s12 = BEZIER(S1)([c1,c2]);
var surface12 = MAP(s12)(domain2);
//DRAW(surface12); 
DRAW(SKELETON(1)(surface12)); //Disegna la griglia
//per il 3D bisogna aggiungere un terzo parametro in controls

var s13 = CUBIC_HERMITE(S1)([c1,c2, [0,0,3],[0,0,-3]]);
var surface13 = MAP(s13)(domain2);
DRAW(surface13);


//PROFILO ALARE
var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([15,30]);
var p0 = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]];
//var c1 = BEZIER(s0)(controls);
//var curve1 = MAP(c1)(domain);

//funzione che prende in ingresso array di punto e restituisce complesso simpliciale formato da quei punti

function POLYPOINT(points){
return SIMPLICIAL_COMPLEX(points)(points.map(function(p,i){ return [i];}));
}

var polypoints = COLOR([1,0,0,1])(POLYPOINT(p0));
//DRAW(polypoints);
//sequenza di punti e traslazioni

var t = T([2])([10]);
var struct = STRUCT([polypoints,t,polypoints,t,polypoints,t,polypoints]);
//DRAW(struct);

var p0 = [[10,0,0],[0,5,0],[0,-3,0],[5,2,0],[10,0,0]];
var p1 = p0.map(function (p) {return p[0],p[1],p[2]+10});
var p2 = p0.map(function (p) {return p[0],p[1],p[2]+20});
var p3 = p0.map(function (p) {return p[0],p[1],p[2]+30});
var p4 = p0.map(function (p) {return p[0],p[1],p[2]+40});
 var c0 = BEZIER(S0)(p0)
 var c1 = BEZIER(S0)(p1);
 var c2 = BEZIER(S0)(p2);
 var c3 = BEZIER(S0)(p3);
 var c4 = BEZIER(S0)(p4);

 var curve0 = STRUCT(CONS(AA(MAP)([c0,c1,c2,c3,c4]))(domain1));
//ALA IN 3D

 var wing= BEZIER(S1)([c0,c1,c2,c3,c4]);
 var wingImage = MAP(wing)(domain2);
 DRAW(wingImage);


 //NUBS(S0)(grado)(nodi)(controlli)

 var domain = INTERVALS(1)(20);
 var controls = [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];
 var nubs = NUBS(S0)(3)(0,0,0,1,2,3,4,5)(controls);
 var curve1 = MAP(nubs)(domain);
 DRAW(curve1);

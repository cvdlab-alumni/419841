var BPavilion = function(){
	var a1 = SIMPLEX_GRID([[1],[1],[1]]);
	var dx = T([0])([1]);
	var su = T([1])([1]);
	var giu = T([1])([-1]);
	var sx = T([0])([-1]);
	DRAW(COLOR([0.2,0.2,0])(STRUCT([a1,su,a1,giu,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,sx,a1,sx,a1,sx,a1,su,a1, // Seconda riga
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,su,a1,dx,a1, // Terza Riga
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,su,a1,sx,a1,sx,a1, // Quarta Riga
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,su,a1,dx,a1,dx,a1,dx,a1, //Quinta Riga
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,su,a1,giu,a1,sx,a1,sx,a1, //Quadratino ultimo quinta Riga
		sx,a1,sx,a1,sx,a1,su,a1,sx,a1,sx,a1,sx,a1,sx,a1,  //Sesta Riga
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,su,a1,dx,a1,dx,a1,  //Settima Riga
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,su,a1, //Ottava
		sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,su,a1,dx,a1,dx,a1, // Nona
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,su,a1, //Decima
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,,dx,a1,dx,a1,su,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1, //Undicesima
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,su,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1, //Dodicesima
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,su,a1, //Tredicesima
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,su,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1, //Quattordicesima
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,su,a1, //Quindicesima
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,su,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1, //Sedicesima
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,  //qua sono alla 6ultima riga
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		su,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,
		sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,su,a1,dx,a1,dx,a1,
		dx,a1,dx,a1,dx,a1,dx,a1,dx,a1, // qua sto alla quintultima riga
		su,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1, //quartultima
		su,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1, //terzultima
		su,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1,sx,a1, //penultima
		su,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,dx,a1,  //ultima riga in alto
		])));
	var vetro = [0.8,1,1];
	var a2 = SIMPLEX_GRID([[20],[9]]);
	var t = T([0,1])([1,1]); //Piscina Grande
	DRAW(COLOR([0.4,1,1])(STRUCT([t,a2])));
	var a3 = SIMPLEX_GRID([[4],[11]]);
	var t2= T([0,1])([49,5]); // Piscina Piccola
	DRAW(COLOR([0.4,1,1])(STRUCT([t2,a3])));
	var muro = SIMPLEX_GRID([[7.1],[0.2],[6]]);
	var t = T([0,1])([1.01,1.01]);
	var x = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(x));
	var muro = SIMPLEX_GRID([[0.2],[21.4],[6]]); 
	var t = T([0,1])([0.99,0.99]);
	var y = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(y));
	var muro = SIMPLEX_GRID([[8.2],[0.2],[6]]);
	var t = T([0,1])([0.99,22.2]);
	var z = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(z));
	var muro = SIMPLEX_GRID([[0.2],[5.2],[6]]);
	var t = T([0,1])([9.1,17]);
	var k = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(k));
	var scala = SIMPLEX_GRID([[0.375],[3],[0.875]]);
	var scala2 = SIMPLEX_GRID([[0.75],[3],[0.75]]);
	var scala3 = SIMPLEX_GRID([[1.125],[3],[0.625]]);
	var scala4 = SIMPLEX_GRID([[1.5],[3],[0.5]]);
	var scala5 = SIMPLEX_GRID([[1.875],[3],[0.425]]);
	var scala6 = SIMPLEX_GRID([[2.25],[3],[0.3]]);
	var scala7 = SIMPLEX_GRID([[2.625],[3],[0.125]]);
	var scala8 = SIMPLEX_GRID([[3],[3]]);
	var scale = STRUCT([scala,scala2,scala3,scala4,scala5,scala6,scala7,scala8]);
	var m = T([0,1])([37,1]);
	DRAW(COLOR([0.8,0.8,1])(STRUCT([m,scale])));
	var tetto = SIMPLEX_GRID([[10],[10]]);
	var z = T([0])([0,5])(tetto);
	var q = T([1])([13.2])(z);
	var m = T([2])([6.01])(q);
	DRAW(COLOR([0,0,0])(m));
	var muro = SIMPLEX_GRID([[11.3],[0.05],[6]]);
	var t = T([0,1])([30,5]);
	var c = STRUCT([t,muro]);
	DRAW(COLOR(vetro)(c));
	var muro = SIMPLEX_GRID([[0.05],[2],[6]]);
	var t = T([0,1])([30,5]);
	var w = STRUCT([t,muro]);
	DRAW(COLOR(vetro)(w));
	var muro = SIMPLEX_GRID([[11.7],[0.2],[6]]);
	var t = T([0,1])([41.3,4.9]);
	var d = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(d));
	var muro = SIMPLEX_GRID([[15.3],[0.2],[6]]);
	var t = T([0,1])([37.7,15.9]);
	var l = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(l));
	var muro = SIMPLEX_GRID([[0.2],[11.2],[6]]);
	var t = T([0,1])([52.9,4.9]);
	var p = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(p));
	var tetto = SIMPLEX_GRID([[25],[13]]);
	var z = T([0])([24])(tetto);
	var q = T([1])([4])(z);
	var o = T([2])([6.01])(q);
	DRAW(COLOR([0,0,0])(o));
	var muro = SIMPLEX_GRID([[18.4],[0.2],[6]]);
	var t = T([0,1])([7.8,14.9]);
	var p = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(p));
		var muro = SIMPLEX_GRID([[8.6],[0.2],[6]]);
	var t = T([0,1])([25.2,6.9]);
	var p = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(p));

	    var a1 = SIMPLEX_GRID([[0.4,-1.6,0.4,-1.6,0.4,-1.6,0.4,-1.6,0.4,-1.6,0.4,-1.6,0.4,-1.6,0.4],[0.4],[0.4]]);
    a1 = T([2])([1])(a1);
    var i = T([0,1])([7.9,14.2]);

    DRAW(COLOR([0,1,0])(STRUCT([i,a1]))); // cubetti su cui poggia la panchina lunga

    var panchina = SIMPLEX_GRID([[15],[0.5]]);
    var k = T([0])([7.9])(panchina);
    var m = T([1])([14.1])(k);
    var q = T([2])([1.41])(m);
    DRAW(COLOR([1,0,0])(q)); //la panchina vera e propria
    

	var muro = SIMPLEX_GRID([[0.05],[6],[6]]);
	var t = T([0,1])([31,7.5]);
	var e = STRUCT([t,muro]);
	DRAW(COLOR(vetro)(e));
		
	var muro = SIMPLEX_GRID([[0.05],[6],[6]]);
	var t = T([0,1])([32,7.5]);
	var r = STRUCT([t,muro]);
	DRAW(COLOR(vetro)(r));

	var muro = SIMPLEX_GRID([[10],[0.05],[6]]);
	var t = T([0,1])([30,13.5]);
	var c = STRUCT([t,muro]);
	DRAW(COLOR(vetro)(c));

	var muro = SIMPLEX_GRID([[0.05],[2],[6]]);
	var t = T([0,1])([40,13.5]);
	var r = STRUCT([t,muro]);
	DRAW(COLOR(vetro)(r));

	var muro = SIMPLEX_GRID([[5],[0.2],[6]]);
	var t = T([0,1])([37.5,11.5]);
	var c = STRUCT([t,muro]);
	DRAW(COLOR(vetro)(c));

	var muro = SIMPLEX_GRID([[0.05],[6.5],[6]]);
	var t = T([0,1])([38.8,5]);
	var r = STRUCT([t,muro]);
	DRAW(r);

	var muro = SIMPLEX_GRID([[0.05],[6.5],[6]]);
	var t = T([0,1])([42.5,5]);
	var r = STRUCT([t,muro]);
	DRAW(COLOR(vetro)(r));

	var muro = SIMPLEX_GRID([[0.05],[8],[6]]);
	var t = T([0,1])([44.8,6.5]);
	var r = STRUCT([t,muro]);
	DRAW(COLOR(vetro)(r));


	var muro = SIMPLEX_GRID([[8],[0.2],[6]]);
	var t = T([0,1])([1,17]);
	var r = STRUCT([t,muro]);
	DRAW(COLOR([0.8,0.8,1])(r));

	var drawSgabello = function(x,y,z){
	x = x||0;
	y = y||0;
	z = z||0;
	var gambe = SIMPLEX_GRID([[0.05,-0.2, 0.05],[0.05,-0.2, 0.05],[0.5]]);
	var temp_sedia = SIMPLEX_GRID([[0.3],[0.3],[0.1]]);
	var sedia = T([2])([0.50001])(temp_sedia);

var sgabello_TEMP = STRUCT([gambe,sedia]);
var sgabello_TEMP_1 = T([0])([x])(sgabello_TEMP);
var sgabello_TEMP_2 = T([1])([y])(sgabello_TEMP_1); 
var sgabello = T([2])([z])(sgabello_TEMP_2);
DRAW(sgabello);
}
	drawSgabello(25,3,1);
	drawSgabello(29,6,1);
	drawSgabello(2,11,1);

}();
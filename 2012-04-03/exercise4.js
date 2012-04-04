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
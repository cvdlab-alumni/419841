
var disegnaGriglia = function(n, pointA, pointB){
for(var i =0; i<n; i++){
var pointsA = [[pointA[0]+1,pointA[1]],[pointA[0],pointA[1]],[pointA[0],pointA[1]+1]];
var pointsB = [[pointB[0],pointB[1]-1],[pointB[0],pointB[1]],[pointB[0]-1,pointB[1]]];
var polyA = POLYLINE(pointsA);
var polyB = POLYLINE(pointsB);
DRAW(STRUCT([polyA,polyB]));
++pointA[0];
++pointB[0];
}
}

var disegnaLinea = function(arraydiarray1,arraydiarray2){
var polyA = POLYLINE(arraydiarray1);
var polyB = POLYLINE(arraydiarray2);
DRAW(STRUCT([polyA,polyB]));	
}

var disegnaScalinata = function(numeroGradini){
	var distanza = 4 / numeroGradini;
	var q = 35;
	var y = 4;
	var x = 1;
	for(var i =0; i< numeroGradini;i++){
		if(i%2==0){DRAW(POLYLINE([[q,2.5],[q+distanza,2.5]]));}
		else{DRAW(POLYLINE([[q,2],[q+distanza,2]]));
			 DRAW(POLYLINE([[q,3],[q+distanza,3]]));
			}
		q = q+ distanza;
		DRAW(POLYLINE([[q,x],[q,y],[q,x]]));
	}
}


var disegnaBordiSpessi = function(){

	DRAW(POLYLINE([[8,0.9],[0.9,0.9],[0.9,21.1],[9.1,21.1],[9.1,17]]));
	DRAW(POLYLINE([[40.5,5],[40.5,4.9],[50.1,4.9],[50.1,16.1],[36.5,16.1],[36.5,16]]));
}

var disegnaGrigliaCompleta = function(){
	disegnaGriglia(39,[0,0],[1,1]);
 disegnaGriglia(1,[0,1],[1,2]);
 disegnaGriglia(15,[20,1],[21,2]);
 disegnaGriglia(15,[20,2],[21,3]);
 disegnaGriglia(15,[20,3],[21,4]);
 disegnaGriglia(31,[20,4],[21,5]);
 disegnaGriglia(1,[50,5],[51,6]);
 disegnaGriglia(26,[20,5],[21,6]);
 disegnaGriglia(26,[20,6],[21,7]);
 disegnaGriglia(26,[20,7],[21,8]);
 disegnaGriglia(26,[20,8],[21,9]);
 disegnaGriglia(26,[20,9],[21,10]);
 disegnaGriglia(45,[1,10],[2,11]);
 disegnaGriglia(45,[1,11],[2,12]);
 disegnaGriglia(45,[1,12],[2,13]);
 disegnaGriglia(45,[1,13],[2,14]);
 disegnaGriglia(45,[1,14],[2,15]);
 disegnaGriglia(45,[1,15],[2,16]);
 disegnaGriglia(38,[1,16],[2,17]);
 disegnaGriglia(8,[1,17],[2,18]);
 disegnaGriglia(8,[1,18],[2,19]);
 disegnaGriglia(8,[1,19],[2,20]);
 disegnaGriglia(8,[1,20],[2,21]);
 disegnaLinea([[1,12],[0,12],[0,22]],[[0,22],[10,22],[10,17]]);
}

var disegnaLinee = function(){
 //Disegno le linee del piano terra che non sono quadratini
 DRAW(POLYLINE([[39,17],[46,17],[46,16]]));
 DRAW(POLYLINE([[50,6],[50,16],[46,16]]));
 DRAW(POLYLINE([[1,2],[1,10],[1,2]]));
 DRAW(POLYLINE([[39,1],[39,4],[39,1]]));	
}

var disegnaPianoTerra = function(){
 disegnaGrigliaCompleta();
 disegnaLinee();
 //Disegno la scalinata
 disegnaScalinata(8);
//Disegno i bordi spessi 
 disegnaBordiSpessi();
}();

function Punto(x,y){
this.x = x;
this.y = y;
}

Punto.prototype.getDistance = function(punto){
return Math.sqrt(Math.pow((this.x-punto.x),2) + Math.pow((this.y-punto.y),2));
}

function Triangolo (v1,v2,v3){
this.v1 = v1;
this.v2 = v2;
this.v3 = v3;
}

Triangolo.prototype.getPerimetro = function(){
this.latoA = this.v1.getDistance(this.v2);
this.latoB = this.v2.getDistance(this.v3);
this.latoC = this.v1.getDistance(this.v3);
return (this.latoA+this.latoB+this.latoC);
}

Triangolo.prototype.getArea = function(){
p = this.getPerimetro();
return Math.sqrt(p/2*(p/2 - this.latoA)*(p/2-this.latoB)*(p/2-this.latoC));
}

var p = new Punto(0,0);
var p1 = new Punto(8,0);
var p2 = new Punto(4,6);
var d01 = p.getDistance(p1);
var d02 = p.getDistance(p2);
var d12 = p1.getDistance(p2);
var t = new Triangolo(p,p1,p2);
var perimetro = t.getPerimetro();
var area = t.getArea();

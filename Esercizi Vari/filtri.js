//Filtra tutti i numeri positivi di un array e fa la somma

function filtroSomma(array){
	
	var positivi = array.filter(function(item,index,array) {return item>=0;});		//filtra i numeri positivi
	return positivi.reduce(function(prev,current){return prev+current;});			//somma l'array dei numeri positivi precedentemente calcolato
	
	
}
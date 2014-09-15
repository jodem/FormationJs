define([],function(){



	var Case = function(nom){
		this.nom = nom;
		this.suivante = null;				
	};

	Case.prototype ={
		
		landOnBy : function(deplacement) {

		},
		passOverBy : function(deplacement) {

		}

	};



	return Case;
});
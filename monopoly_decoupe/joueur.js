

var m = Monopoly;


m.Joueur = function(nom) {
	this.nom = nom;
	this.solde = 700;
	this.location = m.plateau[0];
};

m.Joueur.prototype = {

	jouer : function(){			

		var result = m.gobelet.lancer();
		console.log( this.nom +" avance de " + result );
				
		for (var i = 1; i < result ; i++){
			this.location = this.location.suivante;				
			//console.log(this.nom + " pass Over " + this.location.nom);
			this.location.passOverBy(this);				
		}

		this.location = this.location.suivante;
		console.log(this.nom + " Land on " + this.location.nom);		
		this.location.landOnBy(this);
		console.log("Solde de " + this.nom + ":" + this.solde)


	},

	depotOuRetrait : function (montant){			
		this.solde += montant;
		if (this.solde <= 0){
			this.perdu();				
		}			
	},
	
	perdu : function(){			
		for (var i = 0 ; i < m.NB_CASE ; i++){
			if ( this === m.plateau[i].proprietaire){
				m.plateau[i].proprietaire = null;
			}
		}					
		m.joueurs.splice(m.joueurs.indexOf(this),1);
		console.log(" ==>" + this.nom + " a perdu ! <==");
	}	

};
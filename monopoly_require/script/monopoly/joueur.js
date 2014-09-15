define(["monopoly/gobelet"],function(gob){



	var joueur = function(nom, monop) {

		this.nom = nom;
		this.solde = 700;		
		this.monop = monop;
		this.location = monop.plateau[0];
		
	};

	joueur.prototype = {

		

		jouer : function(){			

			var result = gob.lancer();
			console.log( this.nom +" avance de " + result );
					
			for (var i = 1; i < result ; i++){
				
				this.location = this.location.suivante;				
								
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
			for (var i = 0 ; i < this.monop.NB_CASE ; i++){
				if ( this === this.monop.plateau[i].proprietaire){
					this.monop.plateau[i].proprietaire = null;
				}
			}					
			this.monop.joueurs.splice(this.monop.joueurs.indexOf(this),1);
			console.log(" ==>" + this.nom + " a perdu ! <==");
		}
	}

	return joueur;

});



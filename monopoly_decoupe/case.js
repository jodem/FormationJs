//case


var m = Monopoly;

/************
	*	CASE
	************/
	m.Case = function(nom){
		this.nom = nom;
		this.suivante = null;				
	};

	m.Case.prototype ={
		
		landOnBy : function(deplacement) {

		},
		passOverBy : function(deplacement) {

		}

	};

	
	/******************
	*	PROPRIETE
	*******************/

	m.Propriete = function(nom, prix){
		m.Case.apply(this, [nom]);
		
		this.prix = prix;
		this.proprietaire = null;		
	};

	m.Propriete.prototype  = new m.Case();	

	m.Propriete.prototype.landOnBy = function(joueur){
		if (this.proprietaire == null){
			if (joueur.solde >= this.prix){
				this.proprietaire = joueur;
				joueur.depotOuRetrait( - this.prix);								
				console.log(joueur.nom + " achete la case " + this.nom + " pour " + this.prix + " euros");
			}			
			return;
		}

		if (this.proprietaire !== joueur){
			console.log(joueur.nom + " tombe chez " + this.proprietaire.nom + " et lui paie " + this.prix + " euros");
			joueur.depotOuRetrait( - this.prix);
			this.proprietaire.depotOuRetrait(this.prix)
		} else {
			console.log(joueur.nom + " est chez lui/elle");
		}
	};
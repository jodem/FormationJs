define(["monopoly/case"], function(Case) {




	var propriete = function(nom, prix) {
		Case.apply(this, [nom]);

		this.prix = prix;
		this.proprietaire = null;
	};

	propriete.prototype = new Case();

	propriete.prototype.landOnBy = function(joueur) {
		if (this.proprietaire == null) {
			if (joueur.solde >= this.prix) {
				this.proprietaire = joueur;
				joueur.depotOuRetrait(-this.prix);
				console.log(joueur.nom + " achete la case " + this.nom + " pour " + this.prix + " euros");
			}
			return;
		}

		if (this.proprietaire !== joueur) {
			console.log(joueur.nom + " tombe chez " + this.proprietaire.nom + " et lui paie " + this.prix + " euros");
			joueur.depotOuRetrait(-this.prix);
			this.proprietaire.depotOuRetrait(this.prix)
		} else {
			console.log(joueur.nom + " est chez lui/elle");
		}
	};



	return propriete;

});
define(["monopoly/case"], function(Case) {

	return function() {
		
		Case.apply(this, ["DEPART"]);
		this.landOnBy = function(joueur) {
			joueur.depotOuRetrait(100);

		};
		this.passOverBy = function(joueur) {
			joueur.depotOuRetrait(50);

		};
	}


});
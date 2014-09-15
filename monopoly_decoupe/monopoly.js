var Monopoly;

Monopoly = {	

	NB_CASE : 40,		
	plateau : [],
	joueurs : [],

};

Monopoly.init = function() {
		


	Monopoly.CaseDepart = function(){
		//
		Monopoly.Case.apply(this, ["DEPART"]);
		this.landOnBy = function (joueur){
			joueur.depotOuRetrait(100);

		};
		this.passOverBy = function (joueur) {
			joueur.depotOuRetrait(50);

		};
	};
	
	
	for (var i = 0 ; i < Monopoly.NB_CASE ; i++){

		switch ( i % 10){							

			case 1 : case 3 : case 5 : case 6 : case 8 : case 9 :
				this.plateau[i] = new Monopoly.Propriete("case " + i, i * 10);							

				break;
			default :
				if(i === 0){
					this.plateau[0] = new Monopoly.CaseDepart();				
				} else {
					this.plateau[i] = new Monopoly.Case("case " + i);				
				}
				break;

		}
			
		if (i>0){
			this.plateau[i-1].suivante = this.plateau[i];
		}			
	}
	this.plateau[Monopoly.NB_CASE-1].suivante = this.plateau[0];



	Monopoly.joueurs.push(new Monopoly.Joueur("Alice"));
	Monopoly.joueurs.push(new Monopoly.Joueur("Bob"));
	Monopoly.joueurs.push(new Monopoly.Joueur("Pops"));


};


	

Monopoly.play = function(){
	Monopoly.init();
	
	
	var indexTour = 1;
	var indexJoueur = 0;
	var that = this;
	var timerId = setInterval (function (){

		if (indexJoueur === 0){
			console.log("Debut du tour " + indexTour + " nombre de joueur restant :" + that.joueurs.length);	
		}
		if (that.joueurs[indexJoueur]){
			that.joueurs[indexJoueur].jouer();
			//console.log("Solde de " + that.joueurs[indexJoueur].nom + ":" + that.joueurs[indexJoueur].solde);

		}	
		indexJoueur++;
		if (indexJoueur == that.joueurs.length){
			indexJoueur = 0;
			indexTour++;
		}


		if (indexTour > 3 || that.joueurs.length === 1){
			var winner = null;

			that.joueurs.forEach(function(joueur){
				if (winner == null || winner.solde < joueur.solde){
					winner = joueur;
				}
			});
			console.log("FIN DE PARTIE ==========> Le gagnant est : " + winner.nom+ " avec " + winner.solde+" crédit");
			clearInterval(timerId);
		}


	}, 100);
	
}
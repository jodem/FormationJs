define(["monopoly/caseDepart", "monopoly/case", "monopoly/propriete", "monopoly/joueur"], function(caseDepart, Case, propriete, joueur) {


	return {

		NB_CASE: 40,
		plateau: [],
		joueurs: [],
		init: function() {


			for (var i = 0; i < this.NB_CASE; i++) {

				switch (i % 10) {

					case 1:
					case 3:
					case 5:
					case 6:
					case 8:
					case 9:
						this.plateau[i] = new propriete("case " + i, i * 10);

						break;
					default:
						if (i === 0) {
							this.plateau[0] = new caseDepart();
						} else {
							this.plateau[i] = new Case("case " + i);
						}
						break;

				}

				if (i > 0) {
					this.plateau[i - 1].suivante = this.plateau[i];
				}
			}
			this.plateau[this.NB_CASE - 1].suivante = this.plateau[0];



			this.joueurs.push(new joueur("Alice", this));
			this.joueurs.push(new joueur("Bob", this));
			this.joueurs.push(new joueur("Pops", this));


		},
		play: function() {
			this.init();


			var indexTour = 1;
			var indexJoueur = 0;
			var that = this;
			var timerId = setInterval(function() {

				if (indexJoueur === 0) {
					console.log("Debut du tour " + indexTour + " nombre de joueur restant :" + that.joueurs.length);
				}
				if (that.joueurs[indexJoueur]) {
					that.joueurs[indexJoueur].jouer();
					//console.log("Solde de " + that.joueurs[indexJoueur].nom + ":" + that.joueurs[indexJoueur].solde);

				}
				indexJoueur++;
				if (indexJoueur == that.joueurs.length) {
					indexJoueur = 0;
					indexTour++;
				}


				if (indexTour > 3 || that.joueurs.length === 1) {
					var winner = null;

					that.joueurs.forEach(function(joueur) {
						if (winner == null || winner.solde < joueur.solde) {
							winner = joueur;
						}
					});
					console.log("FIN DE PARTIE ==========> Le gagnant est : " + winner.nom + " avec " + winner.solde + " crédit");
					clearInterval(timerId);
				}


			}, 100);

		}
	}




});
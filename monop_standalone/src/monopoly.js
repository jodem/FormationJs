"use strict";
$(document).ready(function() {
	Monopoly.play();

});


var Monopoly;

Monopoly = {

	NB_CASE: 40,

	gobelet: {
		de: {
			valeurFace: 1,
			lancer: function() {
				return this.valeurFace = Math.floor(Math.random() * 6 + 1);
			}

		},

		de1: 1,
		de2: 1,

		isDouble: function() {
			return this.de1 === this.de2;
		},
		lancer: function() {
			this.de1 = this.de.lancer();
			this.de2 = this.de.lancer();

			return this.de1 + this.de2;
		}

	},
	plateau: [],
	joueurs: [],

};


/*********
 * JOUEURS
 **********/

Monopoly.Joueur = function(nom, couleur) {
	this.nom = nom;
	this.solde = 700;
	this.couleur = couleur;
	this.location = Monopoly.plateau[0];
	var that = this;

	$("<div/>", {
		'id': "score" + that.nom,
		'text': that.nom,
	}).appendTo("#scoreHolder");
	$("#score" + that.nom).css({
		"color": that.couleur
	});

};

Monopoly.Joueur.prototype = {

	jouer: function() {

		var result = Monopoly.gobelet.lancer();
		console.log(this.nom + " avance de " + result);

		for (var i = 1; i < result; i++) {
			this.location = this.location.suivante;
			//console.log(this.nom + " pass Over " + this.location.nom);
			this.location.passOverBy(this);
		}

		this.location = this.location.suivante;
		console.log(this.nom + " Land on " + this.location.nom);
		this.location.landOnBy(this);
		//var cellDom = $("#cell" + (i + 1));


		//<div id = "jname"  class = "joueur joueur1"></div>

		if (this.solde >= 0) {
			this.updateUi();	
		}


	},

	updateUi : function(){
		$("#j" + this.nom).remove();

			var that = this;
			$("<div/>", {
				'class': 'joueur',
				'id': 'j' + that.nom,
				'text': that.nom

			}).appendTo("#cell" + (that.location.index + 1));

			$("#j" + this.nom).css({
				"background-color": that.couleur
			});


			$("#score" + that.nom).text(that.nom + " solde : " + that.solde);


			console.log("Solde de " + this.nom + ":" + this.solde)

	},

	depotOuRetrait: function(montant) {
		this.solde += montant;
		if (this.solde < 0) {
			this.perdu();
		}
	},

	perdu: function() {
		for (var i = 0; i < Monopoly.NB_CASE; i++) {
			if (this === Monopoly.plateau[i].proprietaire) {
				Monopoly.plateau[i].proprietaire = null;
				$("#cell" + (i + 1)).css({
					"background-color": "lightgreen"
				});
			}
		}
		var that = this;
		$("#score" + that.nom).text(that.nom + " => perdu !");
		$("#j" + this.nom).remove();
		Monopoly.joueurs.splice(Monopoly.joueurs.indexOf(this), 1);

		console.log(" ==>" + this.nom + " a perdu ! <==");

	}

};


/************
 *	CASE
 ************/
Monopoly.Case = function(nom, index) {
	this.nom = nom;
	this.suivante = null;
	this.index = index;
};

Monopoly.Case.prototype = {

	landOnBy: function(deplacement) {

	},
	passOverBy: function(deplacement) {

	}

};


/******************
 *	PROPRIETE
 *******************/

Monopoly.Propriete = function(nom, index, prix) {
	Monopoly.Case.apply(this, [nom, index]);

	this.prix = prix;
	this.proprietaire = null;
};

Monopoly.Propriete.prototype = new Monopoly.Case();

Monopoly.Propriete.prototype.landOnBy = function(joueur) {
	if (this.proprietaire == null) {
		if (joueur.solde >= this.prix) {
			this.proprietaire = joueur;
			joueur.depotOuRetrait(-this.prix);

			$("#cell" + (this.index + 1)).css({
				"background-color": joueur.couleur
			});;

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



/***
 *init
 ***/
Monopoly.init = function() {



	Monopoly.CaseDepart = function() {
		//
		Monopoly.Case.apply(this, ["DEPART", 0]);
		this.landOnBy = function(joueur) {
			joueur.depotOuRetrait(100);

		};
		this.passOverBy = function(joueur) {
			joueur.depotOuRetrait(50);

		};
	};


	var color;
	for (var i = 0; i < Monopoly.NB_CASE; i++) {



		switch (i % 9) {

			case 1:

			case 3:
			case 4:
			case 5:

			case 7:
			case 8:
			case 9:
				this.plateau[i] = new Monopoly.Propriete("case " + i, i, i * 10);
				color = "lightgreen";

				break;
			default:
				if (i === 0) {
					this.plateau[0] = new Monopoly.CaseDepart();
					color = "white";
				} else {
					this.plateau[i] = new Monopoly.Case("case " + i, i);
					color = "red";
				}
				break;

		}
		var cellDom = $("#cell" + (i + 1));


		//<span class="nomCell">start</span>
		var that = this;
		$("<div/>", {
			"class": "nomCell",
			"text": that.plateau[i].nom
		}).appendTo("#cell" + (i + 1));


		cellDom.css({
			"background-color": color
		});


		if (i > 0) {
			this.plateau[i - 1].suivante = this.plateau[i];
		}
	}
	this.plateau[Monopoly.NB_CASE - 1].suivante = this.plateau[0];



	Monopoly.joueurs.push(new Monopoly.Joueur("Alice", "blue"));
	Monopoly.joueurs.push(new Monopoly.Joueur("Bob", "grey"));
	Monopoly.joueurs.push(new Monopoly.Joueur("Pops", "pink"));



};


/***
 *	PLAY
 ***/

Monopoly.play = function() {
	Monopoly.init();


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


		if (indexTour > 5000 || that.joueurs.length === 1) {
			var winner = null;

			that.joueurs.forEach(function(joueur) {
				if (winner == null || winner.solde < joueur.solde) {
					winner = joueur;
				}
			});
			console.log("FIN DE PARTIE ==========> Le gagnant est : " + winner.nom + " avec " + winner.solde + " crédit");
			$("#score" + winner.nom).text(winner.nom + " a gagne, solde : " + winner.solde);
			clearInterval(timerId);
		}


	}, 1000);

}